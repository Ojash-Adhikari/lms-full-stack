import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);
  const {
    recommendedCourses = [],
    recommendationMessage,
    isLoadingRecommendations,
  } = useContext(AppContext);

  // Decide which courses to show (prioritize recommendations)
  const displayCourses = recommendedCourses.length > 0 ? recommendedCourses : allCourses;
  const coursesToShow = displayCourses.slice(0, 8); // We'll show up to 8, but only 4 cards initially

  const isPersonalized = recommendedCourses.length > 0;

  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">
        {isPersonalized ? 'Recommended for you' : 'Learn from the best'}
      </h2>
      <p className="md:text-base text-sm text-gray-500 mt-3">
        {isPersonalized
          ? recommendationMessage || 'We picked these courses based on your interests.'
          : 'Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-6">
        {coursesToShow.slice(0, 4).map((course, index) => (
          <div key={course.id || index} className="flex flex-col">
            <CourseCard course={course} />
            
            {/* Show similarity score badge only for personalized recommendations */}
            {isPersonalized && course.similarityScore > 0 && (
              <div className="mt-3 text-center">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                  {Math.round(course.similarityScore * 100)}% Match
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          to="/course-list"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-block text-gray-700 hover:text-gray-900 border border-gray-400 hover:border-gray-600 px-10 py-3 rounded-lg font-medium transition"
        >
          Show all courses
        </Link>
      </div>
    </div>
  );
};

export default CoursesSection;