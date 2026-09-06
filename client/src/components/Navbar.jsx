import { Link } from "react-router-dom";

function Navbar() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="w-full h-20 bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-3xl font-bold text-cyan-400 whitespace-nowrap"
        >
          Shadow India
        </button>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-white">

          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="hover:text-cyan-400 transition"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-cyan-400 transition"
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-cyan-400 transition"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-cyan-400 transition"
          >
            Contact
          </button>

          <Link
            to="/login"
            className="
              bg-cyan-500
              hover:bg-cyan-600
              px-5
              py-2
              rounded-lg
              font-semibold
              transition
            "
          >
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;