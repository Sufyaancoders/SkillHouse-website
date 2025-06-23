import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [reviewModal, setReviewModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId || !token) {
        toast.error("Missing course information")
        navigate("/dashboard/enrolled-courses")
        return
      }
      
      setLoading(true)
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token)
        
        if (!courseData || !courseData.courseDetails) {
          throw new Error("Failed to fetch course details")
        }
        
        // Store course data in Redux
        dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
        dispatch(setEntireCourseData(courseData.courseDetails))
        dispatch(setCompletedLectures(courseData.completedVideos))
        
        // Calculate total number of lectures
        let lectures = 0
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection?.length || 0
        })
        dispatch(setTotalNoOfLectures(lectures))
      } catch (error) {
        console.error("Error fetching course details:", error)
        toast.error("Failed to load course content")
        navigate("/dashboard/enrolled-courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [courseId, token, dispatch, navigate])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-slate-900 text-slate-100">
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
            <div 
              className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto" 
              role="main" 
              aria-label="Course content viewer"
            >
              <div className="mx-6 my-4">
                <Outlet />
              </div>
            </div>
          </>
        )}
      </div>
      {reviewModal && (
        <CourseReviewModal setReviewModal={setReviewModal} />
      )}
    </>
  )
}