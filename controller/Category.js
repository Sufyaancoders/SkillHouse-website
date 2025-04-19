const Category = require('../models/category'); // Update the model import
// create category 
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

//category page details

exports.getCategoryDetails = async (req, res) => { // Renamed function
    
    try {//hich contains all URL path parameters.
    //    const { categoryId } = req.params; // Get category ID from request parameters
        const {categoryId} = req.body; // Get  category ID from request body
        // Validate input
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }
        
        // Find the category by ID
        const category = await Category.findById(categoryId).populate("courses").exec(); // Updated variable name
        console.log(category);
        // Check if the category was found
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        //handelr for the case when the category is not found
        if ( category.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found in this category"
            });
        }
        //get the courses for the other category
        const otherCategories = await Category.find({ _id: { $ne: categoryId } }).populate("courses").exec(); // Updated variable name
    // different course
        let differentCourses = [];
    for (const category of otherCategories) {
        differentCourses.push(...category.courses);
    }

    //get top selling courses
    const getAllCategories = await Category.find().populate("courses").exec(); // Updated variable name
const allCourses =getAllCategories.flatMap(category => category.courses);
const topSellingCourses = allCourses.sort((a, b) => b.sellingCount - a.sellingCount).slice(0, 10);
     // Get top 5 selling courses
        return res.status(200).json({
            success: true,
            message: "Category details fetched successfully",
            data: {
                category: category,
                differentCourses: differentCourses,
                topSellingCourses: topSellingCourses
            }
       
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