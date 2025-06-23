import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"

import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)

  // Accordion state
  const [active, setActive] = useState(false)
  useEffect(() => {
    // Safe check if isActive exists and is an array
    setActive(Array.isArray(isActive) && isActive.includes(course?._id))
  }, [isActive, course])
  
  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    // Set height only if the contentEl exists
    if (contentEl.current) {
      setSectionHeight(active ? contentEl.current.scrollHeight : 0)
    }
  }, [active])

  // Check if the section is active
  const isActiveSection = Array.isArray(isActive) && isActive.includes(course?._id)

  return (
    <div 
      className="overflow-hidden border border-solid border-slate-600 bg-slate-700 text-slate-100 last:mb-0 rounded-md"
      role="region" 
      aria-labelledby={`section-header-${course?._id}`}
    >
      <div>
        <div
          id={`section-header-${course?._id}`}
          className={`flex cursor-pointer items-start justify-between px-7 py-6 transition-colors duration-300 ${
            isActiveSection ? "bg-slate-600" : ""
          } hover:bg-slate-600/50`}
          onClick={() => {
            handleActive(course?._id)
          }}
          aria-expanded={isActiveSection}
          aria-controls={`section-content-${course?._id}`}
        >
          <div className="flex items-center gap-2">
            <AiOutlineDown 
              className="transition-transform duration-300"
              style={{ transform: isActiveSection ? 'rotate(180deg)' : 'rotate(0deg)' }}
              aria-hidden="true"
            />
            <p className="font-medium">{course?.sectionName}</p>
          </div>
          <div className="space-x-4">
            <span className="text-yellow-400">
              {`${course?.subSection?.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>
      <div
        id={`section-content-${course?._id}`}
        ref={contentEl}
        className={`relative overflow-hidden bg-slate-800 transition-all duration-300 ease-in-out`}
        style={{
          height: sectionHeight,
        }}
      >
        <div className="flex flex-col gap-2 px-7 py-6 font-semibold">
          {course?.subSection?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}