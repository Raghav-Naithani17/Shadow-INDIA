import IndiaMap from "../components/IndiaMap";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import ReportForm from "../components/ReportForm";
import Reports from "../components/Reports";

function Home() {
  return (
    <div className="bg-slate-950 min-h-screen">

      <Navbar />

      <div id="home">
        <Hero />
      </div>

      {/* Features */}
      <div id="features">
        <Features />
      </div>

      <IndiaMap />

      <Stats />

      {/* About */}
      <section
        id="about"
        className="bg-slate-900 text-white py-20 px-8"
      >
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-cyan-400 uppercase tracking-widest mb-3">
            About Shadow India
          </p>

          <h2 className="text-4xl font-bold mb-6">
            Technology for Better Communities
          </h2>

          <p className="text-slate-400 text-lg leading-8">
            Shadow India is a civic issue reporting and monitoring
            platform that allows citizens to report problems in
            their communities, track their resolution, and visualize
            reported issues across India.
          </p>

          <p className="text-slate-400 text-lg leading-8 mt-5">
            The platform combines full-stack web technologies,
            location-based visualization, administrative management,
            and intelligent issue prioritization to create a smarter
            civic reporting experience.
          </p>

        </div>
      </section>

      {/* Report Form */}
      <div id="report-form">
        <ReportForm />
      </div>

      {/* Community Reports */}
      <div id="community-reports">
        <Reports />
      </div>

      {/* Contact */}
      <section
        id="contact"
        className="bg-slate-950 text-white py-20 px-8"
      >
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-cyan-400 uppercase tracking-widest mb-3">
            Get Involved
          </p>

          <h2 className="text-4xl font-bold mb-6">
            Help Improve Your Community
          </h2>

          <p className="text-slate-400 text-lg mb-8">
            Report civic issues and help make Indian cities
            cleaner, safer, and smarter.
          </p>

          <button
            onClick={() => {
              const section = document.getElementById("report-form");

              if (section) {
                section.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            className="bg-cyan-500 hover:bg-cyan-600 px-7 py-3 rounded-lg font-semibold transition"
          >
            Report an Issue
          </button>

        </div>
      </section>

    </div>
  );
}

export default Home;