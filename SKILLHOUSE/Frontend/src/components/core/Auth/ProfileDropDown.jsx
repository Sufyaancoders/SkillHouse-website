import React, { useRef, useState, useEffect } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { logout } from "../../../services/operations/authAPI"
import useOnClickOutside from "../../../hooks/useOnClickOutside"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  // Close dropdown when changing routes
  useEffect(() => {
    return () => {
      setOpen(false)
    }
  }, [navigate])

  if (!user) {
    console.log("User data not found in Redux store");
    return null
  }
  return (
    <button className="relative" onClick={() => setOpen(true)} ref={ref}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.Image||`https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
           onError={(e) => { // Add error handler
    e.target.onerror = null;
    e.target.src = "/default-avatar.png";
  }}
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      
      {open && (
        <div className="absolute top-[118%] right-0 z-[1000] divide-y divide-gray-700 overflow-hidden rounded-md border border-gray-700 bg-gray-800 shadow-lg">
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-2 py-2.5 px-4 text-sm text-gray-200 hover:bg-gray-700 transition-colors duration-200">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full cursor-pointer items-center gap-x-2 py-2.5 px-4 text-sm text-gray-200 hover:bg-gray-700 transition-colors duration-200"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}