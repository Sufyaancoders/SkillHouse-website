import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating'

// Rename to PascalCase in your file system too
const Course_Card
 = ({ course, Height = "h-[200px]" }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (course?.ratingAndReviews) {
      const count = GetAvgRating(course.ratingAndReviews)
      setAvgReviewCount(count)
    }
  }, [course])

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true)
  }

  // Early return if course data is missing
  if (!course) {
    return (
      <div className="border border-slate-700 rounded-xl p-4 bg-slate-800 shadow-md animate-pulse">
        <div className={`${Height || "h-[200px]"} w-full rounded-xl bg-slate-700`}></div>
        <div className="flex flex-col gap-2 px-1 py-3">
          <div className="h-6 bg-slate-700 rounded-md w-2/3"></div>
          <div className="h-4 bg-slate-700 rounded-md w-1/2"></div>
          <div className="h-4 bg-slate-700 rounded-md w-1/4"></div>
          <div className="h-6 bg-slate-700 rounded-md w-1/3"></div>
        </div>
      </div>
    )
  }

  return (
    <Link 
      to={`/courses/${course._id}`}
      className="block transition-transform duration-300 hover:scale-[1.02]"
      aria-label={`View course: ${course.courseName}`}
    >
      <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Course image with fallback */}
        <div className="relative overflow-hidden">
          {imageError ? (
            <div className={`${Height || "h-[200px]"} w-full bg-slate-700 flex items-center justify-center text-slate-400`}>
              Course Image Not Available
            </div>
          ) : (
            <img
              src={course?.thumbnail}
              alt={`${course?.courseName} - Course thumbnail`}
              className={`${Height || "h-[200px]"} w-full object-cover transition-transform duration-300 hover:scale-105`}
              onError={handleImageError}
              loading="lazy"
            />
          )}
        </div>

        {/* Course details */}
        <div className="flex flex-col gap-2 p-4">
          <h3 className="text-xl font-semibold text-slate-100 line-clamp-1">
            {course?.courseName}
          </h3>
          
          <p className="text-sm text-slate-300">
            {course?.instructor?.firstName || "Instructor"} {course?.instructor?.lastName || ""}
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-medium">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-slate-400 text-sm">
              ({course?.ratingAndReviews?.length || 0} {course?.ratingAndReviews?.length === 1 ? "Rating" : "Ratings"})
            </span>
          </div>
          
          <p className="text-xl font-bold text-slate-100">
            Rs. {course?.price || 0}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card
