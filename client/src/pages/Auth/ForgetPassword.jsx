import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import { useEffect, useState } from "react";
import BtnLoader from "../../Components/Common/btnLoader";
import * as Yup from "yup";
import StatusDialog from "../../components/Common/StatusDialog";

function ForgotPassword({ setIsForgot }) {
  const [submitted, setSubmitted] = useState(false);
  const [showForgetBox, setForgetBox] = useState(true);
  const [status, setStatus] = useState({
    show: false,
    success: true,
    message: "",
    error: "",
  });

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // Form submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:5000/api/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          show: true,
          success: true,
          message: "Password reset link has been sent.",
        })
        setSubmitted(true);
        setForgetBox(false);
      } else {
        await new Promise((res) => setTimeout(res, 1000));

        setStatus({
          show: true,
          success: false,
          message: data.error || "Failed to send reset link.",
        });
        setForgetBox(false);
      }
    } catch (err) {
      await new Promise((res) => setTimeout(res, 1000));
      
      setStatus({
        show: true,
        success: false,
        message: "Error while sent reset link.",
        error: err.message || String(err) || "An error occurred",
      });
      setForgetBox(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {status.show && (
        <StatusDialog
          message={status.message}
          success={status.success}
          error={status.error}
          onClose={() => {
            setStatus({ ...status, show: false });
            if (!status.success) {
              setForgetBox(true);
            } else {
              setIsForgot(false);
            }
          }}
        />
      )}
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>

      {/* Modal */}
      <div className="fixed md:inset-32 inset-6 flex justify-center items-start pt-8 z-20">
        {showForgetBox && (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid Email")
                .required("Email is Required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="bg-white shadow-2xl rounded-2xl md:p-10 px-5 py-10 w-92 z-20 relative">
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setIsForgot(false)}
                  className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>

                {/* Heading */}
                <h1 className="text-3xl text-center font-bold mb-6 text-green-800">
                  Forgot Password
                </h1>
                <p className="text-center text-gray-600 mb-8">
                  Enter your registered email address
                </p>

                {/* Conditional UI */}
                {!submitted ? (
                  <>
                    {/* Email Input */}
                    <div className="relative mb-6">
                      <i className="fa fa-envelope absolute left-3 top-4 text-gray-400"></i>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="block p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-600 text-sm">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* Submit Button with Spinner */}
                    <BtnLoader text="Submit" btnLoader={isSubmitting} />
                  </>
                ) : (
                  <p className="text-center text-green-600 font-bold">
                    ✅ Check your email for the reset link!
                  </p>
                )}
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
}

export default ForgotPassword;
