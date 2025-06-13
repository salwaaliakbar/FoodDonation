import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Navbar from "../../Components/Navbar/NavBar";
import Footer from "../../Components/Footer/Footer";

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
    <>
        <Navbar />
        <div className="bg-gray-200 min-h-screen py-20">
            <div className="max-w-3xl mx-auto px-6 py-8 rounded-xl shadow-lg bg-white/90">
                <h2 className="text-3xl font-extrabold mb-2 text-green-700 text-center">
                    Frequently Asked Questions
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Everything you need to know about donating and receiving food with our platform.
                </p>
                <div className="divide-y divide-green-100">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <div className="bg-green-800 text-white px-4 py-4 pb-6 rounded-lg shadow-md text-center max-w-md">
                    <span className="font-bold text-xl">Still have questions?</span>
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
    </>
);
};

export default FAQSection;
