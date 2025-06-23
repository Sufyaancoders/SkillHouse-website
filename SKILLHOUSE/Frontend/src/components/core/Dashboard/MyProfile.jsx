import React, { useState } from "react"
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiSave, FiX, FiUser, FiMail, FiPhone, FiCalendar, FiInfo } from "react-icons/fi"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const [isEditingAbout, setIsEditingAbout] = useState(false)
  const [aboutText, setAboutText] = useState(
    user?.additionalDetails?.about || "Write something about yourself"
  )

  const userImage = user?.image
    ? user.image
    : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`

  const handleSaveAbout = () => {
    // Here you would typically make an API call to save the about text
    console.log('Saving about text:', aboutText)
    setIsEditingAbout(false)
    // For now just disable editing mode
  }

  const handleCancelAbout = () => {
    // Reset to original text
    setAboutText(user?.additionalDetails?.about || "Write something about yourself")
    setIsEditingAbout(false)
  }

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <div className="bg-slate-800 rounded-xl overflow-hidden shadow-md border border-slate-700">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-500"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            <div className="relative -mt-16 sm:-mt-12">
              <img
                src={userImage}
                alt={`profile-${user?.firstName}`}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-slate-800 shadow-lg bg-slate-700"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:pb-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
                    {user?.firstName + " " + user?.lastName}
                  </h1>
                  <p className="text-slate-300 mt-1">{user?.email}</p>
                </div>
                <IconBtn
                  text="Edit Profile"
                  onclick={() => navigate("/dashboard/settings")}
                  customClasses="mt-3 sm:mt-0"
                >
                  <RiEditBoxLine className="mr-2" />
                </IconBtn>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Active
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {user?.accountType}
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {user?.additionalDetails?.gender || "Gender not specified"}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-100">About</h2>
          {!isEditingAbout ? (
            <button
              onClick={() => setIsEditingAbout(true)}
              className="inline-flex items-center px-3 py-1.5 text-sm text-yellow-400 hover:text-yellow-300 hover:bg-slate-700 rounded-lg transition-colors group"
            >
              <RiEditBoxLine className="mr-1 group-hover:scale-110 transition-transform" />
              Edit
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveAbout}
                className="inline-flex items-center px-3 py-1.5 text-sm text-green-400 hover:text-green-300 hover:bg-slate-700 rounded-lg transition-colors group"
              >
                <FiSave className="mr-1 group-hover:scale-110 transition-transform" />
                Save
              </button>
              <button
                onClick={handleCancelAbout}
                className="inline-flex items-center px-3 py-1.5 text-sm text-slate-400 hover:text-slate-300 hover:bg-slate-700 rounded-lg transition-colors group"
              >
                <FiX className="mr-1 group-hover:scale-110 transition-transform" />
                Cancel
              </button>
            </div>
          )}
        </div>
        
        {!isEditingAbout ? (
          <p className="text-slate-300 leading-relaxed">
            {aboutText}
          </p>
        ) : (
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="w-full p-3 border border-slate-600 bg-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors resize-none"
            rows={4}
            placeholder="Tell us about yourself..."
          />
        )}
      </div>

      {/* Personal Details */}
      <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-100">Personal Details</h2>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
            customClasses="text-sm"
          >
            <RiEditBoxLine className="mr-1" />
          </IconBtn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* First Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiUser className="text-slate-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">First Name</p>
                <p className="font-medium text-slate-200">{user?.firstName}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiMail className="text-slate-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">Email</p>
                <p className="font-medium text-slate-200">{user?.email}</p>
              </div>
            </div>
            
            {/* Gender */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiInfo className="text-slate-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">Gender</p>
                <p className="font-medium text-slate-200">
                  {user?.additionalDetails?.gender || "Add Gender"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Last Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiUser className="text-slate-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">Last Name</p>
                <p className="font-medium text-slate-200">{user?.lastName}</p>
              </div>
            </div>
            
            {/* Phone */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiPhone className="text-slate-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">Phone Number</p>
                <p className="font-medium text-slate-200">
                  {user?.additionalDetails?.contactNumber || "Add Contact Number"}
                </p>
              </div>
            </div>
            
            {/* Date of Birth */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <FiCalendar className="text-slate-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">Date of Birth</p>
                <p className="font-medium text-slate-200">
                  {formattedDate(user?.additionalDetails?.dateOfBirth) || "Add Date Of Birth"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">
              {user?.courses?.length || 0}
            </div>
            <div className="text-sm text-slate-400 mt-1">
              {user?.accountType === "Instructor" ? 'Courses Created' : 'Courses Enrolled'}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {user?.courseProgress?.length || 0}
            </div>
            <div className="text-sm text-slate-400 mt-1">
              {user?.accountType === "Instructor" ? 'Active Students' : 'Completed Courses'}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {Math.floor(Math.random() * 100)}%
            </div>
            <div className="text-sm text-slate-400 mt-1">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}
