import React from "react"
import { useState } from "react"
import { FiTrash2, FiAlertTriangle, FiX } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import ConfirmationModal from "../../../common/ConfirmationModal"
import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [error, setError] = useState(null)

  async function handleDeleteAccount() {
    setLoading(true)
    setError(null)
    
    try {
      // Check if token exists
      if (!token) {
        throw new Error("Authentication token is missing. Please log in again.")
      }
      
      // Use await to properly catch errors from the dispatch
       await dispatch(deleteProfile(token, navigate))
      
      // This will only run if the above doesn't redirect or throw an error
      toast.success("Account deleted successfully")
    } catch (error) {
      console.error("Error deleting account:", error)
      
      // Set detailed error message
      setError(error?.response?.data?.message || error?.message || "Failed to delete account")
      
      // Show error toast with more details
      toast.error(`Delete account failed: ${error?.response?.data?.message || error?.message || "Unknown error"}`)
      
      // Update modal with error
      setConfirmationModal({
        type: "danger",
        text1: "Account Deletion Failed",
        text2: error?.response?.data?.message || error?.message || "Failed to delete your account. Please try again later.",
        btn1Text: "Try Again",
        btn2Text: "Cancel",
        btn1Handler: handleDeleteAccount,
        btn2Handler: () => setConfirmationModal(null),
        btnColor: "bg-red-500 hover:bg-red-600",
      })
    } finally {
      setLoading(false)
    }
  }

  const showConfirmation = () => {
    setConfirmationModal({
      type: "danger",
      text1: "Delete Account Permanently?",
      text2: "This action is irreversible. All your data will be permanently deleted, including:",
      bulletPoints: [
        "Your profile information and settings",
        "All purchased courses and learning progress",
        "Payment history and certificates",
        "Created content and comments"
      ],
      btn1Text: loading ? "Deleting..." : "Yes, Delete My Account",
      btn2Text: "Cancel",
      btn1Handler: handleDeleteAccount,
      btn2Handler: () => setConfirmationModal(null),
      btnColor: "bg-red-500 hover:bg-red-600",
      icon: <FiAlertTriangle className="text-4xl text-red-500" />,
      isLoading: loading
    })
  }

  return (
    <>
      <div className="my-10 flex flex-col sm:flex-row gap-5 rounded-xl border border-red-700 bg-red-900/20 p-6 sm:p-8">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-red-600 flex-shrink-0">
          <FiTrash2 className="text-3xl text-white" />
        </div>
        <div className="flex flex-col space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">
            Delete Account
          </h2>
          <div className="text-slate-300 space-y-2">
            <p>Would you like to delete your account?</p>
            <p>
              This account may contain paid courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
            
            {error && (
              <div className="mt-3 p-3 bg-red-900/30 border border-red-700 rounded-lg flex items-start gap-2">
                <FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer text-red-400 hover:text-red-300 transition-colors duration-200 font-medium flex items-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={showConfirmation}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-red-400 border-t-transparent animate-spin"></div>
                Deleting account...
              </>
            ) : (
              <>
                <FiTrash2 className="text-lg" />
                I want to delete my account
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}