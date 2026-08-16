import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import { useEffect, useState } from "react";
import BtnLoader from "../../components/Common/BtnLoader";
import * as Yup from "yup";
import StatusDialog from "../../components/Common/StatusDialog";
import { createPortal } from "react-dom";
import { API_BASE_URL } from "../../config/api";

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
      const response = await fetch(`${API_BASE_URL}/api/forgotPassword`, {
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

  return createPortal(
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
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
        onClick={() => setIsForgot(false)}
      ></div>

      {/* Modal wrapper */}
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4 sm:p-6 z-[110]">
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
              <Form className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto relative my-auto">
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setIsForgot(false)}
                  className="absolute top-4 right-4 text-2xl leading-none text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  &times;
                </button>

                {/* Heading */}
                <h1 className="text-2xl text-center font-extrabold mb-1 text-stone-900">
                  Forgot Password
                </h1>
                <p className="text-center text-stone-600 mb-8">
                  Enter your registered email address
                </p>

                {/* Conditional UI */}
                {!submitted ? (
                  <>
                    {/* Email Input */}
                    <div className="relative mb-6">
                      <i className="fa fa-envelope absolute left-3.5 top-3.5 text-stone-400"></i>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-xl border border-stone-300 pl-10 pr-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition placeholder:text-stone-400"
                        required
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-600 text-sm mt-1">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* Submit Button with Spinner */}
                    <BtnLoader text="Submit" btnLoader={isSubmitting} />
                  </>
                ) : (
                  <p className="text-center text-brand-700 font-semibold">
                    Check your email for the reset link!
                  </p>
                )}
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>,
    document.body,
  );
}

export default ForgotPassword;
