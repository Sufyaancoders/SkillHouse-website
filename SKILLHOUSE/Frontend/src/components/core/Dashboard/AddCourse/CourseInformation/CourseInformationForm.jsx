import React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      try {
        const categories = await fetchCourseCategories()
        if (categories.length > 0) {
          setCourseCategories(categories)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast.error("Failed to fetch course categories")
      } finally {
        setLoading(false)
      }
    }

    // Populate form if in edit mode
    if (editCourse && course) {
      setValue("courseTitle", course.courseName || "")
      setValue("courseShortDesc", course.courseDescription || "")
      setValue("coursePrice", course.price || 0)
      setValue("courseTags", course.tag || [])
      setValue("courseBenefits", course.whatYouWillLearn || "")
      setValue("courseCategory", course.category || "")
      setValue("courseRequirements", course.instructions || [])
      setValue("courseImage", course.thumbnail || "")
    }

    getCategories()
  }, [editCourse, course, setValue])

  const isFormUpdated = () => {
    if (!editCourse || !course) return true

    const currentValues = getValues()

    // Compare each field to detect changes
    return (
      currentValues.courseTitle !== (course.courseName || "") ||
      currentValues.courseShortDesc !== (course.courseDescription || "") ||
      currentValues.coursePrice !== (course.price || 0) ||
      JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag || []) ||
      currentValues.courseBenefits !== (course.whatYouWillLearn || "") ||
      (currentValues.courseCategory?._id || currentValues.courseCategory) !==
        (course.category?._id || course.category || "") ||
      JSON.stringify(currentValues.courseRequirements) !==
        JSON.stringify(course.instructions || []) ||
      currentValues.courseImage !== (course.thumbnail || "")
    )
  }

  // Handle form submission
  const onSubmit = async (data) => {
    if (editCourse && !isFormUpdated()) {
      toast.error("No changes made to the form")
      return
    }

    setLoading(true)

    try {
      if (editCourse) {
        // Handle course edit
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("courseId", course._id)

        // Only append changed fields
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag)) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory !== course.category) {
          formData.append("category", data.courseCategory)
        }
        if (JSON.stringify(currentValues.courseRequirements) !==
            JSON.stringify(course.instructions)) {
          formData.append("instructions", JSON.stringify(data.courseRequirements))
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

        const result = await editCourseDetails(formData, token)

        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
          toast.success("Course details updated successfully")
        }
      } else {
        // Handle new course creation
        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)

        const result = await addCourseDetails(formData, token)

        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
          toast.success("Course created successfully")
        }
      }
    } catch (error) {
      console.error("Error saving course details:", error)
      toast.error("Failed to save course details")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-slate-600 bg-slate-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-slate-200" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", {
            required: "Course title is required",
            minLength: {
              value: 5,
              message: "Course title must be at least 5 characters",
            },
            maxLength: {
              value: 100,
              message: "Course title must be less than 100 characters",
            },
          })}
          className="form-style w-full bg-slate-700 text-slate-100 border border-slate-600 rounded-md p-3"
          disabled={loading}
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.courseTitle.message}
          </span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-slate-200" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", {
            required: "Course description is required",
            minLength: {
              value: 20,
              message: "Description must be at least 20 characters",
            },
          })}
          className="form-style resize-none min-h-[130px] w-full bg-slate-700 text-slate-100 border border-slate-600 rounded-md p-3"
          disabled={loading}
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.courseShortDesc.message}
          </span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-slate-200" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: "Course price is required",
              valueAsNumber: true,
              validate: (value) => value >= 0 || "Price must be positive",
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: "Please enter a valid price",
              },
            })}
            className="form-style w-full !pl-12 bg-slate-700 text-slate-100 border border-slate-600 rounded-md p-3"
            disabled={loading}
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-slate-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.coursePrice.message}
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-slate-200" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: "Please select a category" })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full bg-slate-700 text-slate-100 border border-slate-600 rounded-md p-3"
          disabled={loading}
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {courseCategories?.map((category, index) => (
            <option key={index} value={category?._id}>
              {category?.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.courseCategory.message}
          </span>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
        disabled={loading}
      />

      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-slate-200" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", {
            required: "Benefits are required",
            minLength: {
              value: 10,
              message: "Benefits must be at least 10 characters",
            },
          })}
          className="form-style resize-none min-h-[130px] w-full bg-slate-700 text-slate-100 border border-slate-600 rounded-md p-3"
          disabled={loading}
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.courseBenefits.message}
          </span>
        )}
      </div>

      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
        disabled={loading}
      />

      {/* Action Buttons */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-slate-300 py-2 px-5 font-semibold text-slate-900 hover:bg-slate-400 transition-colors disabled:opacity-70"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          type="submit"
          disabled={loading}
          text={loading ? "Saving..." : !editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="spinner"></div>
        </div>
      )}
    </form>
  )
}