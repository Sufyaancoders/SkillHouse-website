const Section = require("../models/Section");
const Course = require("../models/course");
 exports.createSection = async (req, res) => {
    try{ //data fetch
        const {SectionName, CourseId} = req.body;
        if(!SectionName || !CourseId){
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields",
            });
        }
        //create section
        const newSection = await Section.create({
            SectionName
        });
const updatedCourse = await Course.findByIdAndUpdate(
            CourseId,
            { $push: { sections: newSection._id } },
            { new: true }
        );
        //// Before the update
// {
//     _id: "61a2b3c4d5e6f7",
//     courseName: "Web Development Bootcamp",
//     sections: ["59a1b2c3d4e5f6"] // Existing sections
//   }
  
//   // After the update
//   {
//     _id: "61a2b3c4d5e6f7",
//     courseName: "Web Development Bootcamp",
//     sections: ["59a1b2c3d4e5f6", "65a7b8c9d0e1f2"] // Added new section ID
//   }
        if(!updatedCourse){
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Section created successfully",
            data: newSection,
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}
// update section
exports.updateSection = async (req, res) => {
    try {
        const { sectionId } = req.params; // Get section ID from request parameters
        const { sectionName } = req.body; // Get new section name from request body

        // Validate input
        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "Section ID and new name are required",
            });
        }

        // Find and update the section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,//First parameter: the ID to search for (a simple string/ObjectId)
            { sectionName },// Second parameter: update operations (an object)
            { new: true }// Third parameter: options (an object)
        );

        // Check if the section was found and updated
        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: updatedSection,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}
// delete section
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId } = req.params; // Get section ID from request parameters

        // Validate input
        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: "Section ID is required",
            });
        }

        // Find and delete the section
        const deletedSection = await Section.findByIdAndDelete(sectionId);

        // Check if the section was found and deleted
        if (!deletedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: deletedSection,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}