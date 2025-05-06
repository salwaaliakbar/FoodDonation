import * as Yup from "yup";

const ContactusSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, "FullName should be at least length 3")
    .max(50, "FullName should be at most length 50")
    .matches(/^[a-zA-Z\s]+$/, "FullName should only contain letters and spaces")
    .required("FullName is Required"),
  phone: Yup.string()
    .matches(/^[0-9]{11}$/, "Invalid format")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  message: Yup.string()
    .min(10, "Message should be at least 10 characters")
    .max(500, "Message should be at most 500 characters")
    .required("Message is required"),
});

export default ContactusSchema
