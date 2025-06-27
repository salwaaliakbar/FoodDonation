import { Field, Formik, Form } from "formik";
import CampaignSchema from "../../yupschemas/CampaignSchema";
import { useSecureFetch } from "../../customHooks/useSecureFetch";
import { useChange } from "../../Context/ChangeContext";
import BtnLoader from "../../Components/Common/btnLoader";

function CreateCampaign() {
  const { setActiveMeals } = useChange();
  const secureFetch = useSecureFetch();

  return (
    <>
      <h1 className=" text-3xl font-bold text-green-800 text-center mt-28 font-[Poppins]">
        Create a Food Donation Campaign
      </h1>
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
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const data = await secureFetch(
              "http://localhost:5000/api/createCampaign",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }
            );

            if (data.success) {
              await new Promise((res) => setTimeout(res, 1000));
              setSubmitting(false);

              setTimeout(() => {
                alert("New campaign added successfully");
                setActiveMeals((prev) => [data.newCampaign, ...prev]);

                // Scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" });
                // Reset form fields
                resetForm();
              }, 100);
            } else {
              await new Promise((res) => setTimeout(res, 1000));
              setSubmitting(false);
              setTimeout(() => {
                alert(data.error || "Failed to add new campaign.");
              }, 100);
            }
          } catch (error) {
            setSubmitting(false);

            setTimeout(() => {
              console.error("Error during new campaign creation:", error);
              alert(
                "An error occurred during new campaign creation. Please try again."
              );
            }, 100);
          }
        }}
        validationSchema={CampaignSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <div className="w-full min-h-screen bg-gray-200 overflow-x-hidden font-[Montserrat]">
            {/* Form Container with top padding to avoid overlap */}
            <div className=" pt-4 px-4 sm:px-8 max-w-4xl mx-auto my-4 mb-15">
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
                      <label
                        htmlFor="vegetarian"
                        className="ml-2 text-gray-700"
                      >
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
                  <BtnLoader
                    text={"Create campaign"}
                    btnLoader={isSubmitting}
                  />
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default CreateCampaign;
