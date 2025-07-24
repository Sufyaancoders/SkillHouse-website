const Course = require("../models/course");
const User = require("../models/user");
const Category = require("../models/category");
const CourseProgress = require("../models/CourseProgress");
const RatingAndReview = require("../models/RatingAndReview");
const {uploadImage, uploadImageToCloudinary, deleteFromCloudinary} = require("../utils/imageUpload");

// create course handler
exports.createCourse = async (req, res) => {
    try { 
        console.log("=== CREATE COURSE CONTROLLER DEBUG ===");
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);
        console.log("User ID:", req.user.id);
        console.log("User account type:", req.user.accountType);
        console.log("======================================");
        
        const { courseName, courseDescription, whatYouWillLearn, price, tags, category, status, instructions } = req.body;
        //get thumbnail from request
        const thumbnail = req.files?.thumbnailImage; // Assuming you're using multer for file uploads
        
        console.log("Extracted fields:", {
            courseName, courseDescription, whatYouWillLearn, price, tags, category, status, instructions
        });
        
        // const instructor = req.user.id; // Assuming you have middleware to set req.user
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tags) {
            console.log("Missing required fields");
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if thumbnail is provided
        if (!thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Course thumbnail is required"
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
        // Parse tags if it's a JSON string, but don't validate against Tag collection
        // since Course model expects tags as strings, not ObjectIds
        let parsedTags;
        
        try {
            // Parse tags if it's a JSON string
            parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
            console.log("Parsed tags:", parsedTags);
        } catch (error) {
            console.log("Error parsing tags, using as-is:", error);
            parsedTags = tags;
        }
        
        if (!Array.isArray(parsedTags)) {
            return res.status(400).json({
                success: false,
                message: "Tags must be an array"
            });
        }
        // Upload thumbnail image and get URL
        console.log("Uploading thumbnail to Cloudinary...", {
            fileName: thumbnail.name,
            fileSize: thumbnail.size,
            mimeType: thumbnail.mimetype
        });
        
        const thumbnailImages = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        
        if (!thumbnailImages) {
            console.error("Failed to upload thumbnail to Cloudinary");
            return res.status(500).json({
                success: false,
                message: "Failed to upload thumbnail image"
            });
        }

        console.log("Thumbnail uploaded successfully:", thumbnailImages.secure_url);
        
        // Parse instructions if it's a JSON string
        let parsedInstructions;
        try {
            parsedInstructions = typeof instructions === 'string' ? JSON.parse(instructions) : instructions;
            console.log("Parsed instructions:", parsedInstructions);
        } catch (error) {
            console.log("Error parsing instructions, using as-is:", error);
            parsedInstructions = instructions || [];
        }
        
        // Create new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tags: parsedTags, // Use the original tag names as strings
            thumbnail: thumbnailImages.secure_url,
            instructor: instructor._id,
            instructions: parsedInstructions, // Required field
            category: category, // Required field
            status: status || "Draft", // Required field
            coursecontent: [], // Required field - empty array for new courses
            studentsEnrolled: [], // Required field - empty array for new courses
            ratingAndReview: [], // Optional field - empty array for new courses
        });
        
        console.log("Course created successfully:", newCourse._id);
  
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
        console.log("=== CREATE COURSE ERROR ===");
        console.log("Error message:", error.message);
        console.log("Error stack:", error.stack);
        console.log("===========================");
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
            const categoryIds = await Category.find({ _id: { $in: tags } });
            
            if (categoryIds.length !== tags.length) {
                return res.status(400).json({
                    success: false,
                    message: "Some categories are invalid"
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

//deleteCourse
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        
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
                message: "You are not authorized to delete this course"
            });
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        console.error("Error in deleteCourse:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete course",
            error: error.message
        });
    }
};

/**
 * Get enrolled courses for the authenticated user with comprehensive details and progress tracking
 */
exports. getEnrolledCourses = async (req, res) => {
   
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId)
          .populate({
            path: "courses",
            select: "courseName courseDescription thumbnail price"
          });
        
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found"
          });
        }
        
        return res.status(200).json({
          success: true,
          data: user.courses
        });
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch enrolled courses"
        });
      }
    
};

//updateCourseProgress

exports.updateCourseProgress = async (req, res) => {
    try {
        const { courseId, completedVideos, totalTimeSpent, lastAccessedAt } = req.body;
        const userId = req.user.id; // Assuming you have middleware to set req.user
        
        // Validate input
        if (!courseId || !completedVideos) {
            return res.status(400).json({
                success: false,
                message: "Course ID and completed videos are required"
            });
        }
        
        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        
        // Update progress in the database
        const progressData = {
            userID: userId,
            courseID: courseId,
            completedVideos,
            totalTimeSpent,
            lastAccessedAt
        };
        
        let progress = await CourseProgress.findOneAndUpdate(
            { userID: userId, courseID: courseId },
            progressData,
            { new: true, upsert: true } // Create if it doesn't exist
        );
        
        return res.status(200).json({
            success: true,
            message: "Course progress updated successfully",
            data: progress
        });
    } catch (error) {
        console.error("Error updating course progress:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course progress",
            error: error.message
        });
    }
}

//getInstructorCourses

/**
 * Get all courses created by the authenticated instructor
 * Supports filtering, sorting, and provides course performance metrics
 */
exports.getInstructorCourses = async (req, res) => {
  try {
    console.log("=== GET INSTRUCTOR COURSES DEBUG ===");
    console.log("Request user:", req.user);
    console.log("User ID:", req.user._id || req.user.id);
    console.log("User account type:", req.user.accountType);
    console.log("====================================");

    // Check if user is authenticated
    if (!req.user) {
      console.log("ERROR: No user found in request");
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    // Get the instructor ID from the authenticated user
    const instructorId = req.user._id || req.user.id;
    console.log("Using instructor ID:", instructorId);

    // Find all courses belonging to the instructor with populated fields
    console.log("Searching for courses with instructor ID:", instructorId);
    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
    .populate("category", "name description") // Populate category
    .populate("ratingAndReview") // Populate ratings
    .sort({ createdAt: -1 });

    console.log(`Found ${instructorCourses.length} courses for instructor ${instructorId}`);
    
    if (instructorCourses.length > 0) {
      console.log("First course sample:", {
        _id: instructorCourses[0]._id,
        courseName: instructorCourses[0].courseName,
        studentsEnrolled: instructorCourses[0].studentsEnrolled,
        studentsEnrolledLength: instructorCourses[0].studentsEnrolled?.length,
        price: instructorCourses[0].price
      });
    }

    // Check if any courses were found
    if (!instructorCourses || instructorCourses.length === 0) {
      console.log("No courses found, returning empty array");
      return res.status(200).json({
        success: true,
        message: "No courses found for this instructor",
        data: [] // Return empty array instead of null for better frontend handling
      });
    }

    // Process course data for the frontend
    console.log("Processing courses data...");
    const processedCourses = instructorCourses.map((course, index) => {
      console.log(`Processing course ${index + 1}:`, {
        _id: course._id,
        courseName: course.courseName,
        studentsEnrolled: course.studentsEnrolled,
        studentsEnrolledType: typeof course.studentsEnrolled,
        studentsEnrolledIsArray: Array.isArray(course.studentsEnrolled)
      });

      // Calculate enrollment stats - FIXED TYPO: studentsEnrolled not studentsEnroled
      const totalStudentsEnrolled = course.studentsEnrolled?.length || 0;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      console.log(`Course ${course.courseName}: ${totalStudentsEnrolled} students, ${totalAmountGenerated} revenue`);

      // Return formatted course object
      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        price: course.price,
        category: course.category,
        createdAt: course.createdAt,
        status: course.status,
        totalStudentsEnrolled,
        totalAmountGenerated
      };
    });

    console.log("Successfully processed all courses");

    // Return the instructor's courses
    return res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: processedCourses,
    });
  } catch (error) {
    console.error("=== ERROR IN GET INSTRUCTOR COURSES ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("=======================================");
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
}

/**
 * Get courses filtered by category with pagination and sorting
 */
exports.getCoursesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        
        // Pagination and sorting parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.order === 'asc' ? 1 : -1;
        
        // Price range filter
        const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : 0;
        const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : Infinity;
        
        // Search filter
        const search = req.query.search || '';
        
        // Status filter (only get published courses for public view)
        const status = 'Published';
        
        // Validate the category ID
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }

        // Check if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        
        // Build the query for filtering courses
        const query = {
            category: categoryId,
            status: status,
            price: { $gte: minPrice, ...(maxPrice !== Infinity && { $lte: maxPrice }) }
        };
        
        // Add search term if provided
        if (search) {
            query.$or = [
                { courseName: { $regex: search, $options: 'i' } },
                { courseDescription: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Get total count for pagination
        const totalCourses = await Course.countDocuments(query);
        
        // Get courses with category filter
        const courses = await Course.find(query)
            .select('courseName courseDescription thumbnail price instructor studentsEnrolled createdAt')
            .populate('instructor', 'firstName lastName profileImage')
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean();
        
        // Calculate average ratings for each course
        const coursesWithRatings = await Promise.all(courses.map(async (course) => {
            // Get rating stats
            const ratingStats = await RatingAndReview.aggregate([
                { $match: { course: course._id } },
                { $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                    ratingCount: { $sum: 1 }
                }}
            ]);
            
            const averageRating = ratingStats.length > 0 ? 
                parseFloat(ratingStats[0].averageRating.toFixed(1)) : 0;
            const ratingCount = ratingStats.length > 0 ? ratingStats[0].ratingCount : 0;
            
            // Get enrollment count
            const enrollmentCount = course.studentsEnrolled?.length || 0;
            
            return {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                price: course.price,
                instructor: `${course.instructor.firstName} ${course.instructor.lastName}`,
                instructorImage: course.instructor.profileImage,
                averageRating,
                ratingCount,
                enrollmentCount,
                createdAt: course.createdAt
            };
        }));
        
        // If no courses found
        if (coursesWithRatings.length === 0) {
            return res.status(200).json({
                success: true,
                message: `No courses found in ${category.name} category`,
                data: {
                    category: {
                        _id: category._id,
                        name: category.name,
                        description: category.description
                    },
                    courses: [],
                    pagination: {
                        totalCourses: 0,
                        totalPages: 0,
                        currentPage: page,
                        limit
                    }
                }
            });
        }
        
        // Return the courses with category info
        return res.status(200).json({
            success: true,
            data: {
                category: {
                    _id: category._id,
                    name: category.name,
                    description: category.description
                },
                courses: coursesWithRatings,
                pagination: {
                    totalCourses,
                    totalPages: Math.ceil(totalCourses / limit),
                    currentPage: page,
                    limit
                }
            }
        });
        
    } catch (error) {
        console.error("Error fetching courses by category:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch courses by category",
            error: error.message
        });
    }
};

//getTopSellingCourses
exports.getTopSellingCourses = async (req, res) => {
    try {
        // Get top-selling courses based on the number of students enrolled
        const courses = await Course.find({})
            .sort({ studentsEnrolled: -1 })
            .limit(10)
            .populate("instructor", "firstName lastName profileImage")
            .populate("category", "name description")
            .lean(); // For better performance
        
        if (!courses || courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No top-selling courses found"
            });
        }
        
        return res.status(200).json({
            success: true,
            data: courses
        });
    } catch (error) {
        console.error("Error fetching top-selling courses:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch top-selling courses",
            error: error.message
        });
    }
};
