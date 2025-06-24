import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-md">
        <Table className="w-full">
          <Thead>
            <Tr className="border-b border-slate-700 bg-slate-700 text-left">
              <Th className="w-[45%] p-4 font-semibold text-slate-100">
                Courses
              </Th>
              <Th className="p-4 font-semibold text-slate-100">
                Duration
              </Th>
              <Th className="p-4 font-semibold text-slate-100">
                Price
              </Th>
              <Th className="p-4 font-semibold text-slate-100">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses?.length === 0 ? (
              <Tr>
                <Td className="py-16 text-center text-xl font-medium text-slate-300">
                  No courses found
                  <p className="mt-2 text-sm text-slate-400">
                    Create your first course to get started
                  </p>
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr
                  key={course._id}
                  className="border-b border-slate-700 transition-colors hover:bg-slate-700/30"
                >
                  <Td className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="h-32 w-48 rounded-lg object-cover border border-slate-600 shadow-sm"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src =
                            "https://via.placeholder.com/220x148/1e293b/e2e8f0?text=Course+Image"
                        }}
                      />
                      <div className="flex flex-col justify-between py-1">
                        <p className="text-lg font-semibold text-slate-100">
                          {course.courseName}
                        </p>
                        <p className="text-sm text-slate-300 line-clamp-3">
                          {course.courseDescription.split(" ").length >
                          TRUNCATE_LENGTH
                            ? course.courseDescription
                                .split(" ")
                                .slice(0, TRUNCATE_LENGTH)
                                .join(" ") + "..."
                            : course.courseDescription}
                        </p>
                        <div className="flex items-center gap-3">
                          <p className="text-xs text-slate-400">
                            Created: {formatDate(course.createdAt)}
                          </p>
                          {course.status === COURSE_STATUS.DRAFT ? (
                            <span className="flex items-center gap-1.5 rounded-full bg-slate-700 px-2.5 py-1 text-xs font-medium text-orange-300">
                              <HiClock size={13} />
                              Draft
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 rounded-full bg-slate-700 px-2.5 py-1 text-xs font-medium text-green-300">
                              <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-300 text-slate-800">
                                <FaCheck size={8} />
                              </div>
                              Published
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Td>
                  <Td className="p-4 text-sm font-medium text-slate-300">
                    2hr 30min
                  </Td>
                  <Td className="p-4 text-sm font-medium text-slate-300">
                    ₹{course.price}
                  </Td>
                  <Td className="p-4">
                    <div className="flex gap-3">
                      <button
                        disabled={loading}
                        onClick={() => {
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }}
                        title="Edit Course"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 transition-all hover:bg-slate-600 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Edit course"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Delete this course?",
                            text2:
                              "This will permanently remove the course and all its data",
                            btn1Text: !loading ? "Delete" : "Deleting...",
                            btn2Text: "Cancel",
                            btn1Handler: !loading
                              ? () => handleCourseDelete(course._id)
                              : () => {},
                            btn2Handler: !loading
                              ? () => setConfirmationModal(null)
                              : () => {},
                          })
                        }}
                        title="Delete Course"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 transition-all hover:bg-red-500/20 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Delete course"
                      >
                        <RiDeleteBin6Line size={16} />
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}