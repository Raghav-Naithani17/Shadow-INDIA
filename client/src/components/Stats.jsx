import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

function Stats() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/reports/stats");
      setStats(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Total Reports",
      value: stats.total,
      icon: <FaClipboardList />,
      color: "text-cyan-400",
      border: "border-cyan-400",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      color: "text-yellow-400",
      border: "border-yellow-400",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: <FaSpinner />,
      color: "text-blue-400",
      border: "border-blue-400",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: <FaCheckCircle />,
      color: "text-green-400",
      border: "border-green-400",
    },
  ];

  return (
    <section className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-white mb-14">
          Platform Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-slate-800 rounded-2xl p-8 border-t-4 ${card.border}
              shadow-lg hover:shadow-2xl hover:-translate-y-3
              transition-all duration-300`}
            >
              <div
                className={`text-5xl ${card.color} mb-6`}
              >
                {card.icon}
              </div>

              <h3
                className={`text-5xl font-bold ${card.color}`}
              >
                {card.value}
              </h3>

              <p className="text-slate-300 mt-3 text-lg">
                {card.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Stats;