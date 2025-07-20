import React from 'react'; 
import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from '../../assets/Logo/skillHouse.png'
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`sticky top-0 z-50 flex h-16 items-center justify-center border-b-[1px] border-b-gray-800 ${
        location.pathname !== "/" ? "bg-gray-900" : "bg-gradient-to-r from-gray-900 to-blue-900"
      } transition-all duration-300 shadow-lg`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo and Website Name */}
        <Link to="/" className="flex items-center gap-1.5">
          <img 
            src={logo} 
            alt="SkillHouse Logo" 
            className="h-11 w-auto" 
            loading="lazy" 
          />
          <h1 className="text-lg md:text-xl font-bold text-white">
            SkillHouse
          </h1>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-gray-300">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-blue-400"
                          : "text-gray-200"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-gray-800 p-4 text-gray-200 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-gray-800"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-gray-700"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-blue-400"
                          : "text-gray-200"
                      } hover:text-blue-300 transition-colors duration-200`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-gray-200 hover:text-blue-400 transition-colors duration-200" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-blue-600 text-center text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-md border-none bg-transparent px-4 py-2 text-gray-200 hover:text-blue-300 transition-all duration-200 font-medium">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-200 hover:text-blue-400 transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <AiOutlineClose fontSize={24} />
          ) : (
            <AiOutlineMenu fontSize={24} />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50 shadow-lg">
          <div className="flex flex-col px-5 py-4">
            <ul className="flex flex-col gap-y-3 mb-4">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="py-1">
                      <div 
                        className={`flex items-center justify-between ${
                          matchRoute("/catalog/:catalogName") ? "text-blue-400" : "text-gray-200"
                        } cursor-pointer`}
                        onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
                      >
                        <p>{link.title}</p>
                        {mobileCatalogOpen ? <BsChevronUp /> : <BsChevronDown />}
                      </div>
                      
                      {/* Mobile catalog dropdown */}
                      {mobileCatalogOpen && (
                        <div className="mt-2 ml-4 border-l-2 border-gray-700 pl-4">
                          {loading ? (
                            <p className="text-gray-400 py-2">Loading...</p>
                          ) : (subLinks && subLinks.length) ? (
                            <>
                              {subLinks
                                ?.filter(
                                  (subLink) => subLink?.courses?.length > 0
                                )
                                ?.map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="block py-2 text-gray-300 hover:text-blue-400"
                                    key={i}
                                    onClick={() => {
                                      setMobileCatalogOpen(false);
                                      setMobileMenuOpen(false);
                                    }}
                                  >
                                    <p>{subLink.name}</p>
                                  </Link>
                                ))}
                            </>
                          ) : (
                            <p className="text-gray-400 py-2">No Courses Found</p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-1">
                      <Link 
                        to={link?.path}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <p
                          className={`${
                            matchRoute(link?.path) ? "text-blue-400" : "text-gray-200"
                          } hover:text-blue-300`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col gap-y-3">
              {token === null ? (
                <>
                  <Link 
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full rounded-md border border-gray-700 bg-transparent px-4 py-2 text-gray-200 hover:bg-gray-800 transition-all duration-200">
                      Log in
                    </button>
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow-md transition-all duration-200">
                      Sign up
                    </button>
                  </Link>
                </>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="text-gray-200">
                    Hello, {user?.firstName || "User"}
                  </div>
                  
                  {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                    <Link 
                      to="/dashboard/cart"
                      onClick={() => setMobileMenuOpen(false)}
                      className="relative"
                    >
                      <AiOutlineShoppingCart className="text-2xl text-gray-200 hover:text-blue-400 transition-colors duration-200" />
                      {totalItems > 0 && (
                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-blue-600 text-center text-xs font-bold text-white">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  )}
                  
                  <Link 
                    to="/dashboard/my-profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="rounded-md bg-gray-800 px-4 py-2 text-gray-200 hover:bg-gray-700 transition-all duration-200">
                      Dashboard
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
