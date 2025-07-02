import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import ResetSchema from "../../yupschemas/ResetSchema";
import React from "react";
import BtnLoader from "../../Components/Common/btnLoader";
import StatusDialog from "../../components/Common/StatusDialog";

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
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>

      {/* Reset password form */}
      <div className="fixed md:inset-20 inset-6 flex justify-center items-start pt-8 z-20">
        {showResetBox && (
          <Formik
            initialValues={{
              password: "",
              confrimPassword: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await fetch(
                  `http://localhost:5000/api/resetPassword/${id}/${token}`,
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
                  console.log("Password reset successful. You can now log in.");
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
                    console.log(
                      "This link has expired. Please request a new one."
                    );
                    setResetBox(false);
                    return;
                  }
                  setStatus({
                    show: true,
                    success: false,
                    message: data.error || "Invalid or expired token.",
                  });
                  console.log(data.error || "Invalid or expired token.");
                }
              } catch (error) {
                await new Promise((res) => setTimeout(res, 1000));
                setSubmitting(false);

                console.log("Error during reset. Try again later.");
                setStatus({
                  show: true,
                  success: false,
                  message: "Error during reset.",
                  error: err || "An error occurred",
                });
                setResetBox(false);
              } finally {
                setSubmitting(false);
              }
            }}
            validationSchema={ResetSchema}
          >
            {({ errors, touched, isSubmitting }) => (
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
                    <div className="text-red-600 text-sm">
                      {errors.password}
                    </div>
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
                    <div className="text-red-600 text-sm">
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
