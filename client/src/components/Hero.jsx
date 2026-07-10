function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center px-8">

      <div className="text-center max-w-4xl">

        <p className="text-cyan-400 uppercase tracking-widest mb-4">
          AI Powered Civic Intelligence
        </p>

        <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
          Report.
          <br />
          Improve.
          <br />
          Transform India.
        </h1>

        <p className="text-slate-400 text-xl mt-8 leading-8">
          Shadow India enables citizens to report civic issues,
          monitor their resolution, and contribute towards
          building smarter and safer cities.
        </p>

        <div className="flex justify-center gap-6 mt-10">

          <button className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-xl text-lg font-semibold">
            Report an Issue
          </button>

          <button className="border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 transition px-8 py-4 rounded-xl text-lg text-white">
            Explore Reports
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;