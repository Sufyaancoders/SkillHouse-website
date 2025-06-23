import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { toast } from "react-hot-toast"

// Replace video-react with React Player
import ReactPlayer from "react-player"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        if (!courseSectionData?.length) {
          return
        }

        if (!courseId || !sectionId || !subSectionId) {
          navigate(`/dashboard/enrolled-courses`)
          return
        }

        // Find the current section
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )

        if (!filteredData?.length) {
          toast.error("Section not found")
          navigate(`/dashboard/enrolled-courses`)
          return
        }

        // Find the current subsection (video)
        const filteredVideoData = filteredData[0]?.subSection?.filter(
          (data) => data._id === subSectionId
        )

        if (!filteredVideoData?.length) {
          toast.error("Lecture not found")
          navigate(`/dashboard/enrolled-courses`)
          return
        }

        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData?.thumbnail || "")
        setVideoEnded(false)
        setVideoError(false)
      } catch (error) {
        console.error("Error loading video data:", error)
        toast.error("Failed to load video content")
        setVideoError(true)
      }
    }

    fetchVideoData()
  }, [
    courseSectionData,
    courseEntireData,
    courseId,
    sectionId,
    subSectionId,
    navigate,
    location.pathname,
  ])

  // Check if the lecture is the first video of the course
  const isFirstVideo = () => {
    try {
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      if (currentSectionIndx === -1) return true

      const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )

      return currentSectionIndx === 0 && currentSubSectionIndx === 0
    } catch (error) {
      console.error("Error checking if first video:", error)
      return true // Safer default
    }
  }

  // Go to the next video
  const goToNextVideo = () => {
    try {
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      if (currentSectionIndx === -1) return

      const currentSection = courseSectionData[currentSectionIndx]
      const noOfSubsections = currentSection?.subSection?.length || 0

      const currentSubSectionIndx = currentSection?.subSection.findIndex(
        (data) => data._id === subSectionId
      )

      if (currentSubSectionIndx === -1) return

      // If not the last subsection in current section
      if (currentSubSectionIndx !== noOfSubsections - 1) {
        const nextSubSectionId = currentSection.subSection[currentSubSectionIndx + 1]._id
        navigate(
          `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
        )
        return
      }

      // If last subsection but not last section
      if (currentSectionIndx < courseSectionData.length - 1) {
        const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
        const nextSubSectionId = courseSectionData[currentSectionIndx + 1].subSection[0]._id
        navigate(
          `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
        )
      }
    } catch (error) {
      console.error("Error navigating to next video:", error)
      toast.error("Failed to navigate to next video")
    }
  }

  // Check if the lecture is the last video of the course
  const isLastVideo = () => {
    try {
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      if (currentSectionIndx === -1) return true

      const noOfSubsections = courseSectionData[currentSectionIndx]?.subSection?.length || 0

      const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )

      return (
        currentSectionIndx === courseSectionData.length - 1 &&
        currentSubSectionIndx === noOfSubsections - 1
      )
    } catch (error) {
      console.error("Error checking if last video:", error)
      return true // Safer default
    }
  }

  // Go to the previous video
  const goToPrevVideo = () => {
    try {
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      if (currentSectionIndx === -1) return

      const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )

      if (currentSubSectionIndx === -1) return

      // If not the first subsection in current section
      if (currentSubSectionIndx !== 0) {
        const prevSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]._id
        navigate(
          `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
        )
        return
      }

      // If first subsection but not first section
      if (currentSectionIndx > 0) {
        const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
        const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length
        const prevSubSectionId = courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id
        navigate(
          `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
        )
      }
    } catch (error) {
      console.error("Error navigating to previous video:", error)
      toast.error("Failed to navigate to previous video")
    }
  }

  const handleLectureCompletion = async () => {
    try {
      setLoading(true)
      const res = await markLectureAsComplete(
        { courseId: courseId, subsectionId: subSectionId },
        token
      )

      if (res) {
        dispatch(updateCompletedLectures(subSectionId))
        toast.success("Lecture marked as complete!")
      } else {
        throw new Error("Failed to mark lecture as complete")
      }
    } catch (error) {
      console.error("Error marking lecture as complete:", error)
      toast.error("Failed to mark lecture as complete")
    } finally {
      setLoading(false)
    }
  }

  // Handle video player errors
  const handleVideoError = () => {
    setVideoError(true)
    toast.error("Failed to load video content")
  }

  return (
    <div className="flex flex-col gap-5 text-slate-100">
      <div className="rounded-md overflow-hidden relative">
        {videoData?.videoUrl && !videoError ? (
          <div className="relative aspect-video w-full">
            <ReactPlayer
              ref={playerRef}
              url={videoData.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              onEnded={() => setVideoEnded(true)}
              onError={handleVideoError}
              className="react-player"
              playing
            />

            {/* Render When Video Ends */}
            {videoEnded && (
              <div
                className="absolute inset-0 z-[100] grid h-full place-content-center bg-gradient-to-t from-slate-900 to-transparent p-6"
                role="dialog"
                aria-label="Video completed options"
              >
                <div className="flex flex-col items-center gap-4 rounded-lg bg-slate-800/90 p-6 backdrop-blur-sm">
                  {!completedLectures.includes(subSectionId) && (
                    <IconBtn
                      disabled={loading}
                      onclick={handleLectureCompletion}
                      text={loading ? "Marking..." : "Mark As Completed"}
                      customClasses="text-lg max-w-max px-4 mx-auto"
                    />
                  )}

                  <IconBtn
                    disabled={loading}
                    onclick={() => {
                      if (playerRef?.current) {
                        // Set the current time of the video to 0
                        playerRef?.current?.seek(0)
                        setVideoEnded(false)
                      }
                    }}
                    text="Rewatch"
                    customClasses="text-lg max-w-max px-4 mx-auto"
                  />

                  <div className="mt-6 flex min-w-[250px] justify-center gap-x-4">
                    {!isFirstVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="rounded-md bg-slate-700 px-4 py-2 font-medium text-slate-100 transition-colors hover:bg-slate-600 disabled:opacity-70"
                        aria-label="Go to previous lecture"
                      >
                        Previous
                      </button>
                    )}
                    {!isLastVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToNextVideo}
                        className="rounded-md bg-yellow-500 px-4 py-2 font-medium text-slate-900 transition-colors hover:bg-yellow-400 disabled:opacity-70"
                        aria-label="Go to next lecture"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Fallback when video can't be loaded
          <div className="aspect-video w-full bg-slate-800 flex flex-col items-center justify-center p-6 text-center">
            {videoError ? (
              <>
                <p className="text-xl font-medium text-slate-300 mb-4">
                  Failed to load video content
                </p>
                <button
                  onClick={() => setVideoError(false)}
                  className="rounded-md bg-slate-700 px-4 py-2 font-medium text-slate-100 hover:bg-slate-600 transition-colors"
                >
                  Try Again
                </button>
              </>
            ) : (
              <>
                <img
                  src={previewSource || "/path/to/fallback-image.jpg"}
                  alt="Course Thumbnail"
                  className="h-full max-h-[300px] w-auto rounded-md object-contain"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://via.placeholder.com/640x360?text=Course+Preview"
                  }}
                />
                <p className="mt-4 text-lg text-slate-300">
                  Loading video content...
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Video Details */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-100">
          {videoData?.title || "Loading lecture..."}
        </h1>
        <p className="text-slate-300">
          {videoData?.description || "No description available for this lecture."}
        </p>
      </div>

      {/* Navigation buttons outside video player */}
      <div className="flex justify-between mt-6 pt-4 border-t border-slate-700">
        <button
          disabled={loading || isFirstVideo()}
          onClick={goToPrevVideo}
          className={`rounded-md px-4 py-2 font-medium transition-colors ${
            isFirstVideo()
              ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
              : "bg-slate-700 text-slate-100 hover:bg-slate-600"
          }`}
        >
          ← Previous Lecture
        </button>

        <button
          disabled={loading || isLastVideo()}
          onClick={goToNextVideo}
          className={`rounded-md px-4 py-2 font-medium transition-colors ${
            isLastVideo()
              ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
              : "bg-yellow-500 text-slate-900 hover:bg-yellow-400"
          }`}
        >
          Next Lecture →
        </button>
      </div>
    </div>
  )
}

export default VideoDetails