import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { apiConnector } from '../../../services/apiconnector';
import { contactusEndpoint } from '../../../services/apis';

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  // Updated form fields to match your requirements
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    message: "",
    phoneNo: "",
    subject: "" // Keeping subject as it's in your form
  });

  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      console.log('Submitting form data:', formData);
      
      // Call the API with the form data
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        formData
      );
      
      console.log("Contact form submission response:", res);
      setSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          email: "",
          firstname: "",
          lastname: "",
          message: "",
          phoneNo: "",
          subject: ""
        });
        setSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our platform or want to learn more about our mission? We'd love to hear from you.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
              {/* Left side content remains unchanged */}
              <div className="bg-blue-700 text-white p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="mb-8">Fill out the form and our team will get back to you within 24 hours.</p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 mr-4 mt-1" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-blue-200">contact@skillhouse.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessageSquare className="w-6 h-6 mr-4 mt-1" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-blue-200">Available 9am-5pm EST</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="font-medium mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {/* Social media icons would go here */}
                  </div>
                </div>
              </div>

              {/* Form side - corrected field mappings */}
              <div className="p-8 md:p-12">
                {submitted ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text" 
                          id="firstname" 
                          name="firstname" 
                          value={formData.firstname} 
                          onChange={handleChange} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                          required 
                        />
                      </div>
                      <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          id="lastname" 
                          name="lastname" 
                          value={formData.lastname} 
                          onChange={handleChange} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                        required 
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phoneNo" 
                        name="phoneNo" 
                        value={formData.phoneNo} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select 
                        id="subject" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Become an Instructor">Become an Instructor</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                      <textarea 
                        id="message"
                        name="message" 
                        rows="5" 
                        value={formData.message} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;