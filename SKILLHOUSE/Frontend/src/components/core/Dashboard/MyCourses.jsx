import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion" // Optional - for animations

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const result = await fetchInstructorCourses(token)
        if (result) {
          setCourses(result)
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-8">
      {/* Header Section with Add Course Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-700 pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-100">My Courses</h1>
          <p className="mt-1 text-slate-400">
            Manage your courses and their content
          </p>
        </div>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
          customClasses="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-medium"
        >
          <VscAdd className="text-lg" />
        </IconBtn>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-sm">
          <h3 className="text-slate-400 font-medium mb-2 text-sm">
            Total Courses
          </h3>
          <p className="text-3xl font-bold text-slate-100">
            {courses.length}
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-sm">
          <h3 className="text-slate-400 font-medium mb-2 text-sm">
            Published
          </h3>
          <p className="text-3xl font-bold text-green-400">
            {
              courses.filter((course) => course.status === "Published")
                .length
            }
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-sm">
          <h3 className="text-slate-400 font-medium mb-2 text-sm">Draft</h3>
          <p className="text-3xl font-bold text-orange-400">
            {
              courses.filter((course) => course.status !== "Published")
                .length
            }
          </p>
        </div>
      </div>

      {/* Course Table */}
      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full border-4 border-slate-400 border-t-transparent animate-spin"></div>
            <p className="text-slate-400">Loading courses...</p>
          </div>
        </div>
      ) : (
        <div>
          {courses.length > 0 ? (
            <CoursesTable courses={courses} setCourses={setCourses} />
          ) : (
            <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
              <div className="flex justify-center">
                <div className="bg-slate-700 p-6 rounded-full">
                  <VscAdd className="text-4xl text-yellow-400" />
                </div>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-100">
                Create your first course
              </h2>
              <p className="mt-2 text-slate-400 max-w-md mx-auto">
                You haven't created any courses yet. Get started by creating your
                first course and sharing your knowledge with students.
              </p>
              <button
                onClick={() => navigate("/dashboard/add-course")}
                className="mt-6 px-6 py-2 bg-yellow-500 text-slate-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Create Course
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}