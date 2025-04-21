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
exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Advanced query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'updatedAt'; // Default sort by last updated
        const sortOrder = req.query.order === 'asc' ? 1 : -1;
        const category = req.query.category;
        const status = req.query.status; // 'completed', 'in-progress', 'not-started'
        const search = req.query.search || '';
        
        // Find the user with enrolled courses
        const user = await User.findById(userId)
            .populate({
                path: 'studentsEnrolled',
                match: search ? { courseName: { $regex: search, $options: 'i' } } : {}
            })
            .exec();
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        if (!user.studentsEnrolled || user.studentsEnrolled.length === 0) {
            return res.status(200).json({
                success: true,
                message: "You have not enrolled in any courses yet",
                data: {
                    courses: [],
                    pagination: {
                        totalItems: 0,
                        totalPages: 0,
                        currentPage: page,
                        limit
                    }
                }
            });
        }
        
        // Get course IDs from user's enrolled courses
        const enrolledCourseIds = user.studentsEnrolled.map(course => course._id);
        
        // Build filter query
        let filterQuery = { _id: { $in: enrolledCourseIds } };
        
        if (category) {
            filterQuery.category = category;
        }
        
        // Get total count for pagination
        const totalItems = await Course.countDocuments(filterQuery);
        const totalPages = Math.ceil(totalItems / limit);
        
        // Fetch courses with rich data
        let courses = await Course.find(filterQuery)
            .populate("instructor", "firstName lastName email profileImage")
            .populate("category", "name description")
            .populate({
                path: "ratingAndReviews",
                options: { limit: 3 } // Only get a few recent reviews
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections",
                    select: "title description duration timeDuration" // Exclude video URL
                }
            })
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean(); // For better performance
        
        // Fetch progress data for all courses
        const progressPromises = courses.map(course => 
            CourseProgress.findOne({ 
                courseID: course._id, 
                userID: userId 
            })
        );
        
        const progressData = await Promise.all(progressPromises);
        
        // Enhance courses with progress information
        const enhancedCourses = courses.map((course, index) => {
            const progress = progressData[index];
            
            // Calculate total content
            const totalSubSections = course.courseContent.reduce(
                (total, section) => total + section.subSections.length, 0
            );
            
            // Calculate completion metrics
            const completedVideos = progress?.completedVideos || [];
            const percentageCompleted = totalSubSections > 0 
                ? Math.round((completedVideos.length / totalSubSections) * 100) 
                : 0;
                
            // Determine course status
            let courseStatus = 'not-started';
            if (percentageCompleted > 0) {
                courseStatus = percentageCompleted >= 100 ? 'completed' : 'in-progress';
            }
            
            // Skip if filtering by status and doesn't match
            if (status && courseStatus !== status) {
                return null;
            }
            
            // Calculate time spent on course (if tracked)
            const timeSpent = progress?.totalTimeSpent || 0;
            
            // Find the next subsection to watch
            let nextSubSection = null;
            let nextSectionIndex = 0;
            let nextSubSectionIndex = 0;
            
            // Find where the user left off
            if (courseStatus !== 'completed') {
                courseLoop:
                for (let i = 0; i < course.courseContent.length; i++) {
                    const section = course.courseContent[i];
                    for (let j = 0; j < section.subSections.length; j++) {
                        const subSection = section.subSections[j];
                        if (!completedVideos.includes(subSection._id.toString())) {
                            nextSubSection = subSection;
                            nextSectionIndex = i;
                            nextSubSectionIndex = j;
                            break courseLoop;
                        }
                    }
                }
            }
            
            // Get last accessed time
            const lastAccessed = progress?.lastAccessedAt || course.updatedAt;
            
            return {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                instructor: course.instructor,
                thumbnail: course.thumbnail,
                category: course.category,
                price: course.price,
                tags: course.tags,
                averageRating: course.averageRating,
                ratingAndReviews: course.ratingAndReviews,
                studentsEnrolled: course.studentsEnrolled?.length || 0,
                createdAt: course.createdAt,
                updatedAt: course.updatedAt,
                progress: {
                    percentageCompleted,
                    completedVideos: completedVideos.length,
                    totalVideos: totalSubSections,
                    status: courseStatus,
                    lastAccessed,
                    timeSpent,
                    nextContent: nextSubSection ? {
                        sectionIndex: nextSectionIndex,
                        sectionName: course.courseContent[nextSectionIndex].sectionName,
                        subSectionIndex: nextSubSectionIndex,
                        subSectionTitle: nextSubSection.title,
                        subSectionId: nextSubSection._id
                    } : null
                }
            };
        }).filter(course => course !== null); // Remove filtered courses
        
        return res.status(200).json({
            success: true,
            data: {
                courses: enhancedCourses,
                pagination: {
                    totalItems: status ? enhancedCourses.length : totalItems,
                    totalPages: status ? Math.ceil(enhancedCourses.length / limit) : totalPages,
                    currentPage: page,
                    limit
                }
            }
        });
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch enrolled courses",
            error: error.message
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
        const instructorId = req.user.id;
        
        // Parse query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.order === 'asc' ? 1 : -1;
        const categoryId = req.query.category;
        const status = req.query.status;  // 'Draft', 'Published'
        const search = req.query.search || '';
        
        // Build the query
        let query = { instructor: instructorId };
        
        // Add filters if provided
        if (search) {
            query.courseName = { $regex: search, $options: 'i' };
        }
        
        if (categoryId) {
            query.category = categoryId;
        }
        
        if (status) {
            query.status = status;
        }
        
        // Count total courses matching the query
        const totalCourses = await Course.countDocuments(query);
        
        // Get instructor courses with selected fields
        const courses = await Course.find(query)
            .select('courseName courseDescription thumbnail price category status studentsEnrolled createdAt updatedAt')
            .populate('category', 'name')
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);
            
        // If no courses found
        if (courses.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No courses found for this instructor",
                data: {
                    courses: [],
                    pagination: {
                        totalCourses: 0,
                        currentPage: page,
                        totalPages: 0,
                        limit
                    }
                }
            });
        }
        
        // Get additional stats for each course
        const courseStats = await Promise.all(courses.map(async (course) => {
            // Get total number of enrolled students
            const enrolledCount = course.studentsEnrolled ? course.studentsEnrolled.length : 0;
            
            // Get average rating
            const ratingsData = await RatingAndReview.aggregate([
                { $match: { course: course._id } },
                { $group: { 
                    _id: null, 
                    averageRating: { $avg: "$rating" },
                    totalRatings: { $sum: 1 }
                }}
            ]);
            
            const averageRating = ratingsData.length > 0 ? ratingsData[0].averageRating : 0;
            const totalRatings = ratingsData.length > 0 ? ratingsData[0].totalRatings : 0;
            
            // Calculate total revenue from this course (mock data for now)
            const totalRevenue = enrolledCount * course.price;
            
            // Format the response
            return {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                price: course.price,
                category: course.category?.name || 'Uncategorized',
                status: course.status || 'Draft',
                metrics: {
                    enrolledStudents: enrolledCount,
                    averageRating: averageRating.toFixed(1),
                    totalRatings: totalRatings,
                    revenue: totalRevenue
                },
                createdAt: course.createdAt,
                updatedAt: course.updatedAt
            };
        }));
        
        // Calculate instructor-level stats
        const totalStudents = courseStats.reduce((sum, course) => sum + course.metrics.enrolledStudents, 0);
        const totalRevenue = courseStats.reduce((sum, course) => sum + course.metrics.revenue, 0);
        const avgRating = courseStats.reduce((sum, course) => sum + parseFloat(course.metrics.averageRating), 0) / 
                         (courseStats.length || 1);
        
        return res.status(200).json({
            success: true,
            data: {
                courses: courseStats,
                instructorStats: {
                    totalCourses,
                    totalStudents,
                    totalRevenue,
                    averageRating: avgRating.toFixed(1)
                },
                pagination: {
                    totalCourses,
                    currentPage: page,
                    totalPages: Math.ceil(totalCourses / limit),
                    limit
                }
            }
        });
        
    } catch (error) {
        console.error("Error fetching instructor courses:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message
        });
    }
};

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
