import React from "react"
import { motion } from "framer-motion" // For animations
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiX } from "react-icons/fi" // For icons
import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  // Determine icon based on modalType (success, warning, danger, info)
  const getIcon = () => {
    if (modalData?.icon) return modalData.icon
    
    switch (modalData?.type) {
      case "success":
        return <FiCheckCircle className="text-green-400 text-4xl" />
      case "danger":
        return <FiAlertTriangle className="text-red-400 text-4xl" />
      case "warning":
        return <FiAlertTriangle className="text-yellow-400 text-4xl" />
      case "info":
      default:
        return <FiAlertCircle className="text-blue-400 text-4xl" />
    }
  }

  // Determine button color based on modalType
  const getBtnColor = () => {
    if (modalData?.btnColor) return modalData.btnColor
    
    switch (modalData?.type) {
      case "success":
        return "bg-green-500 hover:bg-green-600 text-white"
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white"
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600 text-white"
      case "info":
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white"
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] !mt-0 flex items-center justify-center overflow-auto bg-slate-900/40 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-11/12 max-w-md rounded-xl border border-slate-700 bg-slate-800 shadow-lg overflow-hidden"
      >
        {/* Close button */}
        {modalData?.showCloseBtn !== false && (
          <button 
            onClick={modalData?.btn2Handler || (() => {})}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        )}
        
        <div className="p-6">
          {/* Modal Header with Icon */}
          <div className="flex items-start gap-4">
            {getIcon()}
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-100 leading-tight">
                {modalData?.text1}
              </h3>
              
              {modalData?.text2 && (
                <p className="mt-2 text-slate-300 leading-normal">
                  {modalData.text2}
                </p>
              )}
            </div>
          </div>
          
          {/* Optional bullet points */}
          {modalData?.bulletPoints && modalData.bulletPoints.length > 0 && (
            <ul className="mt-4 space-y-2 ml-10 list-disc text-slate-300">
              {modalData.bulletPoints.map((point, index) => (
                <li key={index} className="text-sm">
                  {point}
                </li>
              ))}
            </ul>
          )}
          
          {/* Optional custom content */}
          {modalData?.customContent && (
            <div className="mt-5">
              {modalData.customContent}
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-700">
            {/* Cancel button (secondary) */}
            {modalData?.btn2Text && (
              <button
                className={`px-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors font-medium text-sm ${modalData?.btn2Classes || ""}`}
                onClick={modalData?.btn2Handler || (() => {})}
                disabled={modalData?.isLoading}
              >
                {modalData?.btn2Text}
              </button>
            )}
            
            {/* Confirm button (primary) */}
            {modalData?.btn1Text && (
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${getBtnColor()} ${modalData?.btn1Classes || ""}`}
                onClick={modalData?.btn1Handler || (() => {})}
                disabled={modalData?.isLoading}
              >
                {modalData?.isLoading ? "Please wait..." : modalData?.btn1Text}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}