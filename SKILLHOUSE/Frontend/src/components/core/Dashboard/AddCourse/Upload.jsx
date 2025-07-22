import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud, FiX } from "react-icons/fi"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
  disabled = false,
  required = true,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  // Debug logging
  console.log("Upload component rendered:", {
    name,
    label,
    disabled,
    required,
    video,
    hasEditData: !!editData,
    hasViewData: !!viewData
  })

  const onDrop = (acceptedFiles) => {
    console.log("onDrop called with files:", acceptedFiles)
    
    const file = acceptedFiles[0]
    if (file) {
      console.log("Processing file:", {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      })

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        console.error("File too large:", file.size)
        return
      }

      previewFile(file)
      setSelectedFile(file)

      // Log successful file selection
      console.log("File selected successfully:", file.name, file.type, file.size)
    } else {
      console.log("No file received in onDrop")
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png", ".webp"] }
      : { "video/*": [".mp4"] },
    onDrop,
    disabled,
    multiple: false,
    onDropRejected: (rejectedFiles) => {
      console.log("Files rejected:", rejectedFiles)
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0]
        console.log("Rejection reason:", rejection.errors)
        if (rejection.errors.some(e => e.code === 'file-invalid-type')) {
          console.error("Invalid file type. Please upload JPEG, PNG, or WebP images only.")
        }
      }
    },
    onDragEnter: () => {
      console.log("Drag enter detected")
    },
    onDragLeave: () => {
      console.log("Drag leave detected")
    },
    onDragOver: () => {
      console.log("Drag over detected")
    }
  })

  // Debug dropzone state
  console.log("Dropzone state:", {
    isDragActive,
    disabled,
    selectedFile: !!selectedFile,
    previewSource: !!previewSource
  })

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
      console.log("Preview generated successfully")
    }
    reader.onerror = () => {
      console.error("Error reading file")
    }
  }

  // Manual file input handler
  const handleManualFileInput = (event) => {
    console.log("Manual file input triggered")
    const file = event.target.files?.[0]
    if (file) {
      console.log("Manual file selected:", file.name, file.type, file.size)
      onDrop([file])
    }
  }

  useEffect(() => {
    register(name, { required: required ? `${label} is required` : false })
  }, [register, name, label, required])

  useEffect(() => {
    if (selectedFile) {
      setValue(name, selectedFile)
      console.log("Setting value for", name, "to file:", selectedFile.name)
    } else if (editData && !selectedFile) {
      // If we have editData but no selected file, use the edit data
      setValue(name, editData)
      console.log("Setting value for", name, "to editData URL")
    }
  }, [selectedFile, setValue, name, editData])

  // Handle the initial value for edit mode
  useEffect(() => {
    if (editData && !selectedFile) {
      setPreviewSource(editData)
      console.log("Setting preview from editData:", editData?.substring(0, 30))
    }
  }, [editData, selectedFile])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-slate-200" htmlFor={name}>
        {label} {required && !viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        className={`${
          isDragActive ? "bg-slate-700/80" : "bg-slate-700/50"
        } flex min-h-[200px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted ${
          errors[name] ? "border-pink-400" : "border-slate-500"
        } transition-colors ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
        {...(!previewSource && !disabled ? getRootProps() : {})}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <video
                controls
                className="h-full w-full rounded-md object-cover"
                src={previewSource}
              >
                Your browser does not support the video tag.
              </video>
            )}
            {!viewData && !disabled && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                  console.log("Cleared file for", name)
                }}
                className="mt-3 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-300 transition-colors"
              >
                <FiX /> Remove {video ? "Video" : "Image"}
              </button>
            )}
          </div>
        ) : (
          <div className={`flex w-full flex-col items-center p-6`}>
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-slate-800 text-yellow-400">
              <FiUploadCloud className="text-2xl" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-slate-300">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-400">Browse</span> a
              file
            </p>
            <ul className="mt-6 flex list-disc justify-between space-x-12 text-center text-xs text-slate-400">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
            
            {/* Fallback manual file input */}
            <div className="mt-4">
              <input
                type="file"
                accept={!video ? "image/jpeg,image/jpg,image/png,image/webp" : "video/mp4"}
                onChange={handleManualFileInput}
                style={{ display: 'none' }}
                id={`manual-${name}`}
              />
              <button
                type="button"
                onClick={() => {
                  console.log("Manual browse button clicked");
                  document.getElementById(`manual-${name}`)?.click();
                }}
                className="px-4 py-2 bg-yellow-500 text-slate-900 rounded-md hover:bg-yellow-400 transition-colors"
              >
                Choose File
              </button>
            </div>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200 flex items-center gap-1">
          <FiX className="text-pink-200" />{" "}
          {typeof errors[name].message === "string"
            ? errors[name].message
            : `${label} is required`}
        </span>
      )}
    </div>
  )
}