import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import ResetSchema from "../../yupschemas/ResetSchema";
import React from "react";

function ResetPassword() {
  const { id, token } = useParams(); // Get ID and token from URL
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>

      {/* Reset password form */}
      <div className="fixed md:inset-20 inset-6 flex justify-center items-start pt-8 z-20">
        <Formik
          initialValues={{
            password: "",
            confrimPassword: "", // Typo retained as requested
          }}
          onSubmit={async (values) => {
            try {
              const response = await fetch(
                `http://localhost:5000/api/resetPassword/${id}/${token}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                }
              );

              const data = await response.json();

              if (data.success) {
                alert("Password reset successful. You can now log in.");
                setTimeout(() => navigate("/"), 2000);
              } else {
                alert(data.error || "Invalid or expired token.");
              }
            } catch (error) {
              alert("Something went wrong. Try again later.");
              console.error("Reset error:", error);
            }
          }}
          validationSchema={ResetSchema}
        >
          {({ errors, touched }) => (
            <Form className="bg-white shadow-2xl rounded-2xl md:p-10 px-5 py-10 w-92 z-20 relative">
              <h1 className="text-3xl text-center font-bold mb-6 text-green-800">
                Reset Password
              </h1>
              <p className="text-center text-gray-600 mb-8">
                Enter and confirm your new password
              </p>

              {/* Password field */}
              <div className="relative mb-4">
                <i className="fa fa-lock absolute left-3 top-4 text-gray-400"></i>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="block p-3 pl-10 pr-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <span
                  className="absolute right-3 top-4 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={0}
                  role="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
                {errors.password && touched.password && (
                  <div className="text-red-600 text-sm">{errors.password}</div>
                )}
              </div>

              {/* Confirm password field */}
              <div className="relative mb-6">
                <i className="fa fa-lock absolute left-3 top-4 text-gray-400"></i>
                <Field
                  name="confrimPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="confrimPassword"
                  className="block p-3 pl-10 pr-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <span
                  className="absolute right-3 top-4 cursor-pointer text-gray-400"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={0}
                  role="button"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
                {errors.confrimPassword && touched.confrimPassword && (
                  <div className="text-red-600 text-sm">{errors.confrimPassword}</div>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="bg-green-800 hover:bg-green-600 text-white cursor-pointer font-bold py-2 px-4 rounded-lg w-full transition duration-300 delay-75"
              >
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default ResetPassword;
