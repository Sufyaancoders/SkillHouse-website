const Subsection = require("../models/subsection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader"); // Add this import

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
