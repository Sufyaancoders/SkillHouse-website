const Section = require("../models/Section");
const Course = require("../models/course");
 exports.createSection = async (req, res) => {
    try{ //data fetch
        console.log("🔧 DEBUG: createSection controller called");
        console.log("🔧 DEBUG: REQ.BODY:", req.body);
        console.log("🔧 DEBUG: REQ.USER:", req.user);
        
        const { sectionName, courseId } = req.body;
        
        console.log("🔧 DEBUG: Extracted data:", { sectionName, courseId });
        
        if(!sectionName || !courseId){
            console.log("🔧 DEBUG: Missing required fields");
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields",
            });
        }
        
        //create section
        console.log("🔧 DEBUG: Creating new section");
        const newSection = await Section.create({
            sectionName,
            subsection: []
        });
        console.log("🔧 DEBUG: NEW SECTION:", newSection);
        
        console.log("🔧 DEBUG: Updating course with new section");
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: newSection._id } },
            { new: true }
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subsection",
            },
        })
        .exec();
        
        console.log("🔧 DEBUG: UPDATED COURSE:", updatedCourse);
        console.log("🔧 DEBUG: Course courseContent length:", updatedCourse?.courseContent?.length);
        
        if(!updatedCourse){
            console.log("🔧 DEBUG: Course not found");
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        
        console.log("🔧 DEBUG: Sending success response");
        return res.status(201).json({
            success: true,
            message: "Section created successfully",
            data: newSection,
            updatedCourse: updatedCourse,
        });

    }
    catch(error){
        console.error("🔧 DEBUG: CREATE SECTION ERROR:", error);
        console.error("🔧 DEBUG: Error stack:", error.stack);
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
        console.log("🔧 DEBUG: updateSection controller called");
        console.log("🔧 DEBUG: REQ.PARAMS:", req.params);
        console.log("🔧 DEBUG: REQ.BODY:", req.body);
        
        // FIXED: Get sectionId from body instead of params to match frontend call
        const { sectionId, sectionName, courseId } = req.body;
        
        console.log("🔧 DEBUG: Extracted data:", { sectionId, sectionName, courseId });

        // Validate input
        if (!sectionId || !sectionName) {
            console.log("🔧 DEBUG: Missing required fields");
            return res.status(400).json({
                success: false,
                message: "Section ID and new name are required",
            });
        }

        console.log("🔧 DEBUG: Updating section with ID:", sectionId);
        // Find and update the section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,//First parameter: the ID to search for (a simple string/ObjectId)
            { sectionName },// Second parameter: update operations (an object)
            { new: true }// Third parameter: options (an object)
        );

        console.log("🔧 DEBUG: Updated section:", updatedSection);

        // Check if the section was found and updated
        if (!updatedSection) {
            console.log("🔧 DEBUG: Section not found");
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // FIXED: Return the updated course with populated sections to match createSection behavior
        if (courseId) {
            console.log("🔧 DEBUG: Fetching updated course");
            const updatedCourse = await Course.findById(courseId)
                .populate({
                    path: "courseContent",
                    populate: {
                        path: "subsection",
                    },
                })
                .exec();
            
            console.log("🔧 DEBUG: Updated course fetched:", updatedCourse);
            
            return res.status(200).json({
                success: true,
                message: "Section updated successfully",
                data: updatedSection,
                updatedCourse: updatedCourse,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: updatedSection,
        });
    } catch (error) {
        console.error("🔧 DEBUG: UPDATE SECTION ERROR:", error);
        console.error("🔧 DEBUG: Error stack:", error.stack);
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