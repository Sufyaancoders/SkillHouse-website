const cloudinary = require('cloudinary').v2;

exports.uploadImage = async (File,folder,height,quality) => {
    try {
        const options ={folder};
        if (height) options.height = height;
        if (quality) options.quality = quality;
        options.resource_type = 'auto';
        
        console.log("Uploading to Cloudinary with options:", options);
        const result = await cloudinary.uploader.upload(File.tempFilePath, options);
        console.log("Upload successful:", result.secure_url);
        return result;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
}

// Alias for backward compatibility
exports.uploadImageToCloudinary = async (File, folder, width, height) => {
    try {
        const options = { folder };
        if (width) options.width = width;
        if (height) options.height = height;
        options.resource_type = 'auto';
        
        console.log("Uploading to Cloudinary with options:", options);
        console.log("File details:", {
            name: File.name,
            size: File.size,
            tempFilePath: File.tempFilePath
        });
        
        const result = await cloudinary.uploader.upload(File.tempFilePath, options);
        console.log("Upload successful:", result.secure_url);
        return result;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
}

// Function to delete image from Cloudinary
exports.deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
}