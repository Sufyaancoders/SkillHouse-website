import { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-hot-toast" // Add toast import

import { addToCart } from "../slices/cartSlice" // Add this import for the cart action

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()

  // State declarations
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [isActive, setIsActive] = useState(Array(0))
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  const [imageError, setImageError] = useState(false)

  // Fetch course details
  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.error("Could not fetch Course Details:", error)
      }
    }

    getCourseDetails()
  }, [courseId])

  // Calculate average review rating
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

  // Handle section collapse state
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    )
  }

  // Calculate total lectures
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection?.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  // Handle image load error
  const handleImageError = () => {
    setImageError(true)
  }

  // Handle buy course action
  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // Display loading spinner
  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  // Display error page if API call failed
  if (!response.success) {
    return <Error />
  }

  // Extract course details
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails

  // Display loading spinner during payment
  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full bg-slate-800">
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            {/* Course thumbnail for mobile */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              {imageError ? (
                <div className="aspect-video w-full bg-slate-700 flex items-center justify-center text-slate-400">
                  Course Image Not Available
                </div>
              ) : (
                <img
                  src={thumbnail}
                  alt={courseName}
                  className="aspect-video w-full object-cover"
                  onError={handleImageError}
                />
              )}
            </div>

            {/* Course details */}
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-slate-100">
              <div>
                <h1 className="text-4xl font-bold text-slate-100 sm:text-[42px]">
                  {courseName}
                </h1>
              </div>
              <p className="text-slate-300">{courseDescription}</p>

              {/* Ratings and enrollment */}
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-400">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span className="text-slate-300">{`(${
                  ratingAndReviews?.length || 0
                } reviews)`}</span>
                <span className="text-slate-300">{`${
                  studentsEnrolled?.length || 0
                } students enrolled`}</span>
              </div>

              {/* Instructor */}
              <div>
                <p className="text-slate-200">
                  Created By{" "}
                  {`${instructor?.firstName || ""} ${instructor?.lastName || ""}`}
                </p>
              </div>

              {/* Course meta info */}
              <div className="flex flex-wrap gap-5 text-lg text-slate-300">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            {/* Mobile purchase options */}
            <div className="flex w-full flex-col gap-4 border-y border-y-slate-700 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-slate-100">
                Rs. {price}
              </p>
              <button
                className="rounded-md bg-yellow-500 py-3 px-6 font-medium text-slate-900 hover:bg-yellow-600 transition-all duration-200"
                onClick={handleBuyCourse}
              >
                Buy Now
              </button>
              <button
                className="rounded-md bg-slate-700 py-3 px-6 font-medium text-slate-100 hover:bg-slate-600 transition-all duration-200"
                onClick={() => {
                  if (!user || user?.accountType !== "Instructor") {
                    dispatch(addToCart(response?.data?.courseDetails))
                    toast.success("Course added to cart")
                  } else {
                    toast.error("Instructors can't buy courses")
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Desktop course card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      {/* Course content sections */}
      <div className="mx-auto box-content px-4 text-start text-slate-100 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What you'll learn section */}
          <div className="my-8 border border-slate-700 bg-slate-800 p-8 rounded-md">
            <h2 className="text-3xl font-semibold">What you'll learn</h2>
            <div className="mt-5 prose prose-slate prose-invert max-w-none">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <h2 className="text-[28px] font-semibold">Course Content</h2>
              <div className="flex flex-wrap justify-between gap-2 text-slate-300">
                <div className="flex gap-2">
                  <span>
                    {courseContent?.length || 0} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>
                    {response.data?.totalDuration || "0h 0m"} total length
                  </span>
                </div>
                <div>
                  <button
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4 space-y-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <h2 className="text-[28px] font-semibold">Author</h2>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor?.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${
                          instructor?.firstName || "User"
                        } ${instructor?.lastName || ""}`
                  }
                  alt={`${instructor?.firstName || "Instructor"} ${
                    instructor?.lastName || ""
                  }`}
                  className="h-14 w-14 rounded-full object-cover bg-slate-700"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${
                      instructor?.firstName || "User"
                    } ${instructor?.lastName || ""}`
                  }}
                />
                <p className="text-lg">{`${instructor?.firstName || ""} ${
                  instructor?.lastName || ""
                }`}</p>
              </div>
              <p className="text-slate-300">
                {instructor?.additionalDetails?.about ||
                  "No information available about this instructor."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails