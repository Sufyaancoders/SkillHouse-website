const Tag = require('../models/tags');

exports.createTag = async (req, res) => {   
    try {
        const { name, description } = req.body;
        
        // Validate input
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required"
            });
        }
        
        // Create new tag
        const newTag = await Tag.create({ name:name, 
            description:description 
        });
        
        return res.status(201).json({
            success: true,
            // data: newTag
            message: "Tag created successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

//grt all tags
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find({},{name:true,description:true});
        // Check if tags exist
        
        return res.status(200).json({
            success: true,
            // data: tags
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}