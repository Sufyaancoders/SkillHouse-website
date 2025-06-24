import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector.js"
import { settingsEndpoints } from "../apis.js"
import { logout } from "./authAPI.js"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      if(!token){
        throw new Error("User is not authenticated token is missing")
      }
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      )
      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting your account...")
    try {
      // Validate token
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      
      // Debug token - only show first few characters for security
      console.log("Using token (first 10 chars):", token.substring(0, 10) + "...")
      
      // Make API request with proper headers
      const response = await apiConnector(
        "DELETE",
        DELETE_PROFILE_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      
      console.log("DELETE_PROFILE_API Response:", response)
      
      // Check response
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete account")
      }
      
      // Success case - logout user
      toast.success("Account deleted successfully")
      dispatch(logout(navigate))
      return true
    } catch (error) {
      console.log("DELETE_PROFILE_API Error:", error)
      
      // Handle token issues
      if (error.response && error.response.status === 401) {
        console.log("Token validation failed - logging out user")
        
        // Force logout on token error
        dispatch(logout(navigate))
        
        // Show specific message for token errors
        toast.error("Your session has expired. Please log in again.")
      } else {
        // Show generic error for other issues
        toast.error(error.response?.data?.message || error.message || "Failed to delete account")
      }
      
      // Re-throw for component handling
      throw error
    } finally {
      toast.dismiss(toastId)
    }
  }
}
