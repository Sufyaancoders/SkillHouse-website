import React, { useState, useEffect } from "react"
import { VscSignOut, VscSettingsGear } from "react-icons/vsc"
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiMenuAlt2 } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import '../../../../src/App.css' // Import your CSS for custom styles
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  
  // State for responsive sidebar
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  
  // Check screen size and set mobile view state
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
      // Auto-collapse on small screens that aren't mobile
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsCollapsed(true)
      } else if (window.innerWidth >= 1024) {
        setIsCollapsed(false)
      }
    }
    
    // Initial check
    handleResize()
    
    // Add resize listener
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  
  // Handle sidebar toggle for desktop
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  
  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  // Close mobile menu on location change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [location.pathname])
  
  // Loading state
  if (profileLoading || authLoading) {
    return (
      <div className={`transition-all duration-300 ease-in-out h-[calc(100vh-3.5rem)] ${
        isCollapsed ? "w-20" : "w-64"
      } flex items-center justify-center border-r border-slate-700 bg-slate-800 hidden md:flex`}>
        <div className="spinner"></div>
      </div>
    )
  }
  
  // Handle logout confirmation
  const handleLogoutClick = () => {
    setConfirmationModal({
      type: "warning",
      text1: "Logout from SkillHub?",
      text2: "You will be logged out of your account.",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(logout(navigate)),
      btn2Handler: () => setConfirmationModal(null),
      icon: <VscSignOut className="text-3xl text-yellow-400" />
    })
  }

  // Mobile menu button (outside sidebar)
  const MobileMenuButton = () => (
    <button 
      onClick={toggleMobileMenu}
      className="md:hidden fixed top-4 left-4 z-50 bg-yellow-500 rounded-md p-2 shadow-lg"
      aria-label="Toggle mobile menu"
    >
      <HiMenuAlt2 className="text-slate-800" size={24} />
    </button>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <MobileMenuButton />
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileView && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar for both mobile and desktop */}
      <AnimatePresence>
        {/* Show sidebar if: desktop OR (mobile AND menu open) */}
        {(!isMobileView || (isMobileView && isMobileMenuOpen)) && (
          <motion.div 
            initial={{ 
              x: isMobileView ? -280 : 0,
              width: isCollapsed ? 80 : 250
            }}
            animate={{ 
              x: 0,
              width: isCollapsed && !isMobileView ? 80 : isMobileView ? 280 : 250
            }}
            exit={{ 
              x: isMobileView ? -280 : 0 
            }}
            transition={{ duration: 0.3 }}
            className={`
              fixed left-0 top-0 z-50 md:relative
              h-screen md:h-[calc(100vh-3.5rem)] 
              border-r border-slate-700 bg-slate-800 
              py-6 flex flex-col justify-between
              ${isMobileView ? "w-[280px]" : ""}
              ${isMobileView ? "pt-16" : ""}
            `}
          >
            {/* Desktop Collapse Button (hidden on mobile) */}
            {!isMobileView && (
              <button 
                onClick={toggleSidebar}
                className="absolute -right-3 top-6 bg-yellow-500 rounded-full p-1 shadow-lg z-10 hover:bg-yellow-400 transition-colors"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? 
                  <HiOutlineChevronRight className="text-slate-800" size={16} /> : 
                  <HiOutlineChevronLeft className="text-slate-800" size={16} />
                }
              </button>
            )}
            
            {/* User Profile - Only shown when expanded or on mobile */}
            {(!isCollapsed || isMobileView) && (
              <div className="px-4 mb-6">
                <div className="flex items-center gap-3 py-3 px-4 rounded-lg bg-slate-700/50">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-600 flex-shrink-0">
                    {user?.image ? (
                      <img 
                        src={user.image} 
                        alt={user?.firstName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-yellow-500 text-slate-800 text-lg font-bold">
                        {user?.firstName?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <div className="overflow-hidden">
                    <h3 className="font-medium text-slate-100 text-sm truncate">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Links */}
            <div className="flex-grow overflow-y-auto custom-scrollbar px-3">
              <div className="flex flex-col gap-1">
                {sidebarLinks.map((link) => {
                  // Skip rendering if link is meant for a specific account type and user doesn't match
                  if (link.type && user?.accountType !== link.type) return null
                  
                  // Check if link is active
                  const isActive = location.pathname === link.path
                  
                  return (
                    <SidebarLink 
                      key={link.id} 
                      link={link} 
                      iconName={link.icon}
                      isActive={isActive}
                      isCollapsed={isCollapsed && !isMobileView}
                    />
                  )
                })}
              </div>
            </div>
            
            {/* Bottom Section */}
            <div className="mt-auto border-t border-slate-700 pt-4 px-3">
              <div className="flex flex-col gap-1">
                {/* Settings Link */}
                <SidebarLink
                  link={{ name: "Settings", path: "/dashboard/settings" }}
                  iconName="VscSettingsGear"
                  isActive={location.pathname === "/dashboard/settings"}
                  isCollapsed={isCollapsed && !isMobileView}
                />
                
                {/* Logout Button */}
                <button
                  onClick={handleLogoutClick}
                  className={`group flex items-center gap-x-2 rounded-lg py-3 ${
                    (isCollapsed && !isMobileView) ? "justify-center px-1" : "px-4"
                  } transition-colors duration-200 text-slate-400 hover:bg-slate-700 hover:text-yellow-400`}
                  aria-label="Logout"
                >
                  <VscSignOut className="text-xl flex-shrink-0" />
                  {(!isCollapsed || isMobileView) && <span className="text-sm">Logout</span>}
                  
                  {/* Tooltip for collapsed state on desktop */}
                  {(isCollapsed && !isMobileView) && (
                    <div className="absolute left-full ml-3 scale-0 group-hover:scale-100 origin-left transition-all duration-150 bg-slate-800 text-slate-200 text-sm py-1 px-2 rounded shadow-lg whitespace-nowrap">
                      Logout
                    </div>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
