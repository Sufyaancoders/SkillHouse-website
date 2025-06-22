import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { FaPlus } from "react-icons/fa"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
  disabled = false,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  // Initialize requirements from course data if in edit mode
  useEffect(() => {
    if (editCourse && course?.instructions && Array.isArray(course.instructions)) {
      setRequirementsList(course.instructions)
    }
    
    // Register the field with React Hook Form
    register(name, { 
      required: true, 
      validate: (value) => value && value.length > 0 ? true : `${label} is required` 
    })
  }, [editCourse, course?.instructions, name, register, label])

  // Update form value when requirements list changes
  useEffect(() => {
    setValue(name, requirementsList, { shouldValidate: true })
  }, [requirementsList, name, setValue])

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirementsList([...requirementsList, requirement.trim()])
      setRequirement("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddRequirement()
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-slate-200" htmlFor={`${name}-input`}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex items-start gap-3">
        <div className="flex-grow">
          <input
            type="text"
            id={`${name}-input`}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a requirement and press Enter or Add"
            className="w-full bg-slate-700 text-slate-100 border border-slate-600 rounded-md p-3 focus:border-yellow-400 focus:outline-none"
            disabled={disabled}
          />
          <p className="mt-1 text-xs text-slate-400">
            Press Enter to add a requirement
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddRequirement}
          className="mt-1 flex items-center gap-1 rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-yellow-600 transition-colors disabled:opacity-70"
          disabled={!requirement.trim() || disabled}
          aria-label="Add requirement"
        >
          <FaPlus className="text-xs" /> Add
        </button>
      </div>
      
      {requirementsList.length > 0 ? (
        <ul className="mt-4 space-y-2 max-h-36 overflow-y-auto">
          {requirementsList.map((req, index) => (
            <li 
              key={index} 
              className="flex items-center justify-between rounded-md bg-slate-700 px-4 py-2 text-slate-200"
            >
              <span className="flex-grow break-words">{req}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="ml-2 rounded-full p-1 text-slate-400 hover:bg-slate-600 hover:text-red-400 transition-colors"
                aria-label={`Remove requirement: ${req}`}
                disabled={disabled}
              >
                <MdClose />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 italic text-slate-400 text-sm">
          No requirements added yet
        </p>
      )}
      
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Please add at least one requirement
        </span>
      )}
    </div>
  )
}