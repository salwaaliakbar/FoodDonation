import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import ValidationSchema from "../../yupschemas/ValidationSchema";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/UserContext";
import { useEffect } from "react";
import { useState } from "react";
import BtnLoader from "../../components/Common/BtnLoader";
import StatusDialog from "../../components/Common/StatusDialog";
import { createPortal } from "react-dom";
import { API_BASE_URL } from "../../config/api";

function SignUpPage({ setIsLogin, setIsSignup }) {
  const navigate = useNavigate();
  const { user, setUser } = useData(); // Set user data in context
  const [showSignupbox, setSignupBox] = useState(true);
  const [status, setStatus] = useState({
    show: false,
    success: true,
    message: "",
    error: "",
  });

  useEffect(() => {
    document.body.classList.add("overflow-hidden"); // Prevent scrolling on open
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password

  return createPortal(
    <>
      {status.show && (
        <StatusDialog
          message={status.message}
          success={status.success}
          error={status.error}
          onClose={() => {
            setStatus({ ...status, show: false });
            if (status.success) {
              // Redirect user based on their role
              if (user.role === "donor") {
                navigate("/donorDashBoard");
              } else if (user.role === "recipient") {
                navigate("/recipent");
              }
              setIsLogin(false);
              setIsSignup(false);
            } else {
              setSignupBox(true);
            }
          }}
        />
      )}
      {/* Dark overlay background */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
        onClick={() => setIsSignup(false)}
      ></div>

      {/* Signup form container */}
      <main className="fixed inset-0 flex justify-center items-center z-[110] px-4 sm:px-6 lg:px-8 overflow-y-auto py-8">
        {showSignupbox && (
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              phone: "",
              organization: "",
              role: "",
              username: "",
              password: "",
              confrimPassword: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await fetch(
                  `${API_BASE_URL}/api/signup`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify(values),
                    credentials: "include",
                  }
                );

                const data = await response.json();
                if (data.success) {
                  await new Promise((res) => setTimeout(res, 1000));

                  setStatus({
                    show: true,
                    success: true,
                    message: "Registration Successfull.",
                  });
                  setUser(data.userData);
                  setSignupBox(false);
                } else {
                  await new Promise((res) => setTimeout(res, 1000));

                  setStatus({
                    show: true,
                    success: false,
                    message: data.error || "Failed to registration.",
                  });
                  setSignupBox(false);
                }
              } catch (err) {
                await new Promise((res) => setTimeout(res, 1000));

                setStatus({
                  show: true,
                  success: false,
                  message: "Error during registration.",
                  error: err.message || String(err) || "An error occurred",
                });
                setSignupBox(false);
              } finally {
                setSubmitting(false);
              }
            }}
            validationSchema={ValidationSchema}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="bg-white shadow-2xl rounded-2xl w-full max-w-lg sm:max-w-xl lg:max-w-lg h-auto flex flex-col justify-between relative px-6 sm:px-8 py-8 my-auto">
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setIsSignup(false)}
                  className="absolute top-4 right-4 text-2xl leading-none text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  &times;
                </button>

                {/* Title */}
                <header className="relative">
                  <h1 className="text-2xl text-center font-extrabold mb-4 text-stone-900">
                    Register Yourself
                  </h1>
                </header>

                {/* Name and email fields */}
                <section className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 py-2">
                  <div className="relative w-full sm:w-1/2">
                    <i className="fa fa-user absolute left-3.5 top-3 text-stone-400"></i>
                    <Field
                      name="fullname"
                      placeholder="Full Name"
                      className="w-full rounded-xl border border-stone-300 pl-10 pr-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition placeholder:text-stone-400"
                    />
                    {errors.fullname && touched.fullname && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.fullname}
                      </div>
                    )}
                  </div>
                  <div className="relative w-full sm:w-1/2">
                    <i className="fa fa-envelope absolute left-3.5 top-3 text-stone-400"></i>
                    <Field
                      name="email"
                      placeholder="Email"
                      className="w-full rounded-xl border border-stone-300 pl-10 pr-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition placeholder:text-stone-400"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-600 text-sm mt-1">{errors.email}</div>
                    )}
                  </div>
                </section>

                {/* Phone and organization fields */}
                <section className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 py-2">
                  <div className="relative w-full sm:w-1/2">
                    <i className="fa fa-phone absolute left-3.5 top-3 text-stone-400"></i>
                    <Field
                      name="phone"
                      placeholder="Phone"
                      className="w-full rounded-xl border border-stone-300 pl-10 pr-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition placeholder:text-stone-400"
                    />
                    {errors.phone && touched.phone && (
                      <div className="text-red-600 text-sm mt-1">{errors.phone}</div>
                    )}
                  </div>
                  <div className="relative w-full sm:w-1/2">
                    <i className="fa fa-building absolute left-3.5 top-3 text-stone-400"></i>
                    <Field
                      name="organization"
                      placeholder="Organization"
                      className="w-full rounded-xl border border-stone-300 pl-10 pr-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition placeholder:text-stone-400"
                    />
                    {errors.organization && touched.organization && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.organization}
                      </div>
                    )}
                  </div>
                </section>

                {/* Role radio buttons */}
                <section className="relative flex flex-col sm:flex-row items-start sm:items-center py-2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2 sm:mb-0 sm:mr-4">
                    Role
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <Field
                        type="radio"
                        name="role"
                        value="donor"
                        className="mr-2 cursor-pointer accent-brand-700"
                      />
                      <span className="text-stone-700">Donor</span>
                    </div>
                    <div className="flex items-center">
                      <Field
                        type="radio"
                        name="role"
                        value="recipient"
                        className="mr-2 cursor-pointer accent-brand-700"
                      />
                      <span className="text-stone-700">Recipient</span>
                    </div>
                  </div>
                </section>
                {errors.role && touched.role && (
                  <div className="text-red-600 text-sm mt-1">{errors.role}</div>
                )}

                {/* Username field */}
                <section className="relative py-2">
                  <i className="fa fa-user-circle absolute left-3.5 top-5 text-stone-400"></i>
                  <Field
                    name="username"
                    placeholder="Username"
                    className="w-full rounded-xl border border-stone-300 pl-10 pr-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition placeholder:text-stone-400"
                  />
                  {errors.username && touched.username && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.username}
                    </div>
                  )}
                </section>

                {/* Password field */}
                <section className="relative py-2">
                  <i className="fa fa-lock absolute left-3.5 top-5 text-stone-400"></i>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full rounded-xl border border-stone-300 pl-10 pr-10 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition placeholder:text-stone-400"
                  />
                  <span
                    className="absolute right-3.5 top-5 text-stone-400 hover:text-stone-600 cursor-pointer transition-colors"
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
                </section>

                {/* Confirm password field */}
                <section className="relative py-2">
                  <i className="fa fa-lock absolute left-3.5 top-5 text-stone-400"></i>
                  <Field
                    name="confrimPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full rounded-xl border border-stone-300 pl-10 pr-10 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition placeholder:text-stone-400"
                  />
                  <span
                    className="absolute right-3.5 top-5 text-stone-400 hover:text-stone-600 cursor-pointer transition-colors"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    tabIndex={0}
                    role="button"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
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
                </section>

                {/* Submit and redirect to login */}
                <section className="pt-2">
                  <BtnLoader text={"Register"} btnLoader={isSubmitting} />

                  <div className="text-center mt-4">
                    <p className="text-stone-600">
                      Already have an account?{" "}
                      <span
                        className="text-brand-700 hover:text-brand-800 hover:underline font-semibold cursor-pointer"
                        onClick={() => {
                          setIsSignup(false);
                          setIsLogin(true);
                        }}
                      >
                        LogIn
                      </span>
                    </p>
                  </div>
                </section>
              </Form>
            )}
          </Formik>
        )}
      </main>
    </>,
    document.body,
  );
}

export default SignUpPage;
