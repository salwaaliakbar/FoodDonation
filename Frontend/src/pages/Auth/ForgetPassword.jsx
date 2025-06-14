import { Formik, Form, Field } from "formik";
import "font-awesome/css/font-awesome.min.css";
import { useEffect, useState } from "react";

function ForgotPassword({ setIsForgot }) {
    const [submitted, setSubmitted] = useState(false);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    // Handle form submission
    const handleSubmit = async (values) => {
        try {
            const response = await fetch("http://localhost:5000/api/forgotPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (data.success) {
                alert("Password reset link has been sent!");
                setSubmitted(true);
            } else {
                alert(data.error || "Failed to send reset link.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            {/* Backdrop overlay */}
            <div className="fixed inset-0 bg-black opacity-60 z-10"></div>

            {/* Modal content */}
            <div className="fixed md:inset-32 inset-6 flex justify-center items-start pt-8 z-20">
                <Formik
                    initialValues={{ email: "" }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="bg-white shadow-2xl rounded-2xl md:p-10 px-5 py-10 w-92 z-20 relative">
                            
                            {/* Close button */}
                            <button
                                type="button"
                                onClick={() => setIsForgot(false)}
                                className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-gray-800"
                            >
                                &times;
                            </button>

                            {/* Title and subtitle */}
                            <h1 className="text-3xl text-center font-bold mb-6 text-green-800">
                                Forgot Password
                            </h1>
                            <p className="text-center text-gray-600 mb-8">
                                Enter your registered email address
                            </p>

                            {/* Email input and submit */}
                            {!submitted ? (
                                <>
                                    <div className="relative mb-6">
                                        <i className="fa fa-envelope absolute left-3 top-4 text-gray-400"></i>
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            className="block p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-green-800 text-white py-2 px-4 rounded-lg w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                                    >
                                        Submit
                                    </button>
                                </>
                            ) : (
                                // Message shown after successful submission
                                <p className="text-center text-green-600 font-bold">
                                    Check your email for the reset link!
                                </p>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default ForgotPassword;
