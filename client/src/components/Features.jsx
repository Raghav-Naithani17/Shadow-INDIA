function Features() {

  const features = [
    {
      title: "Report Issues",
      description:
        "Report potholes, garbage, broken streetlights, water leakage, and other civic problems in seconds.",
      icon: "📍",
    },
    {
      title: "AI Priority Detection",
      description:
        "Our AI identifies high-priority complaints and helps authorities focus on urgent issues.",
      icon: "🤖",
    },
    {
      title: "Track Progress",
      description:
        "Monitor every complaint from submission to resolution with complete transparency.",
      icon: "📈",
    },
    {
      title: "Community Impact",
      description:
        "Every report contributes to cleaner, safer, and smarter Indian cities.",
      icon: "🌍",
    },
  ];

  return (
    <section className="bg-slate-950 py-24">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center text-white">
          Why Shadow India?
        </h2>

        <p className="text-slate-400 text-center mt-6 text-lg">
          One platform. Millions of citizens. Infinite impact.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-cyan-400 transition duration-300 hover:-translate-y-2"
            >

              <div className="text-5xl mb-6">
                {feature.icon}
              </div>

              <h3 className="text-white text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-7">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;