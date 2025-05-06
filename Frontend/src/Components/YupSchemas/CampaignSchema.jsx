import * as Yup from "yup";
const CampaignSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must be at most 100 characters long")
    .matches(
      /^[a-zA-Z0-9 ]*$/,
      "Title can only contain letters, numbers, and spaces"
    )
    .required("Title is required"),
  foodType: Yup.string().required("Food type is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .integer("Amount must be an integer"),
  expiration: Yup.date()
    .required("Expiration date is required")
    .min(new Date(), "Expiration date must be in the future"),
  mealType: Yup.string().required("Meal type is required"),
  location: Yup.string()
    .min(5, "Location must be at least 5 characters long")
    .required("Location is required"),
  phone: Yup.string()
    .matches(/^[0-9]{11}$/, "Invalid format")
    .required("Phone number is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description cannot be more than 500 characters")
    .required("Description is required"),
});

export default CampaignSchema;
