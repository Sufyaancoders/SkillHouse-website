const Category = require('../models/category'); // Update the model import

exports.createCategory = async (req, res) => {   // Renamed function
    try {
        const { name, description } = req.body;
        
        // Validate input
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required"
            });
        }
        
        // Create new category
        const newCategory = await Category.create({ // Updated variable name
            name: name, 
            description: description 
        });
        
        return res.status(201).json({
            success: true,
            // data: newCategory
            message: "Category created successfully", // Updated message
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

// get all categories
exports.getAllCategories = async (req, res) => { // Renamed function
    try {
        const categories = await Category.find({}, {name: true, description: true}); // Updated variable name
        // Check if categories exist
        
        return res.status(200).json({
            success: true,
            data: categories // Uncommented and updated variable name
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