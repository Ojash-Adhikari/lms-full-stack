import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';

const MyCourses = () => {
  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load courses');
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  // Pagination Logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses?.slice(indexOfFirstCourse, indexOfLastCourse) || [];
  const totalPages = courses ? Math.ceil(courses.length / coursesPerPage) : 0;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!courses) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full flex flex-col items-center">
        <h2 className="pb-6 text-2xl font-semibold text-gray-800">My Courses</h2>

        {/* Table Container */}
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-left text-sm font-medium text-gray-700">
                <tr>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4">Earnings</th>
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Published On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentCourses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-5 flex items-center gap-4">
                      <div className="shrink-0">
                        <img
                          src={course.courseThumbnail || assets.defaultImage}
                          alt={course.courseTitle}
                          className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover border border-gray-200 shadow-sm"
                        />
                      </div>
                      <span className="font-medium text-gray-900 max-w-xs truncate">
                        {course.courseTitle}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        {(course.tags || []).map((tag) => (
                          <span
                            key={tag._id}
                            className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-300"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-5 font-medium text-gray-900">
                      {currency}{' '}
                      {Math.floor(
                        course.enrolledStudents.length *
                          (course.coursePrice - (course.discount * course.coursePrice) / 100)
                      )}
                    </td>

                    <td className="px-6 py-5 text-gray-700">{course.enrolledStudents.length}</td>

                    <td className="px-6 py-5 text-gray-600">
                      {new Date(course.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">No courses published yet.</p>
          </div>
        )}
      </div>

      {/* Pagination - Minimal & Centered */}
      {totalPages > 1 && (
        <div className="mt-10 mb-8 flex justify-center items-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>

          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;