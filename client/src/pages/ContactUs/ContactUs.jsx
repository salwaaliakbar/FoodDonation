import Navbar from "../../components/Navbar/NavBar";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Formik, Form, Field } from "formik";
import ContactusSchema from "../../yupschemas/ContactusSchema";
import Footer from "../../components/Footer/Footer";

function ContactUs() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      content: (
        <>
          123 Food Share Street
          <br />
          Community City, World 12345
        </>
      ),
    },
    {
      icon: Mail,
      title: "Email Us",
      content: (
        <>
          contact@foodshare.org
          <br />
          donations@foodshare.org
        </>
      ),
    },
    {
      icon: Phone,
      title: "Call Us",
      content: (
        <>
          Donation Hotline: (123) 456-7890
          <br />
          General Inquiries: (123) 456-7891
        </>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 pt-4 md:pt-8 pb-8 md:pb-12">
        {/* Background decoration */}
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl" />

        {/* Decorative circles */}
        <div className="absolute right-[15%] top-20 hidden h-24 w-24 rounded-full border border-white/10 md:block" />
        <div className="absolute bottom-10 left-[12%] hidden h-16 w-16 rounded-full border border-white/10 md:block" />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
         

          {/* Eyebrow */}
          <span className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-100 backdrop-blur-sm">
            We're Here to Help
          </span>

          {/* Heading */}
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Let's start a
            <span className="block text-brand-300">
              conversation.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-brand-100/90 sm:text-lg">
            Have a question about donating, receiving food, or using
            FoodSecure? Reach out to us and we'll be happy to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <main className="relative flex-grow overflow-hidden py-20 md:py-28">
        {/* Background decoration */}
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-brand-50/70 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-accent-50/70 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                  Send a Message
                </span>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                  How can we help?
                </h2>

                <p className="mt-3 max-w-xl text-base leading-7 text-stone-600">
                  Fill out the form below and share your question or message
                  with our team.
                </p>
              </div>

              <Formik
                initialValues={{
                  fullname: "",
                  phone: "",
                  email: "",
                  message: "",
                }}
                validationSchema={ContactusSchema}
                onSubmit={() => {
                  alert("Your message was sent successfully.");
                }}
              >
                {({ errors, touched }) => (
                  <Form className="rounded-3xl border border-stone-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-8">

                    {/* Full Name */}
                    <div className="mb-5">
                      <label
                        htmlFor="fullname"
                        className="mb-2 block text-sm font-semibold text-stone-700"
                      >
                        Full Name
                      </label>

                      <Field
                        id="fullname"
                        name="fullname"
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-stone-300 bg-stone-50/50 px-4 py-3 text-stone-800 outline-none transition-all placeholder:text-stone-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                      />

                      {errors.fullname && touched.fullname && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.fullname}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="mb-5">
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-semibold text-stone-700"
                      >
                        Phone Number
                      </label>

                      <Field
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="w-full rounded-xl border border-stone-300 bg-stone-50/50 px-4 py-3 text-stone-800 outline-none transition-all placeholder:text-stone-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                      />

                      {errors.phone && touched.phone && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-stone-700"
                      >
                        Email Address
                      </label>

                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-stone-300 bg-stone-50/50 px-4 py-3 text-stone-800 outline-none transition-all placeholder:text-stone-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                      />

                      {errors.email && touched.email && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-semibold text-stone-700"
                      >
                        Message
                      </label>

                      <Field
                        id="message"
                        name="message"
                        as="textarea"
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full resize-none rounded-xl border border-stone-300 bg-stone-50/50 px-4 py-3 text-stone-800 outline-none transition-all placeholder:text-stone-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                      />

                      {errors.message && touched.message && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg"
                    >
                      Send Message
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                  Contact Information
                </span>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                  We're easy to reach.
                </h2>

                <p className="mt-3 max-w-lg text-base leading-7 text-stone-600">
                  Whether you're a donor, recipient, volunteer, or simply want
                  to learn more, we're always happy to hear from you.
                </p>
              </div>

              {/* Information Cards */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="group flex items-start gap-4 rounded-2xl border border-stone-200/70 bg-white p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-100 group-hover:scale-105">
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-stone-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-stone-600">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Small CTA */}
              <div className="mt-6 rounded-3xl bg-stone-900 p-6 sm:p-7">
                <p className="text-lg font-bold text-white">
                  Every conversation can make a difference.
                </p>

                <p className="mt-2 text-sm leading-6 text-stone-400">
                  Your questions, ideas, and support help us build a stronger
                  food-sharing community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ContactUs;