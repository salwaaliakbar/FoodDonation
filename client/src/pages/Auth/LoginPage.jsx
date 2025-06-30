import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useData } from "../../context/UserContext";
import BtnLoader from "../../Components/Common/btnLoader";
import { flushSync } from "react-dom";

function Login({ setIsLogin, setIsSignup, setIsForgot }) {
  const navigate = useNavigate();
  const { setUser } = useData();
  const [showPassword, setShowPassword] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>

      {/* Modal wrapper */}
      <div className="fixed md:inset-12 inset-6 flex justify-center items-start pt-8 z-20">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify(values),
                credentials: "include",
              });

              const data = await response.json();

              if (data.success) {
                await new Promise((res) => setTimeout(res, 1000));
                setSubmitting(false);

                setTimeout(() => {
                  alert("Login successful!");
                  setIsLogin(false);
                  setIsSignup(false);
                  setUser(data.userData); // Store user in context

                  // Redirect user based on their role
                  if (data.userData.role === "donor") {
                    navigate("/donorDashBoard");
                  } else {
                    navigate("/recipent");
                  }
                }, 100);
              } else {
                await new Promise((res) => setTimeout(res, 1000));
                setSubmitting(false);

                setTimeout(() => {
                  alert(data.error || "Failed to login."); // Show error from server
                }, 100);
              }
            } catch (err) {
              await new Promise((res) => setTimeout(res, 1000));
              setSubmitting(false);
              
              setTimeout(() => {
                console.error("Error during login:", err);
                alert("An error occurred during login. Please try again.");
              }, 100);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-2xl rounded-2xl md:p-10 px-5 py-10 w-92 z-20 relative">
              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-gray-800"
                aria-label="Close login form"
              >
                &times;
              </button>

              {/* Header */}
              <header>
                <h1 className="text-4xl text-center font-bold mb-6 text-green-800">
                  Welcome Back
                </h1>
                <p className="text-center text-gray-600 mb-8">
                  Please login to your account
                </p>
              </header>

              {/* Username field */}
              <div className="relative mb-4">
                <i className="fa fa-user absolute left-3 top-4 text-gray-400"></i>
                <Field
                  name="username"
                  placeholder="Username"
                  className="block p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              {/* Password field with toggle */}
              <div className="relative mb-6">
                <i className="fa fa-lock absolute left-3 top-4 text-gray-400"></i>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="block p-3 pl-10 pr-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <span
                  className="absolute right-3 top-4 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={0}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  role="button"
                >
                  <i
                    className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </span>
              </div>

              {/* Submit button */}
              <BtnLoader text={"Login"} btnLoader={isSubmitting} />

              {/* Forgot password link */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-green-800 hover:underline hover:text-green-600 cursor-pointer bg-transparent border-none p-0 font-medium"
                  onClick={() => {
                    setIsForgot(true);
                    setIsLogin(false);
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign-up link */}
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-green-800 hover:underline font-bold cursor-pointer bg-transparent border-none p-0"
                    onClick={() => {
                      setIsSignup(true);
                      setIsLogin(false);
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login;
