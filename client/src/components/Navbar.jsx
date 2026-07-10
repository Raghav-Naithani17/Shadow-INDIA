function Navbar() {
  return (
    <nav className="w-full h-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">

        <h1 className="text-3xl font-bold text-cyan-400 whitespace-nowrap">
           Shadow India
        </h1>

        <div className="flex items-center gap-8 text-white">

          <a href="#" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Features
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            About
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Contact
          </a>

          <button
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
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;