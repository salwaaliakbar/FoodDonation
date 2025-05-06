import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from 'react-router-dom';
import { useData } from "./ContextAPIs/UserContext";

function Login({ setIsLogin, setIsSignup }) {
  const navigate = useNavigate()
  const { user, setUser } = useData()
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
      <div className="fixed inset-12 flex justify-center items-start pt-8 z-20">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values) => {
            // Perform login logic here
            try {
              const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include"
              });

              const data = await response.json();
              if (data.success) {
                alert("Login successful!");
                setIsLogin(false);
                setIsSignup(false);

                // set login user data into context
                setUser(data.user)

                console.log(data.token)
                if (data.user.role === "donor") {
                  navigate("/donorDashBoard");
                } else {
                  navigate("/recipent");
                }
              } else {
                alert(data.error);
              }
            } catch (err) {
              console.error("Error during login:", err);
              alert("An error occurred during login. Please try again.");
            }
          }}
        >
          {() => (
            <Form className="bg-white shadow-2xl rounded-2xl p-10 w-96 z-20 relative">
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>

              <h1 className="text-4xl text-center font-bold mb-6 text-green-800">
                Welcome Back
              </h1>
              <p className="text-center text-gray-600 mb-8">
                Please login to your account
              </p>

              <div className="relative mb-4">
                <i className="fa fa-user absolute left-3 top-4 text-gray-400"></i>
                <Field
                  name="username"
                  placeholder="Username"
                  className="block p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="relative mb-6">
                <i className="fa fa-lock absolute left-3 top-4 text-gray-400"></i>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="block p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <button
                type="submit"
                className="bg-green-800 hover:bg-green-600 text-white cursor-pointer font-bold py-2 px-4 rounded-lg w-full transition duration-300 delay-75"
              >
                Login
              </button>

              <div className="text-center mt-4">
                <a href="#" className="text-green-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <span
                    className="text-green-800 hover:underline font-bold cursor-pointer"
                    onClick={() => {
                      setIsSignup(true);
                      setIsLogin(false);
                    }}
                  >
                    Sign Up
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

export default Login;
