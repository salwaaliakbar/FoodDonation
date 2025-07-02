import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import ValidationSchema from "../../yupschemas/ValidationSchema";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/UserContext";
import { useEffect } from "react";
import { useState } from "react";
import BtnLoader from "../../Components/Common/btnLoader";
import StatusDialog from "../../components/Common/StatusDialog";

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

  return (
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
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>

      {/* Signup form container */}
      <main className="fixed inset-0 flex justify-center items-center z-20 px-4 sm:px-6 lg:px-8">
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
                  "http://localhost:5000/api/signup",
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
                  console.log("Registration Successful");
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
                  console.log(data.error || "Failed to signup."); // Show error from server
                }
              } catch (err) {
                await new Promise((res) => setTimeout(res, 1000));

                console.error("Error during signup:", err);
                setStatus({
                  show: true,
                  success: false,
                  message: "Error during registration.",
                  error: err || "An error occurred",
                });
                setSignupBox(false);
              } finally {
                setSubmitting(false);
              }
            }}
            validationSchema={ValidationSchema}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="bg-white shadow-2xl rounded-2xl w-full max-w-lg sm:max-w-xl lg:max-w-lg h-auto flex flex-col justify-between relative px-6 sm:px-8 py-4">
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setIsSignup(false)}
                  className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-gray-800 cursor-pointer"
                  aria-label="Close"
                >
                  &times;
                </button>

                {/* Title */}
                <header className="relative">
                  <h1 className="text-3xl text-center font-bold mb-2 text-green-800 py-2">
                    Register Yourself
                  </h1>
                </header>

                {/* Name and email fields */}
                <section className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 py-2">
                  <div className="relative w-full sm:w-1/2">
                    <i className="fa fa-user absolute left-3 top-3 text-gray-400"></i>
                    <Field
                      name="fullname"
                      placeholder="Full Name"
                      className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.fullname && touched.fullname && (
                      <div className="text-red-600 text-sm">
                        {errors.fullname}
                      </div>
                    )}
                  </div>
                  <div className="relative w-full sm:w-1/2">
                    <i className="fa fa-envelope absolute left-3 top-3 text-gray-400"></i>
                    <Field
                      name="email"
                      placeholder="Email"
                      className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-600 text-sm">{errors.email}</div>
                    )}
                  </div>
                </section>

                {/* Phone and organization fields */}
                <section className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 py-2">
                  <div className="relative w-full sm:w-1/2">
                    <i className="fa fa-phone absolute left-3 top-3 text-gray-400"></i>
                    <Field
                      name="phone"
                      placeholder="Phone"
                      className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.phone && touched.phone && (
                      <div className="text-red-600 text-sm">{errors.phone}</div>
                    )}
                  </div>
                  <div className="relative w-full sm:w-1/2">
                    <i className="fa fa-building absolute left-3 top-3 text-gray-400"></i>
                    <Field
                      name="organization"
                      placeholder="Organization"
                      className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.organization && touched.organization && (
                      <div className="text-red-600 text-sm">
                        {errors.organization}
                      </div>
                    )}
                  </div>
                </section>

                {/* Role radio buttons */}
                <section className="relative flex flex-col sm:flex-row items-start sm:items-center py-2">
                  <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:mr-4">
                    Role
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <Field
                        type="radio"
                        name="role"
                        value="donor"
                        className="mr-2 cursor-pointer"
                      />
                      <span>Donor</span>
                    </div>
                    <div className="flex items-center">
                      <Field
                        type="radio"
                        name="role"
                        value="recipient"
                        className="mr-2 cursor-pointer"
                      />
                      <span>Recipient</span>
                    </div>
                  </div>
                </section>
                {errors.role && touched.role && (
                  <div className="text-red-600 text-sm">{errors.role}</div>
                )}

                {/* Username field */}
                <section className="relative py-2">
                  <i className="fa fa-user-circle absolute left-3 top-5 text-gray-400"></i>
                  <Field
                    name="username"
                    placeholder="Username"
                    className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  {errors.username && touched.username && (
                    <div className="text-red-600 text-sm">
                      {errors.username}
                    </div>
                  )}
                </section>

                {/* Password field */}
                <section className="relative py-2">
                  <i className="fa fa-lock absolute left-3 top-5 text-gray-400"></i>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600 pr-10"
                  />
                  <span
                    className="absolute right-3 top-5 text-gray-400 cursor-pointer"
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
                </section>

                {/* Confirm password field */}
                <section className="relative py-2">
                  <i className="fa fa-lock absolute left-3 top-5 text-gray-400"></i>
                  <Field
                    name="confrimPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600 pr-10"
                  />
                  <span
                    className="absolute right-3 top-5 text-gray-400 cursor-pointer"
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
                    <div className="text-red-600 text-sm">
                      {errors.confrimPassword}
                    </div>
                  )}
                </section>

                {/* Submit and redirect to login */}
                <section>
                  <BtnLoader text={"Register"} btnLoader={isSubmitting} />

                  <div className="text-center m-2">
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <span
                        className="text-green-800 hover:underline font-bold cursor-pointer"
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
    </>
  );
}

export default SignUpPage;
