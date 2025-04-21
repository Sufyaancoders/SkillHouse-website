const Course = require("../models/Course");
const User = require("../models/user");
const Tag = require("../models/category");
const {uploadImage} = require("../utils/imageUpload");

// create course handler
exports.createCourse = async (req, res) => {
    try { 
        const { courseName, courseDescription, whatYouWillLearn, price, tags } = req.body;
        //get thumbnail from request
        const thumbnail = req.files.thumbnailImage; // Assuming you're using multer for file uploads
        // const instructor = req.user.id; // Assuming you have middleware to set req.user
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tags) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // Check if the instructor exists
        const user_id= req.user.id;
    const instructor = await User.findById(user_id);
        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found"
            });
        }
        // Check if the tags exist
        const tagIds = await Tag.find({ _id: { $in: tags } });
        //$in: A MongoDB operator meaning "in this array" or "is any of these values"
        // const tagIds = await Tag.findById(tags);
        if (tagIds.length !== tags.length) {
            return res.status(400).json({
                success: false,
                message: "Some tags are invalid"
            });
        }
        // Upload thumbnail image and get URL
        const thumbnailImages = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        if (!thumbnailImages) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload thumbnail image"
            });
        }
        // Create new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tags: tagIds._id,
            thumbnail: thumbnailImages.secure_url,
            instructor: instructor._id, // Assuming you have middleware to set req.user
            // Assuming you have middleware to set req.user
        });
  
// add new courses to the user schema of the instructor

        // const instructorId = req.user.id; // Assuming you have middleware to set req.user
        // const courseId = req.params.courseId; // Assuming you're passing course ID in the URL
        
        // Find the instructor and add the course ID to their courses array
        await User.findByIdAndUpdate(
            {_id:instructor._id},
            { $push: { courses: newCourse._id } },
            { new: true }
        );
        
        
        
        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}  

// get all courses handler
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate("instructor", "firstName lastName email")
        .exec();
        // Check if courses exist
        if (!courses || courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found"
            });
        }
        return res.status(200).json({
            success: true,
            data: courses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

// get course by id handler
exports.getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params; // Get course ID from request parameters
        // Validate input
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }
        // Find the course by ID and populate instructor details
        const course = await Course.findById(courseId)
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
        }
    }).populate("category").populate("ratingAndReviews")
        .populate({
        path:"courseContent",
        populate:{
            path:"subSections",
    }}
)
    .exec();
        // Check if course exists
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

//getFullCourseDetails
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body; // Get course ID from request body instead of params
        
        // Validate input
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required in request body"
            });
        }

        // Find the course by ID and populate all related data
        const course = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                }
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections",
                }
            })
            .exec();

        // Check if course exists
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// editCourse
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { courseName, courseDescription, whatYouWillLearn, price, tags, status } = req.body;
        
        // Validate course ID
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }

        // Check if course exists and if user is the instructor
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Verify the user is the instructor of the course
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to edit this course"
            });
        }

        // Prepare update object with only the fields that are provided
        const updateData = {};
        
        if (courseName) updateData.courseName = courseName;
        if (courseDescription) updateData.courseDescription = courseDescription;
        if (whatYouWillLearn) updateData.whatYouWillLearn = whatYouWillLearn;
        if (price) updateData.price = price;
        if (status) updateData.status = status;

        // Handle tags if provided
        if (tags && tags.length > 0) {
            // Verify all tags exist
            const tagIds = await Tag.find({ _id: { $in: tags } });
            
            if (tagIds.length !== tags.length) {
                return res.status(400).json({
                    success: false,
                    message: "Some tags are invalid"
                });
            }
            
            updateData.tags = tags;
        }

        // Handle thumbnail if provided
        if (req.files && req.files.thumbnailImage) {
            const thumbnail = req.files.thumbnailImage;
            
            // Validate file type
            const supportedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!supportedTypes.includes(thumbnail.mimetype)) {
                return res.status(400).json({
                    success: false,
                    message: "Unsupported file format. Please upload JPEG, PNG or WebP images only"
                });
            }
            
            // Delete previous thumbnail from Cloudinary if it exists
            if (course.thumbnail && course.thumbnail.includes('cloudinary')) {
                // Extract public_id from the URL
                const publicId = course.thumbnail.split('/').pop().split('.')[0];
                // Delete the image - you'd need to implement this function
                await deleteFromCloudinary(publicId);
            }
            
            // Upload new thumbnail
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME,
                1000, // width
                1000  // height
            );
            
            if (thumbnailImage) {
                updateData.thumbnail = thumbnailImage.secure_url;
            }
        }

        // Update the course with the new data
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            updateData,
            { new: true, runValidators: true }
        )
        .populate("instructor", "firstName lastName")
        .populate("category")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSections"
            }
        });

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse
        });

    } catch (error) {
        console.error("Error in editCourse:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course",
            error: error.message
        });
    }
};

