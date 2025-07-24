import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

export default function Instructor() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])
  
    useEffect(() => {
      ;(async () => {
        setLoading(true)
        const instructorApiData = await getInstructorData(token)
        const result = await fetchInstructorCourses(token)
        console.log(instructorApiData)
        if (instructorApiData.length) setInstructorData(instructorApiData)
        if (result) {
          setCourses(result)
        }
        setLoading(false)
      })()
    }, [])
  
    const totalAmount = instructorData?.reduce(
      (acc, curr) => acc + curr.totalAmountGenerated,
      0
    )
  
    const totalStudents = instructorData?.reduce(
      (acc, curr) => acc + curr.totalStudentsEnrolled,
      0
    )
  
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
            Welcome back, {user?.firstName} 👋
          </h1>
          <p className="text-lg font-medium text-gray-300">
            Let's continue building amazing courses
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[450px]">
            <div className="spinner w-12 h-12"></div>
          </div>
        ) : courses.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Total Statistics Cards */}
              <div className="col-span-2 bg-richblack-800 rounded-2xl p-8 shadow-lg transition-transform hover:scale-[1.02]">
                {totalAmount > 0 || totalStudents > 0 ? (
                  <InstructorChart courses={instructorData} />
                ) : (
                  <div className="flex flex-col justify-center items-center h-full">
                    <p className="text-xl font-bold text-white-5 mb-4">Visualize Your Progress</p>
                    <p className="text-lg text-white-50 text-center">
                      Start creating courses to see your statistics
                    </p>
                  </div>
                )}
              </div>
              {/* Total Statistics */}
              <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Stats</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors group">
                    <p className="text-sm font-medium text-gray-300 mb-1">Total Courses</p>
                    <p className="text-3xl font-bold text-yellow-400 group-hover:text-yellow-300">
                      {courses.length}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors group">
                    <p className="text-sm font-medium text-gray-300 mb-1">Total Students</p>
                    <p className="text-3xl font-bold text-yellow-400 group-hover:text-yellow-300">
                      {totalStudents}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors group">
                    <p className="text-sm font-medium text-gray-300 mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-yellow-400 group-hover:text-yellow-300">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white-800 rounded-2xl p-8 shadow-lg">
              {/* Render 3 courses */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white-5">Recent Courses</h3>
                <Link 
                  to="/dashboard/my-courses"
                  className="px-4 py-2 text-sm font-semibold text-yellow-50 hover:text-yellow-100 transition-colors duration-200"
                >
                  View All Courses →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(0, 3).map((course) => (
                  <div 
                    key={course._id} 
                    className="bg-gray-700 rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-xl shadow-md group"
                  >
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="h-[200px] w-full object-cover transform transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                        {course.courseName}
                      </h4>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-300">
                          <svg className="w-4 h-4 mr-1.5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-gray-300">{course.studentsEnroled.length} students</span>
                        </div>
                        <span className="font-semibold text-yellow-400 bg-gray-800 px-3 py-1 rounded-full">
                          ₹{course.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="bg-blue-500 rounded-full p-6 mb-6">
              <svg className="w-16 h-16 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Start Your Teaching Journey
            </h2>
            <p className="text-white text-lg mb-8 text-center max-w-md">
              Create your first course and share your knowledge with students around the world
            </p>
            <Link 
              to="/dashboard/add-course"
              className="px-8 py-4 bg-yellow-50 hover:bg-yellow-100 text-black rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    )
  }