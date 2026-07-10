function Stats() {
  return (
    <section className="bg-slate-950 py-16">
      <div className="max-w-6xl mx-auto px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          <div className="text-center">
            <h2 className="text-5xl font-bold text-cyan-400">12K+</h2>
            <p className="text-slate-400 mt-2">Reports Filed</p>
          </div>

          <div className="text-center">
            <h2 className="text-5xl font-bold text-cyan-400">640+</h2>
            <p className="text-slate-400 mt-2">Cities Connected</p>
          </div>

          <div className="text-center">
            <h2 className="text-5xl font-bold text-cyan-400">89%</h2>
            <p className="text-slate-400 mt-2">Issues Resolved</p>
          </div>

          <div className="text-center">
            <h2 className="text-5xl font-bold text-cyan-400">42K+</h2>
            <p className="text-slate-400 mt-2">Citizens Joined</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Stats;