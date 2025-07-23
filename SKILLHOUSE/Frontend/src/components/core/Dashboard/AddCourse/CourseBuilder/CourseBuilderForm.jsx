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
    setLoading(true)
    
    // Check if user is authenticated
    const currentToken = token || localStorage.getItem("token")
    if (!currentToken) {
      toast.error("Please login to continue")
      setLoading(false)
      return
    }
    
    try {
      let result

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
      
      if (result) {
        dispatch(setCourse(result))
        setEditSectionName(null)
        setValue("sectionName", "")
        toast.success(editSectionName ? "Section updated successfully" : "Section created successfully")
      }
    } catch (error) {
      console.error("Error in course section operation:", error)
      toast.error("Failed to " + (editSectionName ? "update" : "create") + " section")
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
    if (!Array.isArray(course.courseContent) || course.courseContent.length === 0) {
      toast.error("Please add at least one section")
      return
    }
    if (
      course.courseContent.some((section) => !Array.isArray(section.subSection) || section.subSection.length === 0)
    ) {
      toast.error("Please add at least one lecture in each section")
      return
    }
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
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}