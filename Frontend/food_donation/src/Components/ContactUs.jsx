import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import ContactusSchema from "./YupSchemas/ContactusSchema";

function ContactUs({ setIsContact }) {

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-60 z-12"></div>
      <div className="fixed inset-12 flex justify-center items-center pt-8 z-20">
        <Formik
          initialValues={{
            fullname: "",
            phone: "",
            email: "",
            message: "",
          }}
          onSubmit={() => {
            alert('Your message sent successfully');
            setIsContact(false)
          }}
          validationSchema={ContactusSchema}
        >
          {({errors, touched}) => (
            <Form className="bg-white shadow-lg rounded-2xl p-10 w-96 z-20 relative">
              <button
                type="button"
                onClick={() => setIsContact(false)}
                className="absolute top-2 right-3 text-3xl text-gray-600 hover:text-gray-800 transition-colors"
              >
                &times;
              </button>

              <h1 className="text-3xl text-center font-semibold mb-4 text-green-800">
                Get in Touch
              </h1>
              <p className="text-center text-gray-600 mb-5">
                We would love to hear from you! Please send us a message.
              </p>

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

              <div className="relative mb-4">
                <i className="fa fa-phone absolute left-3 top-4 text-gray-400"></i>
                <Field
                  name="phone"
                  placeholder="Phone Number"
                  className="block p-2 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
                />
                {errors.phone && touched.phone ? (
                    <div className="text-red-600 text-sm">
                      {errors.phone}
                    </div>
                  ) : null}
              </div>

              <div className="relative mb-4">
                <i className="fa fa-envelope absolute left-3 top-4 text-gray-400"></i>
                <Field
                  name="email"
                  placeholder="Email Address"
                  className="block p-2 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
                />
                {errors.email && touched.email ? (
                    <div className="text-red-600 text-sm">
                      {errors.email}
                    </div>
                  ) : null}
              </div>

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
    </>
  );
}

export default ContactUs;
