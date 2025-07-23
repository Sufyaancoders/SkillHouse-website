import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)
  
  // Loading states
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleleSection = async (sectionId) => {
    setIsDeleting(true)
    try {
      const result = await deleteSection({
        sectionId,
        courseId: course._id,
        token,
      })
      
      if (result) {
        dispatch(setCourse(result))
        toast.success("Section deleted successfully")
      }
    } catch (error) {
      console.error("Error deleting section:", error)
      toast.error("Failed to delete section")
    } finally {
      setIsDeleting(false)
      setConfirmationModal(null)
    }
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    setIsDeleting(true)
    try {
      const result = await deleteSubSection({ subSectionId, sectionId, token })
      
      if (result) {
        // update the structure of course
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === sectionId ? result : section
        )
        const updatedCourse = { ...course, courseContent: updatedCourseContent }
        dispatch(setCourse(updatedCourse))
        toast.success("Lecture deleted successfully")
      }
    } catch (error) {
      console.error("Error deleting lecture:", error)
      toast.error("Failed to delete lecture")
    } finally {
      setIsDeleting(false)
      setConfirmationModal(null)
    }
  }

  return (
    <>
      <div
        className="rounded-lg bg-slate-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {Array.isArray(course?.courseContent) &&
          course.courseContent.map((section) => (
            // Section Dropdown
            <details key={section._id} open>
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-slate-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-slate-100" />
                <p className="font-semibold text-slate-100">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  disabled={isDeleting}
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                  aria-label="Edit section"
                  className="transition-transform hover:scale-110"
                >
                  <MdEdit className="text-xl text-slate-300 hover:text-yellow-50" />
                </button>
                <button
                  disabled={isDeleting}
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                  aria-label="Delete section"
                  className="transition-transform hover:scale-110"
                >
                  <RiDeleteBin6Line className="text-xl text-slate-300 hover:text-red-400" />
                </button>
                <span className="font-medium text-slate-300">|</span>
                <AiFillCaretDown className="text-xl text-slate-300" />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {Array.isArray(section.subSection) && section.subSection.length > 0 ? (
                section.subSection.map((data) => (
                  <div
                    key={data?._id}
                    onClick={() => setViewSubSection(data)}
                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-slate-600 py-2 hover:bg-slate-600/30"
                  >
                    <div className="flex items-center gap-x-3 py-2 ">
                      <RxDropdownMenu className="text-2xl text-slate-100" />
                      <p className="font-semibold text-slate-100">
                        {data.title}
                      </p>
                    </div>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-x-3"
                    >
                      <button
                        disabled={isDeleting}
                        onClick={() =>
                          setEditSubSection({ ...data, sectionId: section._id })
                        }
                        aria-label="Edit lecture"
                        className="transition-transform hover:scale-110"
                      >
                        <MdEdit className="text-xl text-slate-300 hover:text-yellow-50" />
                      </button>
                      <button
                        disabled={isDeleting}
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this Lecture?",
                            text2: "This lecture will be permanently deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                        aria-label="Delete lecture"
                        className="transition-transform hover:scale-110"
                      >
                        <RiDeleteBin6Line className="text-xl text-slate-300 hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-2 text-sm text-slate-400 italic">
                  No lectures in this section yet
                </p>
              )}
              
              {/* Add New Lecture to Section */}
              <button
                disabled={isDeleting}
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50 hover:text-yellow-500 transition-colors"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
        
        {isDeleting && (
          <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      
      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : null}
      
      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}