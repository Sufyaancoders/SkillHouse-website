const Subsection = require("../models/subsection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUpload"); // Add this import

// create subsection
exports.createSubsection = async (req, res) => {
    try {
        const { title, timeduration, description, sectionId } = req.body;
        const video = req.files?.videoFile; // Added optional chaining
        
        // Fixed validation - added braces and proper block
        if (!title || !timeduration || !description || !sectionId || !video) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields",
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
        
        // create subsection - added sectionId
        const newSubsection = await Subsection.create({
            title: title,
            timeduration:timeduration,
            description:description,
            video: videoUrl.secure_url
            // section: sectionId // Added this reference
        });
        
        // update section with new subsection
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subsections: newSubsection._id } },
            { new: true }
        );
        
        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }
        
        return res.status(201).json({
            success: true,
            message: "Subsection created successfully",
            data: newSubsection,
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
