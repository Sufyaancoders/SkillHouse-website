import React, { useEffect } from "react"
import { useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { FaUserCircle } from "react-icons/fa" // Add this import
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const [imageError, setImageError] = useState(false)

  const fileInputRef = useRef(null)

  // Debug user object to check image property
  useEffect(() => {
    console.log("User object:", user)
    console.log("Image URL:", user?.image)
  }, [user])

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // File validations remain the same...
    if (!file.type.match(/image\/(png|jpg|jpeg|gif)/)) {
      toast.error("Please select a valid image file (PNG, JPG, JPEG, GIF)")
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB")
      return
    }

    setImageFile(file)
    setImageError(false) // Reset error state when new file is selected

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
    reader.onerror = () => {
      toast.error("Error reading file")
      setImageFile(null)
    }
  }

  const handleImageError = () => {
    console.error("Failed to load image:", user?.image)
    setImageError(true)
  }

  const handleFileUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image first")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("displayPicture", imageFile)

      await dispatch(updateDisplayPicture(token, formData))
      toast.success("Profile picture updated successfully")

      // Reset state after successful upload
      setImageFile(null)
    } catch (error) {
      console.error("Error uploading profile picture:", error)
      toast.error("Failed to update profile picture")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-slate-700 bg-slate-800 p-8 px-12 text-slate-100">
      <div className="flex items-center gap-x-4">
        <div className="relative aspect-square w-[78px] rounded-full overflow-hidden bg-slate-700">
          {/* Show fallback if image errors or is missing */}
          {imageError || (!previewSource && !user?.image) ? (
            <div className="h-full w-full flex items-center justify-center bg-slate-700">
              <FaUserCircle className="text-5xl text-slate-400" />
            </div>
          ) : (
            <img
              src={previewSource || user?.image || ""}
              alt={`Profile of ${user?.firstName || "user"}`}
              className="h-full w-full object-cover"
              onError={handleImageError}
            />
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70">
              <div className="spinner-sm"></div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium">Change Profile Picture</p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/jpg, image/gif"
              aria-label="Select profile picture"
              disabled={loading}
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-slate-700 py-2 px-5 font-medium text-slate-100 hover:bg-slate-600 transition-colors duration-200 disabled:opacity-70"
              aria-label="Select new profile image"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
              disabled={loading || !imageFile}
              customClasses={!imageFile && !loading ? "opacity-70 cursor-not-allowed" : ""}
            >
              {!loading && <FiUpload className="text-lg text-slate-900" />}
            </IconBtn>
          </div>
          {imageFile && (
            <p className="text-xs text-slate-400">
              {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>
      </div>
    </div>
  )
}