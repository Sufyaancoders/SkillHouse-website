import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [course, setValue])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    // Check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // Form has not been updated - no need to make API call
      goToCourses()
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("courseId", course._id)
      const courseStatus = getValues("public")
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFT
      formData.append("status", courseStatus)

      const result = await editCourseDetails(formData, token)
      if (result) {
        toast.success(
          `Course ${
            getValues("public") ? "published" : "saved as draft"
          } successfully`
        )
        goToCourses()
      }
    } catch (error) {
      console.error("Error updating course status:", error)
      toast.error("Failed to update course status")
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = () => {
    handleCoursePublish()
  }

  return (
    <div className="rounded-md border-[1px] border-slate-600 bg-slate-800 p-6">
      <h2 className="text-2xl font-semibold text-slate-100">
        Publish Settings
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label
            htmlFor="public"
            className="inline-flex items-center text-lg cursor-pointer"
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="public"
                {...register("public")}
                disabled={loading}
                className="sr-only" // Hide default checkbox but keep it accessible
              />
              <div
                className={`h-6 w-6 rounded border-2 ${
                  getValues("public")
                    ? "border-yellow-400 bg-yellow-400"
                    : "border-slate-400 bg-slate-700"
                } flex items-center justify-center transition-colors`}
              >
                {getValues("public") && (
                  <svg
                    className="h-4 w-4 text-slate-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="ml-2 text-slate-300">
              Make this course public
            </span>
          </label>
          <p className="mt-2 text-sm text-slate-400">
            {getValues("public")
              ? "Your course will be visible to students in the marketplace"
              : "Your course will be saved as a draft and won't be visible to students"}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-slate-300 py-2 px-5 font-semibold text-slate-900 hover:bg-slate-400 transition-colors disabled:opacity-70"
            aria-label="Go back to previous step"
          >
            Back
          </button>
          <IconBtn
            disabled={loading}
            text={loading ? "Saving..." : "Save Changes"}
          />
        </div>
      </form>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  )
}