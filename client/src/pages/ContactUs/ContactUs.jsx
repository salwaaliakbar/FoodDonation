// Importing reusable components and icons
import Navbar from "../../Components/Navbar/NavBar";
import { Mail, MapPin, Phone } from "lucide-react";
import { Formik, Form, Field } from "formik";
import ContactusSchema from "../../yupschemas/ContactusSchema";
import Footer from "../../Components/Footer/Footer";

function ContactUs() {
  return (
    <div className="font-[Montserrat]">
      <Navbar />
      <div>
        {/* Top hero section with heading and description */}
        <div className="bg-green-800 pt-15 pb-12 md:pb-24">
          <div className="mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-[Poppins]">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              Have questions about donating food or receiving food? We're here
              to help you make a difference in our community.
            </p>
          </div>
        </div>

        {/* Contact form and contact info side by side */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-10 px-4 md:px-10 lg:px-20 py-10 mx-2 pb-20 md:pb-30">
          {/* Contact form section */}
          <div className="w-full lg:w-1/2">
            <Formik
              initialValues={{
                fullname: "",
                phone: "",
                email: "",
                message: "",
              }}
              // Alert on form submission
              onSubmit={() => {
                alert("Your message sent successfully");
              }}
              validationSchema={ContactusSchema}
            >
              {({ errors, touched }) => (
                <Form className="border-green-200 border-[1.5px] rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6">
                  <h1 className="text-3xl text-center mb-4 text-green-800 font-bold font-[Poppins]">
                    Send Us a Message
                  </h1>
                  <p className="text-center text-gray-600 mb-5">
                    Fill out the form and we'll get back to you as soon as
                    possible.
                  </p>

                  {/* Full Name field */}
                  <div className="relative mb-4">
                    <i className="fa fa-user absolute left-3 top-4 text-gray-400"></i>
                    <Field
                      name="fullname"
                      placeholder="Full Name"
                      className="block p-2 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
                    />
                    {errors.fullname && touched.fullname ? (
                      <div className="text-red-600 text-sm">
                        {errors.fullname}
                      </div>
                    ) : null}
                  </div>

                  {/* Phone Number field */}
                  <div className="relative mb-4">
                    <i className="fa fa-phone absolute left-3 top-4 text-gray-400"></i>
                    <Field
                      name="phone"
                      placeholder="Phone Number"
                      className="block p-2 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="text-red-600 text-sm">{errors.phone}</div>
                    ) : null}
                  </div>

                  {/* Email field */}
                  <div className="relative mb-4">
                    <i className="fa fa-envelope absolute left-3 top-3 text-gray-400"></i>
                    <Field
                      name="email"
                      placeholder="Email Address"
                      className="block p-2 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-600 text-sm">{errors.email}</div>
                    ) : null}
                  </div>

                  {/* Message textarea */}
                  <div className="relative mb-6">
                    <i className="fa fa-pencil absolute left-3 top-3 text-gray-400"></i>
                    <Field
                      name="message"
                      as="textarea"
                      placeholder="Write your message..."
                      className="block p-2 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
                    />
                    {errors.message && touched.message ? (
                      <div className="text-red-600 text-sm">
                        {errors.message}
                      </div>
                    ) : null}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="bg-green-800 hover:bg-green-600 text-white cursor-pointer font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
                  >
                    Send Message
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* Contact information section */}
          <div className="w-full lg:w-1/2 px-3">
            <h2 className="text-3xl text-left mb-10 text-green-800 font-bold font-[Poppins] md:mt-7">
              Contact Information
            </h2>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1">
                <div className="bg-green-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-green-800" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Our Location</h3>
                  <p className="text-gray-600">
                    123 Food Share Street
                    <br />
                    Community City, World 12345
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1">
                <div className="bg-green-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-green-800" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email Us</h3>
                  <p className="text-gray-600">
                    contact@foodshare.org
                    <br />
                    donations@foodshare.org
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-green-800" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Call Us</h3>
                  <p className="text-gray-600">
                    Donation Hotline: (123) 456-7890
                    <br />
                    General Inquiries: (123) 456-7891
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
export default ContactUs;
