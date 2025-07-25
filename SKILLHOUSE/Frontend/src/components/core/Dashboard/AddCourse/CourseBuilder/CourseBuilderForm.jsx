import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch()

  // handle form submission
  const onSubmit = async (data) => {
    console.log("🔧 DEBUG: onSubmit started", {
      formData: data,
      editSectionName,
      courseId: course?._id,
      hasToken: !!token
    })
    
    setLoading(true)
    
    // Check if user is authenticated
    const currentToken = token || localStorage.getItem("token")
    if (!currentToken) {
      console.error("🔧 DEBUG: No authentication token found")
      toast.error("Please login to continue")
      setLoading(false)
      return
    }
    
    // Validate course exists
    if (!course || !course._id) {
      console.error("🔧 DEBUG: Course not found in state", { course })
      toast.error("Course information missing. Please refresh and try again.")
      setLoading(false)
      return
    }
    
    try {
      let result
      
      console.log("🔧 DEBUG: About to call API", {
        operation: editSectionName ? "update" : "create",
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id
      })

      if (editSectionName) {
        result = await updateSection(
          {
            sectionName: data.sectionName,
            sectionId: editSectionName,
            courseId: course._id,
          },
          currentToken
        )
      } else {
        result = await createSection(
          {
            sectionName: data.sectionName,
            courseId: course._id,
          },
          currentToken
        )
      }
      
      console.log("🔧 DEBUG: API result received", {
        result,
        resultType: typeof result,
        hasData: !!result
      })
      
      if (result) {
        console.log("🔧 DEBUG: Updating course state with result")
        dispatch(setCourse(result))
        setEditSectionName(null)
        setValue("sectionName", "")
        toast.success(editSectionName ? "Section updated successfully" : "Section created successfully")
      } else {
        console.error("🔧 DEBUG: API returned null/undefined result")
        toast.error("Operation completed but no data returned. Please refresh to see changes.")
      }
    } catch (error) {
      console.error("🔧 DEBUG: Error in course section operation:", {
        error,
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      })
      toast.error("Failed to " + (editSectionName ? "update" : "create") + " section: " + (error.message || "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {
    console.log("🔧 DEBUG: goToNext function called", {
      courseContent: course?.courseContent,
      courseContentLength: course?.courseContent?.length,
      hasValidSections: course?.courseContent?.every(section =>
        Array.isArray(section.subSection) && section.subSection.length > 0
      ),
      sectionsDetailedCheck: course?.courseContent?.map(section => ({
        sectionId: section._id,
        sectionName: section.sectionName,
        hasSubSection: !!section.subSection,
        subSectionType: Array.isArray(section.subSection) ? 'array' : typeof section.subSection,
        subSectionLength: section.subSection?.length || 0,
        subSectionContent: section.subSection
      }))
    })
    
    if (!Array.isArray(course.courseContent) || course.courseContent.length === 0) {
      console.log("🔧 DEBUG: Validation failed - no sections")
      toast.error("Please add at least one section")
      return
    }
    
    // Check each section for valid subsections
    const invalidSections = course.courseContent.filter((section) => {
      const hasValidSubSections = Array.isArray(section.subSection) && section.subSection.length > 0
      console.log("🔧 DEBUG: Section validation", {
        sectionName: section.sectionName,
        hasSubSection: !!section.subSection,
        isArray: Array.isArray(section.subSection),
        length: section.subSection?.length || 0,
        isValid: hasValidSubSections
      })
      return !hasValidSubSections
    })
    
    if (invalidSections.length > 0) {
      console.log("🔧 DEBUG: Validation failed - sections without lectures", {
        invalidSections: invalidSections.map(s => s.sectionName)
      })
      toast.error("Please add at least one lecture in each section")
      return
    }
    
    console.log("🔧 DEBUG: Validation passed, moving to step 3")
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-slate-700 bg-slate-800 p-6">
      <p className="text-2xl font-semibold text-slate-100">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-slate-200" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { 
              required: "Section name is required",
              minLength: {
                value: 3,
                message: "Section name must be at least 3 characters"
              },
              maxLength: {
                value: 50,
                message: "Section name must be less than 50 characters"
              }
            })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              {errors.sectionName.message}
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-slate-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      
      {/* Show loading indicator when fetching sections */}
      {loading && <div className="flex justify-center py-4">
        <div className="spinner"></div>
      </div>}
      
      {Array.isArray(course.courseContent) && course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-slate-300 py-[8px] px-[20px] font-semibold text-slate-900`}
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onClick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}