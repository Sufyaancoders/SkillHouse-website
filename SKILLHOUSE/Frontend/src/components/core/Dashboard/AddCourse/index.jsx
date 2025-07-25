import React from "react"
import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <>
      <div className="flex w-full items-start gap-x-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-richblack-900 p-8 rounded-xl shadow-lg">
        <div className="flex flex-1 flex-col bg-richblack-800 rounded-lg p-8 shadow-md">
          <h1 className="mb-10 text-4xl font-bold text-indigo-400 drop-shadow-lg tracking-wide">
            Add Course
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-lg border-2 border-indigo-500 bg-gradient-to-br from-indigo-800 via-purple-800 to-richblack-800 p-8 xl:block shadow-xl">
          <p className="mb-6 text-xl font-semibold text-indigo-300 flex items-center gap-2">
            <span className="text-yellow-400 text-2xl">⚡</span> Course Upload Tips
          </p>
          <ul className="ml-5 list-disc space-y-4 text-sm text-richblack-100">
            <li><span className="text-indigo-300">Set the Course Price</span> option or make it <span className="text-green-400">free</span>.</li>
            <li>Standard size for the <span className="text-indigo-300">course thumbnail</span> is <span className="text-yellow-300">1024x576</span>.</li>
            <li><span className="text-purple-300">Video section</span> controls the course overview video.</li>
            <li><span className="text-indigo-300">Course Builder</span> is where you create & organize a course.</li>
            <li>
              Add <span className="text-purple-300">Topics</span> in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the <span className="text-indigo-300">Additional Data</span> section shows up on the
              course single page.
            </li>
            <li>Make <span className="text-yellow-400">Announcements</span> to notify any important</li>
            <li><span className="text-green-400">Notes</span> to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  )
}