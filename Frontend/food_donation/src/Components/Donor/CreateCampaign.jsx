import { Field, Formik, Form } from "formik";
import CampaignSchema from "../../Components/YupSchemas/CampaignSchema";
import DonorSidebar from "./DonorSidebar";
import { useChange } from "../ContextAPIs/ChangeContext";

function CreateCampaign() {
  const { setIsChange } = useChange()
  return (
    <Formik
      initialValues={{
        title: "",
        foodType: "meals",
        amount: "",
        expiration: "",
        mealType: "vegetarian",
        location: "",
        phone: "", 
        description: "",
      }}
      onSubmit={async (values) => {
        try {
          const response = await fetch("http://localhost:5000/api/createCampaign", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            credentials: "include"
          });

          const data = await response.json()
          if (data.success) {
            alert('New campaign added successfully')
            setIsChange(true)
          } else {
            alert("Error during new campaign creation ", data.error);
          }
        } catch (error) {
          console.error("Error during new campaign creation:", err);
          alert("An error occurred during new campaign creation. Please try again.");
        }
      }}
      validationSchema={CampaignSchema}
    >
      {({ errors, touched }) => (
        <div className="flex">
          <DonorSidebar />
          <div className="w-[80%] absolute right-0">
            <div className="bg-green-800 text-white py-10">
              <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">
                  Create a Food Donation Campaign
                </h1>
                <p className="text-lg">
                  Start a campaign and help provide meals to those in need. It’s
                  easy, and you can make a huge impact!
                </p>
              </div>
            </div>

            <Form className="py-10 px-20">
              {/* Campaign Title */}
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-lg font-medium text-gray-700"
                >
                  Campaign Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter a title for your campaign"
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
                />
                {errors.title && touched.title ? (
                  <div className="text-red-600">{errors.title}</div>
                ) : null}
              </div>

              {/* Food Donation Type */}
              <div className="mb-6">
                <label
                  htmlFor="foodType"
                  className="block text-lg font-medium text-gray-700"
                >
                  Food Donation Type
                </label>
                <Field
                  as="select"
                  id="foodType"
                  name="foodType"
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
                >
                  <option value="meals">Meals</option>
                  <option value="packages">Food Packages</option>
                  <option value="grocery">Grocery Items</option>
                </Field>
                {errors.foodType && touched.foodType ? (
                  <div className="text-red-600">{errors.foodType}</div>
                ) : null}
              </div>

              {/* Amount of Meals */}
              <div className="mb-6">
                <label
                  htmlFor="amount"
                  className="block text-lg font-medium text-gray-700"
                >
                  Amount of Meals to Donate
                </label>
                <Field
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="How many meals would you like to donate?"
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
                />
                {errors.amount && touched.amount ? (
                  <div className="text-red-600">{errors.amount}</div>
                ) : null}
              </div>

              {/* Expiration Time */}
              <div className="mb-6">
                <label
                  htmlFor="expiration"
                  className="block text-lg font-medium text-gray-700"
                >
                  Expiration Time
                </label>
                <Field
                  id="expiration"
                  name="expiration"
                  type="datetime-local"
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
                />
                {errors.expiration && touched.expiration ? (
                  <div className="text-red-600">{errors.expiration}</div>
                ) : null}
              </div>

              {/* Meal Type */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Meal Type
                </label>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center">
                    <Field
                      id="vegetarian"
                      name="mealType"
                      type="radio"
                      value="vegetarian"
                      className="h-5 w-5 text-green-600 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">Vegetarian</span>
                  </div>
                  <div className="flex items-center">
                    <Field
                      id="non-vegetarian"
                      name="mealType"
                      type="radio"
                      value="non-vegetarian"
                      className="h-5 w-5 text-green-800 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">Non-Vegetarian</span>
                  </div>
                </div>
                {errors.mealType && touched.mealType ? (
                  <div className="text-red-600">{errors.mealType}</div>
                ) : null}
              </div>

              {/* Location */}
              <div className="mb-6">
                <label
                  htmlFor="location"
                  className="block text-lg font-medium text-gray-700"
                >
                  Location
                </label>
                <Field
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter location"
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
                />
                {errors.location && touched.location ? (
                  <div className="text-red-600">{errors.location}</div>
                ) : null}
              </div>

              {/* Phone Number */}
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-lg font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
                />
                {errors.phone && touched.phone ? (
                  <div className="text-red-600">{errors.phone}</div>
                ) : null}
              </div>

              {/* Description */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-lg font-medium text-gray-700"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter a description for your campaign"
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
                />
                {errors.description && touched.description ? (
                  <div className="text-red-600">{errors.description}</div>
                ) : null}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-800 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                  Create Campaign
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default CreateCampaign;
