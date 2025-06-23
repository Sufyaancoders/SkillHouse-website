import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  
  const [loading, setLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const modalRef = useRef(null)
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      courseExperience: "",
      courseRating: 0,
    }
  })
  
  const watchRating = watch("courseRating")

  // Reset form on mount
  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setReviewModal(false)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [setReviewModal])

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setReviewModal(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setReviewModal])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    if (data.courseRating === 0) {
      toast.error("Please add a rating before submitting")
      return
    }
    
    setLoading(true)
    try {
      await createRating(
        {
          courseId: courseEntireData._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token
      )
      toast.success("Review submitted successfully")
      setReviewModal(false)
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div 
      className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-slate-900 bg-opacity-50 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={modalRef}
        className="my-10 w-11/12 max-w-[700px] rounded-lg border border-slate-600 bg-slate-800 shadow-xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-slate-700 p-5">
          <p id="modal-title" className="text-xl font-semibold text-slate-100">Add Review</p>
          <button 
            onClick={() => setReviewModal(false)}
            className="text-slate-300 hover:text-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <RxCross2 className="text-2xl" />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            {imageError || !user?.image ? (
              <div className="aspect-square w-[50px] rounded-full bg-slate-600 flex items-center justify-center text-slate-300">
                {user?.firstName?.charAt(0) || "U"}
              </div>
            ) : (
              <img
                src={user?.image}
                alt={`${user?.firstName || 'User'}'s profile`}
                className="aspect-square w-[50px] rounded-full object-cover bg-slate-600"
                onError={handleImageError}
              />
            )}
            <div>
              <p className="font-semibold text-slate-100">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-slate-300">Posting Publicly</p>
            </div>
          </div>
          
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <div className="mb-4 text-center">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                value={watchRating}
                activeColor="#fcd34d" // yellow-300
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                a11y={true}
                aria-label="Rate this course"
              />
              {watchRating === 0 && (
                <p className="mt-1 text-sm text-yellow-300">
                  Please select a rating
                </p>
              )}
            </div>
            
            <div className="flex w-full flex-col space-y-2">
              <label
                className="text-sm text-slate-200"
                htmlFor="courseExperience"
              >
                Add Your Experience <span className="text-red-400">*</span>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Share your experience with this course..."
                {...register("courseExperience", { 
                  required: "Please share your experience" 
                })}
                className="min-h-[130px] w-full resize-none rounded-md bg-slate-700 p-3 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                disabled={loading}
                aria-invalid={errors.courseExperience ? "true" : "false"}
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-red-400">
                  {errors.courseExperience.message}
                </span>
              )}
            </div>
            
            <div className="mt-6 flex w-full justify-end gap-x-3">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="rounded-md bg-slate-600 py-2 px-4 font-medium text-slate-100 hover:bg-slate-500 transition-colors disabled:opacity-70"
                disabled={loading}
              >
                Cancel
              </button>
              <IconBtn 
                text={loading ? "Submitting..." : "Submit Review"} 
                disabled={loading}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}