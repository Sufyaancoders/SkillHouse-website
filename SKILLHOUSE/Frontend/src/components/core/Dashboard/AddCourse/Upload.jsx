import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud, FiX } from "react-icons/fi"
import { useSelector } from "react-redux"

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
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)

      // Log successful file selection
      console.log("File selected:", file.name, file.type, file.size)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    disabled,
  })

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
    reader.onerror = () => {
      console.error("Error reading file")
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
          <div
            className={`flex w-full flex-col items-center p-6 ${disabled ? "pointer-events-none" : ""}`}
            {...getRootProps()}
          >
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