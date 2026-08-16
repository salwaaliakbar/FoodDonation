import OurServices from "./OurServices";
import Introduction from "./Introduction";
import JoinMission from "../../components/JoinMission";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";

function Services() {
  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 py-8 md:py-12">
        {/* Background decorations */}
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl" />

        {/* Decorative circles */}
        <div className="absolute right-[15%] top-20 hidden h-24 w-24 rounded-full border border-white/10 md:block" />
        <div className="absolute bottom-10 left-[12%] hidden h-16 w-16 rounded-full border border-white/10 md:block" />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">

          {/* Eyebrow */}
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-100 backdrop-blur-sm">
            What FoodSecure Offers
          </span>

          {/* Heading */}
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tools that turn
            <span className="block text-brand-300">
              generosity into impact.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-brand-100/90 sm:text-lg">
            From creating food donation campaigns to connecting recipients
            with available resources, FoodSecure makes food sharing simpler,
            safer, and more meaningful.
          </p>

          {/* Hero stats */}
          <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-brand-100">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-300" />
              Easy to use
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-300" />
              Community focused
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-300" />
              Impact driven
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow">

        {/* Introduction */}
        <Introduction />
         {/* CTA */}
        <JoinMission />

        {/* Services */}
        <OurServices />

       

      </main>

      <Footer />
    </div>
  );
}

export default Services;