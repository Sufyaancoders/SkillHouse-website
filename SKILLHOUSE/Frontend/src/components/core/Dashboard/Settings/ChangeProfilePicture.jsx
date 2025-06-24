import React, { useEffect, useRef, useState } from "react"
import { FiUpload, FiTrash2, FiCamera } from "react-icons/fi"
import { FaUserCircle } from "react-icons/fa"
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

  // Define image validation rules
  const IMAGE_VALIDATION = {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  }
  
  // Create an object to reuse error messages
  const ERROR_MESSAGES = {
    invalidType: "Please select a valid image file (PNG, JPG, JPEG, GIF)",
    tooLarge: "Image size should be less than 2MB",
    readError: "Error reading file",
    selectFirst: "Please select an image first",
  }

  // Debug user object
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("User object:", user)
      console.log("Image URL:", user?.image)
    }
  }, [user])

  const handleClick = () => {
    fileInputRef.current.click()
  }
  
  const resetImage = () => {
    setImageFile(null)
    setPreviewSource(null)
  }

  const validateFile = (file) => {
    if (!file) return false
    
    if (!IMAGE_VALIDATION.allowedTypes.includes(file.type)) {
      toast.error(ERROR_MESSAGES.invalidType)
      return false
    }

    if (file.size > IMAGE_VALIDATION.maxSize) {
      toast.error(ERROR_MESSAGES.tooLarge)
      return false
    }
    
    return true
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!validateFile(file)) return

    setImageFile(file)
    setImageError(false)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
    reader.onerror = () => {
      toast.error(ERROR_MESSAGES.readError)
      setImageFile(null)
    }
  }

  const handleImageError = () => {
    console.error("Failed to load image:", user?.image)
    setImageError(true)
  }

  const handleFileUpload = async () => {
    if (!imageFile) {
      toast.error(ERROR_MESSAGES.selectFirst)
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("displayPicture", imageFile)

      await dispatch(updateDisplayPicture(token, formData))
      toast.success("Profile picture updated successfully")
      resetImage()
    } catch (error) {
      console.error("Error uploading profile picture:", error)
      toast.error("Failed to update profile picture")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-800/80 backdrop-blur-sm p-6 shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Left side - Image preview */}
        <div className="relative group">
          <div className="relative aspect-square w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-slate-700">
            {/* Show fallback if image errors or is missing */}
            {imageError || (!previewSource && !user?.image) ? (
              <div className="h-full w-full flex items-center justify-center bg-slate-700">
                <FaUserCircle className="text-6xl text-slate-400" />
              </div>
            ) : (
              <img
                src={previewSource || user?.image || ""}
                alt={`Profile of ${user?.firstName || "user"}`}
                className="h-full w-full object-cover"
                onError={handleImageError}
              />
            )}
            
            {/* Hover overlay */}
            <div 
              className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              onClick={handleClick}
            >
              <FiCamera className="text-2xl text-slate-100" />
            </div>
            
            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                <div className="h-8 w-8 rounded-full border-2 border-slate-300 border-t-transparent animate-spin"></div>
              </div>
            )}
          </div>
          
          <p className="mt-3 text-slate-400 text-sm text-center">
            Click to change
          </p>
        </div>

        {/* Right side - Controls */}
        <div className="flex flex-col flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-medium text-slate-100 mb-1">
              Profile Picture
            </h3>
            <p className="text-slate-400 text-sm">
              Upload a new profile picture. Square images work best. Maximum file size: 2MB.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept={IMAGE_VALIDATION.allowedTypes.join(", ")}
              aria-label="Select profile picture"
              disabled={loading}
            />
            
            <button
              onClick={handleClick}
              disabled={loading}
              className="flex items-center gap-2 rounded-md bg-slate-700 py-2 px-4 font-medium text-slate-100 hover:bg-slate-600 transition-colors duration-200 disabled:opacity-70"
              aria-label="Select new profile image"
            >
              <FiCamera className="text-lg" /> 
              Select Image
            </button>
            
            {imageFile ? (
              <>
                <IconBtn
                  text={loading ? "Uploading..." : "Save Changes"}
                  onclick={handleFileUpload}
                  disabled={loading}
                >
                  {!loading && <FiUpload className="text-lg" />}
                </IconBtn>
                
                <button
                  onClick={resetImage}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-md border border-slate-600 py-2 px-4 font-medium text-slate-300 hover:bg-slate-700 hover:border-slate-500 transition-all disabled:opacity-70"
                >
                  <FiTrash2 className="text-lg" />
                  Cancel
                </button>
              </>
            ) : null}
          </div>
          
          {imageFile && (
            <div className="mt-2 p-3 rounded-md bg-slate-700/50 border border-slate-600">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center mr-3">
                  <FiUpload className="text-slate-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-200 font-medium truncate max-w-[240px]">
                    {imageFile.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {(imageFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}