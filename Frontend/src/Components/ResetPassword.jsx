import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import ResetSchema from "./YupSchemas/ResetSchema";

function ResetPassword() {
  const { id, token } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
      <div className="fixed md:inset-20 inset-6 flex justify-center items-start pt-8 z-20">
        <Formik
          initialValues={{
            password: "",
            confrimPassword: "",
          }}
          onSubmit={async (values) => {
            console.log("onsubmit");
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
                alert("Error",data.error || "Invalid or expired token.");
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

              {/* Password Field */}
              <div className="relative mb-4">
                <i className="fa fa-lock absolute left-3 top-4 text-gray-400"></i>
                <Field
                  name="password"
                  type="password"
                  placeholder="New Password"
                  className="block p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-600 text-sm">{errors.password}</div>
                ) : null}
              </div>

              {/* Confirm Password Field */}
              <div className="relative mb-6">
                <i className="fa fa-lock absolute left-3 top-4 text-gray-400"></i>
                <Field
                  name="confrimPassword"
                  type="password"
                  placeholder="confrimPassword"
                  className="block p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.confrimPassword && touched.confrimPassword ? (
                  <div className="text-red-600 text-sm">
                    {errors.confrimPassword}
                  </div>
                ) : null}
              </div>

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
