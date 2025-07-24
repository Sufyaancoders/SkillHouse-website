const Subsection = require("../models/subsection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUpload"); // Add this import

// create subsection
exports.createSubsection = async (req, res) => {
    try {
        console.log("🔧 DEBUG: createSubsection controller called");
        console.log("🔧 DEBUG: req.params:", req.params);
        console.log("🔧 DEBUG: req.body:", req.body);
        console.log("🔧 DEBUG: req.files:", req.files);
        
        const { sectionId } = req.params; // Get sectionId from URL params
        const { title, description } = req.body;
        const video = req.files?.video; // Match frontend field name
        
        console.log("🔧 DEBUG: Extracted data:", {
            sectionId,
            title,
            description,
            hasVideo: !!video
        });
        
        // Updated validation - removed timeduration requirement
        if (!title || !description || !sectionId || !video) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: title, description, video, and sectionId",
            });
        }
        
        // upload video to cloudinary
        const videoUrl = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        if (!videoUrl) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload video",
            });
        }
        
        console.log("🔧 DEBUG: Creating subsection with data:", {
            title,
            description,
            videoUrl: videoUrl.secure_url
        });
        
        // create subsection - removed timeduration requirement
        const newSubsection = await Subsection.create({
            title: title,
            description: description,
            video: videoUrl.secure_url
        });
        
        console.log("🔧 DEBUG: Created subsection:", newSubsection);
        
        // update section with new subsection
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subsection: newSubsection._id } }, // Changed from 'subsections' to 'subsection'
            { new: true }
        ).populate('subsection'); // Populate to get full subsection data
        
        if (!updatedSection) {
            console.log("🔧 DEBUG: Section not found with ID:", sectionId);
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }
        
        console.log("🔧 DEBUG: Updated section:", updatedSection);
        
        return res.status(201).json({
            success: true,
            message: "Subsection created successfully",
            data: updatedSection, // Return the updated section instead of just subsection
        });
    } catch (error) {
        console.error("Error creating subsection:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create subsection",
            error: error.message
        });
    }
};

// Update subsection
exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId } = req.params;
        const { title, description, timeDuration } = req.body;
        
        // Validate subsection ID
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID is required"
            });
        }
        
        // Find the subsection
        const subsection = await Subsection.findById(subSectionId);
        if (!subsection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            });
        }
        
        // Prepare update object
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (timeDuration) updateData.timeDuration = timeDuration;
        
        // Handle video update if provided
        if (req.files && req.files.videoFile) {
            const video = req.files.videoFile;
            
            // Delete old video from cloudinary if it exists
            if (subsection.video) {
                // Extract public_id from the URL
                const publicId = subsection.video.split('/').pop().split('.')[0];
                try {
                    // You may need to implement this function
                    await deleteFromCloudinary(publicId);
                } catch (err) {
                    console.log("Error deleting old video:", err);
                    // Continue even if delete fails
                }
            }
            
            // Upload new video
            const videoUrl = await uploadImageToCloudinary(
                video, 
                process.env.FOLDER_NAME
            );
            
            if (videoUrl) {
                updateData.video = videoUrl.secure_url;
            }
        }
        
        // Update the subsection
        const updatedSubsection = await Subsection.findByIdAndUpdate(
            subSectionId,
            updateData,
            { new: true }
        );
        
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedSubsection
        });
        
    } catch (error) {
        console.error("Error updating subsection:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update subsection",
            error: error.message
        });
    }
};

// Delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId } = req.params;
        
        // Validate subsection ID
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID is required"
            });
        }
        
        // Find the subsection
        const subsection = await Subsection.findById(subSectionId);
        if (!subsection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            });
        }
        
        // Find the section that contains this subsection and remove the reference
        const section = await Section.findOneAndUpdate(
            { subsections: subSectionId },
            { $pull: { subsections: subSectionId } },
            { new: true }
        );
        
        if (!section) {
            console.log("Warning: Could not find parent section for this subsection");
        }
        
        // Delete video from cloudinary if it exists
        if (subsection.video) {
            // Extract public_id from the URL
            const publicId = subsection.video.split('/').pop().split('.')[0];
            try {
                // You may need to implement this function
                await deleteFromCloudinary(publicId);
            } catch (err) {
                console.log("Error deleting video:", err);
                // Continue even if delete fails
            }
        }
        
        // Delete the subsection
        await Subsection.findByIdAndDelete(subSectionId);
        
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
        });
        
    } catch (error) {
        console.error("Error deleting subsection:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete subsection",
            error: error.message
        });
    }
};
