import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      console.log("🔧 DEBUG: Redux setStep", {
        oldStep: state.step,
        newStep: action.payload
      })
      state.step = action.payload
    },
    setCourse: (state, action) => {
      console.log("🔧 DEBUG: Redux setCourse", {
        oldCourse: state.course?.courseName || 'null',
        newCourse: action.payload?.courseName || 'null',
        oldCourseContentLength: state.course?.courseContent?.length || 0,
        newCourseContentLength: action.payload?.courseContent?.length || 0,
        hasOldCourse: !!state.course,
        hasNewCourse: !!action.payload,
        newCourseData: action.payload
      })
      state.course = action.payload
    },
    setEditCourse: (state, action) => {
      console.log("🔧 DEBUG: Redux setEditCourse", {
        oldEdit: state.editCourse,
        newEdit: action.payload
      })
      state.editCourse = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetCourseState: (state) => {
      console.log("🔧 DEBUG: Redux resetCourseState")
      state.step = 1
      state.course = null
      state.editCourse = false
    },
  },
})

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions

export default courseSlice.reducer