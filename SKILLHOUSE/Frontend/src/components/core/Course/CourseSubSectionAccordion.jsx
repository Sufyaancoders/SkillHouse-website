import React, { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"
import { BiTime } from "react-icons/bi" // Icon for duration

function CourseSubSectionAccordion({ subSec, onVideoClick }) {
  // Format video duration if available (assuming duration is in seconds)
  const formatDuration = (durationInSeconds) => {
    if (!durationInSeconds) return "00:00"

    const minutes = Math.floor(durationInSeconds / 60)
    const seconds = Math.floor(durationInSeconds % 60)

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <div
      className="flex flex-col border-b border-slate-700 py-2 last:border-b-0"
      role="listitem"
    >
      <button
        className="flex w-full cursor-pointer items-center justify-between rounded-md py-2 px-3 text-left hover:bg-slate-700/50 transition-colors duration-200"
        onClick={() => onVideoClick && onVideoClick(subSec)}
        aria-label={`Play video: ${subSec?.title}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg text-blue-400">
            <HiOutlineVideoCamera aria-hidden="true" />
          </span>
          <p className="text-slate-200">{subSec?.title}</p>
        </div>

        {subSec?.duration && (
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <BiTime aria-hidden="true" />
            <span>{formatDuration(subSec.duration)}</span>
          </div>
        )}
      </button>

      {subSec?.description && (
        <div className="ml-8 mt-1 pr-2 text-xs text-slate-400">
          {subSec.description}
        </div>
      )}
    </div>
  )
}

export default CourseSubSectionAccordion