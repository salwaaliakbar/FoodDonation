// Importing necessary hooks, components, and icons
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Navbar from "../../Components/Navbar/NavBar";
import Footer from "../../Components/Footer/Footer";

// Individual FAQ item with toggle functionality
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-4 cursor-pointer">
      <div onClick={() => setOpen(!open)} className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        {open ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
        )}
      </div>
      {open && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

// FAQ page section layout with a list of common questions
const FAQSection = () => {
  const faqs = [
    {
      question: "How can I donate food through this app?",
      answer:
        "You can register as a donor, post available meals, and nearby recipients will be notified to claim them.",
    },
    {
      question: "Is the food delivery handled by the app?",
      answer:
        "No, our platform connects donors and recipients. Delivery must be arranged directly between both parties.",
    },
    {
      question: "Is it free to use this service?",
      answer:
        "Yes! The app is completely free for both donors and recipients.",
    },
    {
      question: "Can I donate leftover or home-cooked food?",
      answer:
        "Yes, as long as it’s hygienically prepared and safe to eat. Please mention the type and condition of food while posting.",
    },
    {
      question: "How are recipients notified of new food posts?",
      answer:
        "They receive real-time notifications if a meal is posted near their location.",
    },
  ];

  return (
    <div className="font-[Montserrat]">
      <Navbar />
      {/* FAQ section content */}
      <div className="bg-gray-200 min-h-screen pb-20 pt-15">
        <div className="max-w-3xl mx-auto px-6 py-6 rounded-xl shadow-lg bg-white/90">
          <h2 className="text-3xl font-extrabold mb-2 text-green-800 text-center font-[Poppins]">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Everything you need to know about donating and receiving food with our platform.
          </p>

          {/* Mapping FAQs into expandable items */}
          <div className="divide-y divide-green-100">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>

        {/* Support section at the bottom */}
        <div className="flex justify-center mt-10">
          <div className="bg-green-800 text-white md:px-4 py-4 pb-6 rounded-lg shadow-md text-center mx-10">
            <span className="font-bold text-xl font-[Poppins]">Still have questions?</span>
            <br /><br />
            <span>
              Contact our support team at{" "}
              <a href="mailto:support@fooddonation.com" className="underline font-medium">
                support@fooddonation.com
              </a>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQSection;
