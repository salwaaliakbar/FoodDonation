// Importing necessary hooks, components, and icons
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import AnimatedSection from "../../components/AnimatedSection";

// Individual FAQ item with toggle functionality
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-stone-200 bg-white hover:border-brand-200 transition-colors duration-200 px-5 py-4 cursor-pointer">
      <div onClick={() => setOpen(!open)} className="flex justify-between items-center gap-4">
        <h3 className="text-lg font-semibold text-stone-900">{question}</h3>
        <ChevronDownIcon
          className={`w-5 h-5 text-brand-700 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      {open && <p className="mt-3 text-stone-600 leading-relaxed">{answer}</p>}
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
    <div>
      <Navbar />
      {/* FAQ section content */}
      <div className="bg-cream-50 min-h-screen pb-20 pt-16 md:pt-24">
        <AnimatedSection className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600 text-lg">
            Everything you need to know about donating and receiving food with our platform.
          </p>
        </AnimatedSection>

        {/* Mapping FAQs into expandable items */}
        <AnimatedSection delay={0.1} className="max-w-3xl mx-auto px-4 sm:px-6 space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </AnimatedSection>

        {/* Support section at the bottom */}
        <AnimatedSection delay={0.2} className="flex justify-center mt-12 px-4">
          <div className="bg-brand-900 text-white px-8 py-8 rounded-2xl shadow-md text-center max-w-xl w-full">
            <span className="font-bold text-xl">Still have questions?</span>
            <p className="mt-3 text-brand-100">
              Contact our support team at{" "}
              <a href="mailto:support@fooddonation.com" className="underline font-medium text-white hover:text-accent-400 transition-colors">
                contact@foodshare.org
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>
      <Footer />
    </div>
  );
};

export default FAQSection;
