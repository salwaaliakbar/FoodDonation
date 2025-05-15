import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import ValidationSchema from "./YupSchemas/ValidationSchema";
import { useNavigate } from "react-router-dom";
import { useData } from "./ContextAPIs/UserContext";
import { useEffect } from "react";

function SignUpPage({ setIsLogin, setIsSignup }) {
  const navigate = useNavigate();
  const { setUser } = useData();

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
      <div className="fixed inset-0 flex justify-center items-center z-20 px-4 sm:px-6 lg:px-8">
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
          onSubmit={async (values) => {
            try {
              const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include",
              });

              const data = await response.json();
              if (data.success) {
                alert("Registration Successful");
                setIsSignup(false);
                setIsLogin(true);
                setUser(data.user);
                if (data.user.role === "donor") {
                  navigate("/donorDashBoard");
                } else {
                  navigate("/recipent");
                }
              } else {
                alert(data.error);
              }
            } catch (err) {
              console.error("Error during signup:", err);
              alert("An error occurred during signup. Please try again.");
            }
          }}
          validationSchema={ValidationSchema}
        >
          {({ errors, touched }) => (
            <Form className="bg-white shadow-2xl rounded-2xl w-full max-w-lg sm:max-w-xl lg:max-w-lg h-auto flex flex-col justify-between relative px-6 sm:px-8 py-4">
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                &times;
              </button>

              <div className="relative">
                <h1 className="text-3xl text-center font-bold mb-2 text-green-800 py-2">
                  Register Yourself
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 py-2">
                <div className="relative w-full sm:w-1/2">
                  <i className="fa fa-user absolute left-3 top-3 text-gray-400"></i>
                  <Field
                    name="fullname"
                    placeholder="Full Name"
                    className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  {errors.fullname && touched.fullname ? (
                    <div className="text-red-600 text-sm">
                      {errors.fullname}
                    </div>
                  ) : null}
                </div>

                <div className="relative w-full sm:w-1/2">
                  <i className="fa fa-envelope absolute left-3 top-3 text-gray-400"></i>
                  <Field
                    name="email"
                    placeholder="Email"
                    className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-600 text-sm">{errors.email}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 py-2">
                <div className="relative w-full sm:w-1/2">
                  <i className="fa fa-phone absolute left-3 top-3 text-gray-400"></i>
                  <Field
                    name="phone"
                    placeholder="Phone"
                    className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  {errors.phone && touched.phone ? (
                    <div className="text-red-600 text-sm">{errors.phone}</div>
                  ) : null}
                </div>

                <div className="relative w-full sm:w-1/2">
                  <i className="fa fa-building absolute left-3 top-3 text-gray-400"></i>
                  <Field
                    name="organization"
                    placeholder="Organization"
                    className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  {errors.organization && touched.organization ? (
                    <div className="text-red-600 text-sm">
                      {errors.organization}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="relative flex flex-col sm:flex-row items-start sm:items-center py-2">
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
              </div>
              {errors.role && touched.role ? (
                <div className="text-red-600 text-sm">{errors.role}</div>
              ) : null}

              <div className="relative py-2">
                <i className="fa fa-user-circle absolute left-3 top-5 text-gray-400"></i>
                <Field
                  name="username"
                  placeholder="Username"
                  className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.username && touched.username ? (
                  <div className="text-red-600 text-sm">{errors.username}</div>
                ) : null}
              </div>

              <div className="relative py-2">
                <i className="fa fa-lock absolute left-3 top-5 text-gray-400"></i>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-600 text-sm">{errors.password}</div>
                ) : null}
              </div>

              <div className="relative py-2">
                <i className="fa fa-lock absolute left-3 top-5 text-gray-400"></i>
                <Field
                  name="confrimPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="block p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.confrimPassword && touched.confrimPassword ? (
                  <div className="text-red-600 text-sm">
                    {errors.confrimPassword}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 my-2 px-4 rounded-md w-full transition duration-300"
              >
                Register
              </button>

              <div className="text-center m-2">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <span
                    href="#"
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
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SignUpPage;
