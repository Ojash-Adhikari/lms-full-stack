import Course from '../models/Course.js'
import User from '../models/User.js'
import cosineSimilarity from 'compute-cosine-similarity'
import { getClerkUserId } from '../utils/getClerkUserId.js'

export const getRecommendedCourses = async (req, res) => {
    try {
        const userId = await getClerkUserId(req)

        // Case 1: Anonymous (no JWT or invalid)
        if (!userId) {
            const randomIds = await Course.aggregate([
                { $match: { isPublished: true } },
                { $sample: { size: 5 } },
                { $project: { _id: 1 } }
            ])

            const ids = randomIds.map(c => c._id)
            const courses = await Course.find({ _id: { $in: ids } })
                .select('courseTitle courseThumbnail coursePrice discount educator enrolledStudents courseRatings tags')
                .populate('educator', 'name')
                .populate('tags', 'name')
                .lean()

            const enriched = courses.map(c => ({
                ...c,
                enrolledStudents: c.enrolledStudents?.length || 0,
                avgRating: c.courseRatings.length > 0
                    ? Number((c.courseRatings.reduce((a, b) => a + b.rating, 0) / c.courseRatings.length).toFixed(1))
                    : 0,
                similarityScore: 0
            }))

            return res.json({
                success: true,
                message: "The more you use the application, the better the recommendation system will be",
                courses: enriched,
                type: 'fallback-anonymous'
            })
        }

        // Find user in your DB
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.json({ success: false, message: 'User not found in database' })
        }

        // Case 2: No enrollments
        if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
            const topCourses = await Course.find({ isPublished: true })
                .sort({ 'enrolledStudents': -1, avgRating: -1 })
                .limit(5)
                .select('-courseContent')
                .populate('educator', 'name')
                .populate('tags', 'name')
                .lean()

            return res.json({
                success: true,
                message: "Enroll in courses to get personalized recommendations!",
                courses: topCourses.map(c => ({ ...c, similarityScore: 0 })),
                type: 'fallback-no-enrollments'
            })
        }

        // Personalized: Cosine similarity with strong tag + rating bias
        // Personalized: Safe version
        const enrolledIds = user.enrolledCourses || [];

        const userCourses = await Course.find({
            _id: { $in: enrolledIds },
            isPublished: true
        })
            .select('tags courseRatings enrolledStudents')
            .populate('tags', 'name')
            .lean();

        const tagFrequency = new Map();
        let userAvgRating = 0;
        let totalEnrollments = 0;

        userCourses.forEach(c => {
            const tags = Array.isArray(c.tags) ? c.tags : [];
            tags.forEach(t => {
                if (t?.name) {
                    tagFrequency.set(t.name, (tagFrequency.get(t.name) || 0) + 1);
                }
            });

            const ratings = Array.isArray(c.courseRatings) ? c.courseRatings : [];
            const avgRating = ratings.length > 0
                ? ratings.reduce((a, b) => a + (b.rating || 0), 0) / ratings.length
                : 3.5;

            userAvgRating += avgRating;
            totalEnrollments += c.enrolledStudents?.length || 0;
        });

        if (userCourses.length > 0) {
            userAvgRating /= userCourses.length;
        }

        // Now candidates
        const candidates = await Course.find({
            isPublished: true,
            _id: { $nin: enrolledIds }
        })
            .select('courseTitle courseThumbnail coursePrice discount educator tags courseRatings enrolledStudents')
            .populate('tags', 'name')
            .populate('educator', 'name')
            .lean();

        const scored = candidates.map(course => {
            const tags = Array.isArray(course.tags) ? course.tags : [];
            let tagScore = 0;
            tags.forEach(t => {
                if (t?.name && tagFrequency.has(t.name)) {
                    tagScore += tagFrequency.get(t.name);
                }
            });
            tagScore = tagScore / Math.max(tagFrequency.size || 1, 1);

            const ratings = Array.isArray(course.courseRatings) ? course.courseRatings : [];
            const courseRating = ratings.length > 0
                ? ratings.reduce((a, b) => a + (b.rating || 0), 0) / ratings.length / 5
                : 0.5;
            const ratingDiff = 1 - Math.abs(courseRating - (userAvgRating / 5));

            const popularityScore = Math.min((course.enrolledStudents?.length || 0) / 50, 1);

            const courseVector = [
                tagScore * 0.65,
                ratingDiff * 0.25,
                popularityScore * 0.10
            ];

            const userVector = [0.65, 0.25, 0.10];

            const similarity = cosineSimilarity(userVector, courseVector) || 0;

            return {
                ...course,
                enrolledStudents: course.enrolledStudents?.length || 0,
                similarityScore: Number(similarity.toFixed(4))
            };
        });

        const top5 = scored
            .sort((a, b) => b.similarityScore - a.similarityScore)
            .slice(0, 5)

        res.json({
            success: true,
            courses: top5,
            message: "Personalized recommendations based on your enrollments",
            type: 'personalized'
        })

    } catch (error) {
        console.error('Recommendation Error:', error)
        res.json({ success: false, message: error.message })
    }
}