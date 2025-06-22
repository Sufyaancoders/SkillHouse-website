import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      gender: user?.additionalDetails?.gender || "Prefer not to say",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      about: user?.additionalDetails?.about || "",
    },
  })

  const submitProfileForm = async (data) => {
    setLoading(true)
    try {
      await dispatch(updateProfile(token, data))
      toast.success("Profile updated successfully")
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)} className="space-y-8">
        {/* Profile Information */}
        <div className="rounded-md border-[1px] border-slate-700 bg-slate-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-slate-100 mb-6">
            Profile Information
          </h2>

          {/* First Name and Last Name */}
          <div className="flex flex-col gap-5 lg:flex-row mb-6">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="text-sm text-slate-300">
                First Name{" "}
                <span className="text-pink-200">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className="w-full rounded-md bg-slate-700 p-3 text-slate-100 border border-slate-600 focus:outline-none focus:border-yellow-400"
                {...register("firstName", {
                  required: "Please enter your first name",
                  maxLength: {
                    value: 50,
                    message: "First name cannot be more than 50 characters",
                  },
                })}
                disabled={loading}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <span className="text-xs text-pink-200">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="text-sm text-slate-300">
                Last Name{" "}
                <span className="text-pink-200">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                className="w-full rounded-md bg-slate-700 p-3 text-slate-100 border border-slate-600 focus:outline-none focus:border-yellow-400"
                {...register("lastName", {
                  required: "Please enter your last name",
                  maxLength: {
                    value: 50,
                    message: "Last name cannot be more than 50 characters",
                  },
                })}
                disabled={loading}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <span className="text-xs text-pink-200">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          {/* Date of Birth and Gender */}
          <div className="flex flex-col gap-5 lg:flex-row mb-6">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="text-sm text-slate-300">
                Date of Birth{" "}
                <span className="text-pink-200">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="w-full rounded-md bg-slate-700 p-3 text-slate-100 border border-slate-600 focus:outline-none focus:border-yellow-400"
                {...register("dateOfBirth", {
                  required: "Please enter your date of birth",
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of birth cannot be in the future",
                  },
                })}
                disabled={loading}
                aria-invalid={errors.dateOfBirth ? "true" : "false"}
              />
              {errors.dateOfBirth && (
                <span className="text-xs text-pink-200">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="text-sm text-slate-300">
                Gender{" "}
                <span className="text-pink-200">*</span>
              </label>
              <select
                id="gender"
                className="w-full rounded-md bg-slate-700 p-3 text-slate-100 border border-slate-600 focus:outline-none focus:border-yellow-400"
                {...register("gender", {
                  required: "Please select your gender",
                })}
                disabled={loading}
                aria-invalid={errors.gender ? "true" : "false"}
              >
                {genders.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-xs text-pink-200">
                  {errors.gender.message}
                </span>
              )}
            </div>
          </div>

          {/* Contact Number and About */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="text-sm text-slate-300">
                Contact Number{" "}
                <span className="text-pink-200">*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter contact number"
                className="w-full rounded-md bg-slate-700 p-3 text-slate-100 border border-slate-600 focus:outline-none focus:border-yellow-400"
                {...register("contactNumber", {
                  required: "Please enter your contact number",
                  pattern: {
                    value: /^[0-9]{10,12}$/,
                    message: "Please enter a valid 10-12 digit phone number",
                  },
                })}
                disabled={loading}
                aria-invalid={errors.contactNumber ? "true" : "false"}
              />
              {errors.contactNumber && (
                <span className="text-xs text-pink-200">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="text-sm text-slate-300">
                About{" "}
                <span className="text-pink-200">*</span>
              </label>
              <textarea
                id="about"
                placeholder="Tell us about yourself"
                rows="3"
                className="w-full rounded-md bg-slate-700 p-3 text-slate-100 border border-slate-600 focus:outline-none focus:border-yellow-400 resize-none"
                {...register("about", {
                  required: "Please tell us a little about yourself",
                })}
                disabled={loading}
                aria-invalid={errors.about ? "true" : "false"}
              />
              {errors.about && (
                <span className="text-xs text-pink-200">
                  {errors.about.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="rounded-md bg-slate-700 py-2 px-5 font-medium text-slate-100 hover:bg-slate-600 transition-colors duration-200"
            disabled={loading}
          >
            Cancel
          </button>
          <IconBtn
            type="submit"
            text={loading ? "Saving..." : "Save Changes"}
            disabled={loading}
          />
        </div>
      </form>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="spinner"></div>
        </div>
      )}
    </>
  )
}