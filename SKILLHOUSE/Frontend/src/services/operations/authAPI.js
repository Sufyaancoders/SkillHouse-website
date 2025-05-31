import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints
// Track if a request is in progress
let otpRequestInProgress = false;
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    if (otpRequestInProgress) {
      console.log("OTP request already in progress");
      return;
    }
    
    otpRequestInProgress = true;
    dispatch(setLoading(true))
    
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    otpRequestInProgress = false;
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}



export function getPasswordResetToken(email, setEmailSent) {
  return async(dispatch) => {
    const toastId = toast.loading("Sending reset link...");
    dispatch(setLoading(true));
    
    try {
      console.log("Requesting password reset for:", email);
      
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });
      
      console.log("RESET PASSWORD TOKEN RESPONSE:", response);
      
      // IMPORTANT CHANGE: Always show the same message regardless of backend success status
      // This maintains security by not revealing if an email exists in your system
      
      // Always show success message
      toast.success("If your email exists in our system, you will receive reset instructions");
      
      // Always set EmailSent to true
      console.log("Setting EmailSent to true");
      setEmailSent(true);
      
    } catch(error) {
      console.log("RESET PASSWORD TOKEN Error:", error);
      
      // Only show a generic error for actual network/server errors
      if (!error.response) {
        toast.error("Unable to process your request. Please try again later.");
      } else {
        // For all other responses (even 404/400), still show the standard message
        toast.success("If your email exists in our system, you will receive reset instructions");
        setEmailSent(true);
      }
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}