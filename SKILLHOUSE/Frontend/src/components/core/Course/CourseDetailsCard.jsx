import React, { useState } from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [imageError, setImageError] = useState(false)

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const isEnrolled = user && course?.studentsEnrolled?.includes(user?._id)

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      toast.success("Course added to cart")
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const handleImageError = () => {
    console.error("Failed to load image:", ThumbnailImage)
    setImageError(true)
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border border-slate-700 bg-slate-800 p-4 text-slate-100 shadow-md">
      {/* Course Image */}
      <div className="relative overflow-hidden rounded-lg">
        {imageError ? (
          <div className="flex h-[180px] w-full items-center justify-center bg-slate-700 text-slate-400">
            <p>Course Image Not Available</p>
          </div>
        ) : (
          <img
            src={ThumbnailImage}
            alt={course?.courseName || "Course Thumbnail"}
            className="h-auto w-full max-h-[300px] min-h-[180px] rounded-lg object-cover"
            onError={handleImageError}
          />
        )}
      </div>

      <div className="px-4">
        {/* Price */}
        <div className="space-x-3 pb-4 text-3xl font-semibold text-slate-100">
          Rs. {CurrentPrice}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            className={`rounded-md py-3 px-6 font-medium transition-all duration-200 ${
              isEnrolled
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-yellow-500 text-slate-900 hover:bg-yellow-600"
            }`}
            onClick={
              isEnrolled
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
            aria-label={isEnrolled ? "Go to enrolled course" : "Buy this course now"}
          >
            {isEnrolled ? "Go To Course" : "Buy Now"}
          </button>
          
          {!isEnrolled && (
            <button 
              onClick={handleAddToCart} 
              className="rounded-md bg-slate-700 py-3 px-6 font-medium text-slate-100 hover:bg-slate-600 transition-all duration-200"
              aria-label="Add course to cart"
            >
              Add to Cart
            </button>
          )}
        </div>
        
        {/* Guarantee */}
        <div>
          <p className="pb-3 pt-6 text-center text-sm text-slate-300">
            30-Day Money-Back Guarantee
          </p>
        </div>

        {/* Course Includes Section */}
        <div className="mt-2">
          <h3 className="my-2 text-xl font-semibold text-slate-100">
            This Course Includes:
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-green-400">
            {course?.instructions?.map((item, i) => (
              <li className="flex gap-2 items-center" key={i}>
                <BsFillCaretRightFill aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Share Button */}
        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 py-6 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
            onClick={handleShare}
            aria-label="Share course link"
          >
            <FaShareSquare size={15} aria-hidden="true" /> Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard