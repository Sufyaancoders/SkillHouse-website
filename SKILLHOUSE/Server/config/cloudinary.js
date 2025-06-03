const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnnect = async () => {
    try {
        // Configure the cloudinary SDK
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        
        // Test the connection by making a simple API call
        const result = await cloudinary.api.ping();
        console.log("Cloudinary connected successfully:", result.status);
        return cloudinary;

    } catch(error) {
        console.error("Cloudinary connection failed:", error.message);
        console.warn("WARNING: Image upload and retrieval functionality will be limited.");
        
        // Return cloudinary instance anyway (it will fail on actual operations)
        // but at least your server won't crash
        return cloudinary;
    }
};