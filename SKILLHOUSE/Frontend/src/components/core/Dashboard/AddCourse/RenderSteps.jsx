import React from "react"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      {/* Progress Tracker */}
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item, index) => (
          <div key={item.id} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <button
                className={`grid aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-400 bg-yellow-500 text-slate-900"
                    : "border-slate-700 bg-slate-800 text-slate-300"
                } ${step > item.id ? "bg-yellow-400 text-slate-900" : ""}`}
                aria-label={`Step ${item.id}: ${item.title} ${
                  step === item.id ? "(current)" : step > item.id ? "(completed)" : ""
                }`}
                disabled
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-slate-900" />
                ) : (
                  item.id
                )}
              </button>
            </div>

            {/* Connector Line (except after last step) */}
            {index < steps.length - 1 && (
              <div
                className={`h-[1px] w-[100px] md:w-[150px] border-dashed border-b-2 ${
                  step > item.id ? "border-yellow-400" : "border-slate-600"
                }`}
                aria-hidden="true"
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="relative mb-16 flex w-full select-none justify-center gap-[80px] md:gap-[150px]">
        {steps.map((item) => (
          <div
            key={item.id}
            className={`text-center text-sm ${
              step >= item.id ? "text-slate-100" : "text-slate-500"
            }`}
          >
            {item.title}
          </div>
        ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}