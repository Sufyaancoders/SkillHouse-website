import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiUser, FiCalendar, FiPhone, FiInfo, FiSave, FiX } from "react-icons/fi"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

// Extract these to a separate file for reusability
const FORM_SCHEMA = {
  firstName: {
    required: "Please enter your first name",
    maxLength: {
      value: 50,
      message: "First name cannot be more than 50 characters",
    },
  },
  lastName: {
    required: "Please enter your last name",
    maxLength: {
      value: 50,
      message: "Last name cannot be more than 50 characters",
    },
  },
  dateOfBirth: {
    required: "Please enter your date of birth",
    validate: (value) => {
      const date = new Date(value)
      const today = new Date()
      if (date > today) return "Date of birth cannot be in the future"
      if (date < new Date("1900-01-01")) return "Please enter a valid date"
      return true
    }
  },
  gender: {
    required: "Please select your gender",
  },
  contactNumber: {
    required: "Please enter your contact number",
    pattern: {
      value: /^[0-9]{10,12}$/,
      message: "Please enter a valid 10-12 digit phone number",
    },
  },
  about: {
    required: "Please tell us a little about yourself",
    maxLength: {
      value: 500,
      message: "About cannot be more than 500 characters",
    },
  },
}

// Extract to constants file
const GENDER_OPTIONS = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [formChanged, setFormChanged] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth 
        ? new Date(user.additionalDetails.dateOfBirth).toISOString().split('T')[0] 
        : "",
      gender: user?.additionalDetails?.gender || "Prefer not to say",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      about: user?.additionalDetails?.about || "",
    },
    mode: "onChange",
  })

  // Watch for form changes
  React.useEffect(() => {
    setFormChanged(isDirty)
  }, [watch(), isDirty])

  const submitProfileForm = async (data) => {
    if (!formChanged) {
      toast.info("No changes detected")
      return
    }

    setLoading(true)
    try {
      await dispatch(updateProfile(token, data))
      toast.success("Profile updated successfully")
      reset(data) // Update form defaults to prevent false "unsaved changes" warnings
      setFormChanged(false)
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Helper component for form fields
  const FormField = ({ 
    id,
    label, 
    type = "text", 
    icon, 
    required = true,
    options = null,
    ...rest 
  }) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor={id} className="flex items-center gap-2 text-sm text-slate-300">
          {icon}
          {label} {required && <span className="text-pink-200">*</span>}
        </label>
        
        <div className="relative">
          {type === "select" ? (
            <select
              id={id}
              className="w-full rounded-md bg-slate-700 p-3 pl-3 text-slate-100 border border-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              {...register(id, FORM_SCHEMA[id])}
              disabled={loading}
              aria-invalid={errors[id] ? "true" : "false"}
              {...rest}
            >
              {options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : type === "textarea" ? (
            <textarea
              id={id}
              className="w-full rounded-md bg-slate-700 p-3 pl-3 text-slate-100 border border-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none"
              {...register(id, FORM_SCHEMA[id])}
              disabled={loading}
              aria-invalid={errors[id] ? "true" : "false"}
              {...rest}
            />
          ) : (
            <input
              type={type}
              id={id}
              className="w-full rounded-md bg-slate-700 p-3 pl-3 text-slate-100 border border-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              {...register(id, FORM_SCHEMA[id])}
              disabled={loading}
              aria-invalid={errors[id] ? "true" : "false"}
              {...rest}
            />
          )}
        </div>
        
        {errors[id] && (
          <span className="text-xs text-pink-200 italic">
            {errors[id].message}
          </span>
        )}
      </div>
    )
  }

  const cancelEdit = () => {
    if (formChanged && !window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
      return
    }
    navigate("/dashboard/my-profile")
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)} className="space-y-8">
        {/* Profile Information */}
        <div className="rounded-md border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-800/90 backdrop-blur-sm p-6 sm:p-8 shadow-md">
          <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
            <FiUser className="text-yellow-400" />
            Profile Information
          </h2>

          {/* Form layout - responsive grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Info Section */}
            <div className="space-y-6">
              {/* First Name */}
              <FormField
                id="firstName"
                label="First Name"
                icon={<FiUser size={14} className="text-slate-400" />}
                placeholder="Enter first name"
              />

              {/* Date of Birth */}
              <FormField
                id="dateOfBirth"
                label="Date of Birth"
                type="date"
                icon={<FiCalendar size={14} className="text-slate-400" />}
                max={new Date().toISOString().split("T")[0]}
              />

              {/* Contact Number */}
              <FormField
                id="contactNumber"
                label="Contact Number"
                type="tel"
                icon={<FiPhone size={14} className="text-slate-400" />}
                placeholder="Enter contact number"
              />
            </div>

            {/* Additional Info Section */}
            <div className="space-y-6">
              {/* Last Name */}
              <FormField
                id="lastName"
                label="Last Name"
                icon={<FiUser size={14} className="text-slate-400" />}
                placeholder="Enter last name"
              />

              {/* Gender */}
              <FormField
                id="gender"
                label="Gender"
                type="select"
                icon={<FiInfo size={14} className="text-slate-400" />}
                options={GENDER_OPTIONS}
              />

              {/* About */}
              <FormField
                id="about"
                label="About"
                type="textarea"
                icon={<FiInfo size={14} className="text-slate-400" />}
                placeholder="Tell us about yourself"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-wrap justify-end gap-4">
          <button
            type="button"
            onClick={cancelEdit}
            className="rounded-md bg-slate-700 py-2 px-5 font-medium text-slate-300 hover:bg-slate-600 transition-colors duration-200 flex items-center gap-2"
            disabled={loading}
          >
            <FiX size={16} /> Cancel
          </button>
          <IconBtn
            type="submit"
            text={loading ? "Saving..." : "Save Changes"}
            disabled={loading || !formChanged}
            customClasses={!formChanged ? "opacity-70 cursor-not-allowed" : ""}
          >
            {!loading && <FiSave size={16} />}
          </IconBtn>
        </div>
      </form>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="h-10 w-10 rounded-full border-4 border-slate-300 border-t-yellow-400 animate-spin mb-4"></div>
            <p className="text-slate-200">Updating your profile...</p>
          </div>
        </div>
      )}
    </>
  )
}