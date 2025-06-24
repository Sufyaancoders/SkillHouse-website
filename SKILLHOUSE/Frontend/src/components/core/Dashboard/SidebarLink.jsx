import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"
import { motion } from "framer-motion" // Import for animations

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName, isCollapsed = false }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const isActive = matchRoute(link.path)

  // Tooltip animation variants
  const tooltipVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1 }
  }

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`group relative flex items-center ${
        isCollapsed ? "justify-center px-3" : "px-4"
      } py-3 mb-1 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-yellow-700/90 text-yellow-50"
          : "text-slate-300 hover:bg-slate-700/40 hover:text-yellow-100"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.span
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "70%" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-yellow-400"
        ></motion.span>
      )}
      
      {/* Icon */}
      <div className={`flex-shrink-0 ${isCollapsed ? "" : "mr-3"}`}>
        {Icon ? (
          <Icon className={`${isActive ? "text-yellow-100" : "text-slate-400"} text-xl transition-colors`} />
        ) : (
          <div className="w-5 h-5 rounded-full bg-yellow-700"></div>
        )}
      </div>
      
      {/* Link text (only when not collapsed) */}
      {!isCollapsed && (
        <span className="text-sm font-medium whitespace-nowrap">{link.name}</span>
      )}
      
      {/* Tooltip for collapsed mode */}
      {isCollapsed && (
        <motion.div
          initial="hidden"
          animate="hidden"
          variants={tooltipVariants}
          whileHover="visible"
          className="absolute left-full ml-2 z-50 p-2 min-w-[120px] bg-slate-800 text-yellow-50 rounded-md shadow-lg text-sm whitespace-nowrap"
        >
          {link.name}
        </motion.div>
      )}
    </NavLink>
  )
}
