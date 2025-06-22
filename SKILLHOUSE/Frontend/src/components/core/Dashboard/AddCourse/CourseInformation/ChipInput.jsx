// Importing React hook for managing component state
import { useEffect, useState } from "react"
// Importing React icon component
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

// Defining a functional component ChipInput
export default function ChipInput({
  // Props to be passed to the component
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [chips, setChips] = useState([])

  // Initialize chips from course data if in edit mode
  useEffect(() => {
    if (editCourse && course?.tag && Array.isArray(course.tag)) {
      setChips(course.tag)
    }

    // Register the field with React Hook Form
    register(name, {
      required: true,
      validate: (value) =>
        value && value.length > 0 ? true : `${label} is required`,
    })
  }, [editCourse, course?.tag, name, register, label])

  // Update form value when chips change
  useEffect(() => {
    setValue(name, chips, { shouldValidate: true })
  }, [chips, name, setValue])

  // Handle key press to add new chips
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()

      const chipValue = event.target.value.trim()

      if (chipValue && !chips.includes(chipValue)) {
        setChips([...chips, chipValue])
        event.target.value = ""
      }
    }
  }

  // Remove a chip
  const handleDeleteChip = (chipIndex) => {
    setChips(chips.filter((_, index) => index !== chipIndex))
  }

  // Render the component
  return (
    <div className="flex flex-col space-y-2">
      {/* Render the label for the input */}
      <label className="text-sm text-slate-200" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Render the chips and input */}
      <div className="flex w-full flex-wrap gap-y-2 border border-slate-600 bg-slate-700 p-3 rounded-md focus-within:border-yellow-400">
        {/* Map over the chips array and render each chip */}
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-500 px-3 py-1 text-sm text-slate-900 transition-all"
          >
            {/* Render the chip value */}
            {chip}
            {/* Render the button to delete the chip */}
            <button
              type="button"
              className="ml-2 rounded-full hover:bg-yellow-600 p-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={() => handleDeleteChip(index)}
              aria-label={`Remove ${chip}`}
            >
              <MdClose className="text-xs" />
            </button>
          </div>
        ))}

        {/* Render the input for adding new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={
            chips.length === 0 ? placeholder : "Add more tags..."
          }
          onKeyDown={handleKeyDown}
          className="flex-grow border-none bg-transparent p-1 text-slate-100 focus:outline-none"
          aria-describedby={`${name}-error`}
        />
      </div>

      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span
          id={`${name}-error`}
          className="ml-2 text-xs tracking-wide text-pink-200"
        >
          {errors[name].message || `${label} is required`}
        </span>
      )}

      {chips.length > 0 && (
        <p className="text-xs text-slate-400">
          Press Enter or comma to add more tags
        </p>
      )}
    </div>
  )
}