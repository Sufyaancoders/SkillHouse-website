import React from "react"
import { useState } from "react"
import { FiTrash2 } from "react-icons/fi"
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

  async function handleDeleteAccount() {
    setLoading(true)
    try {
      dispatch(deleteProfile(token, navigate))
      // Note: The success toast may not show if the redirect happens immediately
      toast.success("Account deleted successfully")
    } catch (error) {
      console.error("Error deleting account:", error)
      toast.error("Failed to delete account. Please try again.")
      setLoading(false)
    }
  }

  const showConfirmation = () => {
    setConfirmationModal({
      text1: "Are you sure you want to delete your account?",
      text2: "This action is irreversible and will permanently remove all your data, including purchased courses and progress.",
      btn1Text: "Delete Account",
      btn2Text: "Cancel",
      btn1Handler: handleDeleteAccount,
      btn2Handler: () => setConfirmationModal(null),
      btnColor: "bg-red-500 hover:bg-red-600",
    })
  }

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-red-700 bg-red-900/20 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-red-600">
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
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer text-red-400 hover:text-red-300 transition-colors duration-200 font-medium flex items-center gap-2 mt-2"
            onClick={showConfirmation}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner-sm"></div>
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