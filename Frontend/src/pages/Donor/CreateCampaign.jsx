import { Field, Formik, Form } from "formik";
import CampaignSchema from "../../yupschemas/CampaignSchema";
import { useSecureFetch } from "../../customHooks/useSecureFetch";
import { useChange } from "../../Context/ChangeContext";

function CreateCampaign() {
  const { setActiveMeals } = useChange();
  const secureFetch = useSecureFetch();

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
          const data = await secureFetch(
            "http://localhost:5000/api/createCampaign",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
              credentials: "include",
            }
          );

          if (data.success) {
            alert("New campaign added successfully");
            setActiveMeals((prev) => [data.newCampaign, ...prev]);
          } else {
            alert(data.error || "Failed to add new campaign.");
          }
        } catch (error) {
          console.error("Error during new campaign creation:", error);
          alert(
            "An error occurred during new campaign creation. Please try again."
          );
        }
      }}
      validationSchema={CampaignSchema}
    >
      {({ errors, touched }) => (
        <div className="w-full min-h-screen bg-gray-200 overflow-x-hidden">
          {/* Fixed Header */}
          <div className="bg-green-800 text-white py-10 pl-12 w-full z-40 shadow-md">
            <div className="max-w-5xl mx-auto text-center px-4">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Create a Food Donation Campaign
              </h1>
              <p className="text-base sm:text-lg">
                Start a campaign and help provide meals to those in need. It’s
                easy, and you can make a huge impact!
              </p>
            </div>
          </div>

          {/* Form Container with top padding to avoid overlap */}
          <div className="pt-4 px-4 sm:px-8 max-w-4xl mx-auto my-4 mb-15">
            <Form className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              {/* Title */}
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
                {errors.title && touched.title && (
                  <div className="text-red-600">{errors.title}</div>
                )}
              </div>

              {/* Food Type */}
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
                  <option value="Meals">Meals</option>
                  <option value="Food packages">Food Packages</option>
                  <option value="Grocery Items">Grocery Items</option>
                </Field>
                {errors.foodType && touched.foodType && (
                  <div className="text-red-600">{errors.foodType}</div>
                )}
              </div>

              {/* Amount */}
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
                {errors.amount && touched.amount && (
                  <div className="text-red-600">{errors.amount}</div>
                )}
              </div>

              {/* Expiration */}
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
                {errors.expiration && touched.expiration && (
                  <div className="text-red-600">{errors.expiration}</div>
                )}
              </div>

              {/* Meal Type Radio */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Meal Type
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <Field
                      id="vegetarian"
                      name="mealType"
                      type="radio"
                      value="vegetarian"
                      className="h-5 w-5 text-green-600"
                    />
                    <label htmlFor="vegetarian" className="ml-2 text-gray-700">
                      Vegetarian
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Field
                      id="non-vegetarian"
                      name="mealType"
                      type="radio"
                      value="non-vegetarian"
                      className="h-5 w-5 text-green-800"
                    />
                    <label
                      htmlFor="non-vegetarian"
                      className="ml-2 text-gray-700"
                    >
                      Non-Vegetarian
                    </label>
                  </div>
                </div>
                {errors.mealType && touched.mealType && (
                  <div className="text-red-600">{errors.mealType}</div>
                )}
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
                {errors.location && touched.location && (
                  <div className="text-red-600">{errors.location}</div>
                )}
              </div>

              {/* Phone */}
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
                {errors.phone && touched.phone && (
                  <div className="text-red-600">{errors.phone}</div>
                )}
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
                  rows={4}
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md resize-none"
                />
                {errors.description && touched.description && (
                  <div className="text-red-600">{errors.description}</div>
                )}
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
