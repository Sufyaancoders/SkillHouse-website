const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  try {
    // Extract fields using camelCase to match frontend
    const { 
      email, 
      firstName,    // Changed from firstname
      lastName,     // Changed from lastname
      message, 
      phoneNumber,  // Changed from phoneNo
      countryCode   // Changed from countrycode
    } = req.body
    
    console.log("Contact form submission:", req.body)
    
    // Validate required fields
    if (!email || !firstName || !message || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
        requiredFields: ["email", "firstName", "message", "phoneNumber"]
      })
    }
    
    // Send confirmation email
    const emailRes = await mailSender(
      email,
      "Thank you for contacting us",
      contactUsEmail(email, firstName, lastName, message, phoneNumber, countryCode)
    )
    
    console.log("Email confirmation sent:", emailRes)
    
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully"
    })
    
  } catch (error) {
    console.error("Contact form error:", error)
    
    return res.status(500).json({
      success: false,
      message: "Failed to process contact form submission",
      error: error.message
    })
  }
}