import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import ResetSchema from "../../yupschemas/ResetSchema";
import React from "react";
import BtnLoader from "../../components/Common/BtnLoader";
import StatusDialog from "../../components/Common/StatusDialog";
import { useState } from "react";
import { API_BASE_URL } from "../../config/api";

function ResetPassword() {
  const { id, token } = useParams(); // Get ID and token from URL
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showResetBox, setResetBox] = useState(true);
  const [status, setStatus] = useState({
    show: false,
    success: true,
    message: "",
    error: "",
  });

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
              setResetBox(true);
            } else {
              navigate("/");
            }
          }}
        />
      )}
      {/* Reset password page */}
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-12">
        {showResetBox && (
          <Formik
            initialValues={{
              password: "",
              confrimPassword: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await fetch(
                  `${API_BASE_URL}/api/resetPassword/${id}/${token}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify(values),
                  }
                );

                const data = await response.json();

                if (data.success) {
                  await new Promise((res) => setTimeout(res, 1000));

                  setStatus({
                    show: true,
                    success: true,
                    message: "Password reset successfull.",
                  });
                  setResetBox(false);
                } else {
                  await new Promise((res) => setTimeout(res, 1000));

                  if (
                    data.code === "INVALID_TOKEN" ||
                    data.error?.includes("expired")
                  ) {
                    setStatus({
                      show: true,
                      success: false,
                      message:
                        data.error ||
                        "Link has expired. Plz request a new one.",
                    });
                    setResetBox(false);
                    return;
                  }
                  setStatus({
                    show: true,
                    success: false,
                    message: data.error || "Invalid or expired token.",
                  });
                }
              } catch (err) {
                await new Promise((res) => setTimeout(res, 1000));
                setSubmitting(false);

                setStatus({
                  show: true,
                  success: false,
                  message: "Error during reset.",
                  error: err.message || String(err) || "An error occurred",
                });
                setResetBox(false);
              } finally {
                setSubmitting(false);
              }
            }}
            validationSchema={ResetSchema}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto relative">
                <h1 className="text-2xl text-center font-extrabold mb-1 text-stone-900">
                  Reset Password
                </h1>
                <p className="text-center text-stone-600 mb-8">
                  Enter and confirm your new password
                </p>

                {/* Password field */}
                <div className="relative mb-4">
                  <i className="fa fa-lock absolute left-3.5 top-3.5 text-stone-400"></i>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full rounded-xl border border-stone-300 pl-10 pr-10 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition placeholder:text-stone-400"
                  />
                  <span
                    className="absolute right-3.5 top-3.5 cursor-pointer text-stone-400 hover:text-stone-600 transition-colors"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={0}
                    role="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </span>
                  {errors.password && touched.password && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Confirm password field */}
                <div className="relative mb-6">
                  <i className="fa fa-lock absolute left-3.5 top-3.5 text-stone-400"></i>
                  <Field
                    name="confrimPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full rounded-xl border border-stone-300 pl-10 pr-10 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition placeholder:text-stone-400"
                  />
                  <span
                    className="absolute right-3.5 top-3.5 cursor-pointer text-stone-400 hover:text-stone-600 transition-colors"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    tabIndex={0}
                    role="button"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    <i
                      className={`fa ${
                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </span>
                  {errors.confrimPassword && touched.confrimPassword && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.confrimPassword}
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <BtnLoader text={"Reset Password"} btnLoader={isSubmitting} />
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
}

export default ResetPassword;
