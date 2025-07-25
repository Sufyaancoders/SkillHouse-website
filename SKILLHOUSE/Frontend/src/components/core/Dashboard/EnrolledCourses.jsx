import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);

      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, [])

  return (
    <>
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-indigo-400 to-purple-400 mb-8 text-center drop-shadow-lg animate-fade-in">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-indigo-800 shadow-lg animate-fade-in-down">
            <p className="w-[45%] px-5 py-3 font-bold text-yellow-300">Course Name</p>
            <p className="w-1/4 px-2 py-3 font-bold text-yellow-300">Duration</p>
            <p className="flex-1 px-2 py-3 font-bold text-yellow-300">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-indigo-700 bg-indigo-900 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"} animate-fade-in-up`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-16 w-16 rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold text-yellow-200 text-lg">{course.courseName}</p>
                  <p className="text-xs text-indigo-200">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3 text-yellow-100 font-semibold">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p className="text-indigo-200 font-semibold">Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="10px"
                  isLabelVisible={false}
                  baseBgColor="#312e81"
                  bgColor="#facc15"
                  className="rounded-full shadow-md"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}