import * as Yup from "yup";

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),

  confrimPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confrim password must match with password")
    .required("Confirm password is required"),
});

export default ResetSchema
