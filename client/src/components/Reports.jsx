import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Reports() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Search + category filter
  const filteredReports = reports.filter((report) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      report.title?.toLowerCase().includes(searchText) ||
      report.description?.toLowerCase().includes(searchText) ||
      report.location?.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || report.category === category;

    return matchesSearch && matchesCategory;
  });

  // Count reports city-wise
  const cityCounts = {};

  reports.forEach((report) => {
    const city = report.location?.trim();

    if (city) {
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    }
  });

  // Get top 5 cities
  const topCities = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="text-white p-10">

      <h2 className="text-3xl font-bold mb-6">
        Community Reports
      </h2>

      {/* Search + Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="🔍 Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:border-cyan-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Roads">Roads</option>
          <option value="Garbage">Garbage</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Street Lights">Street Lights</option>
        </select>

      </div>

      {/* Top Affected Cities */}
      <div className="bg-slate-800 rounded-xl p-6 mb-8">

        <h3 className="text-2xl font-bold mb-5">
          🏙️ Most Reported Cities
        </h3>

        {topCities.length === 0 ? (
          <p className="text-slate-400">
            No city data available.
          </p>
        ) : (
          <div className="space-y-3">

            {topCities.map(([city, count], index) => (
              <div
                key={city}
                className="flex items-center justify-between bg-slate-700 rounded-lg px-4 py-3"
              >

                <div className="flex items-center gap-3">

                  <span className="text-cyan-400 font-bold">
                    #{index + 1}
                  </span>

                  <span className="text-white font-semibold">
                    {city}
                  </span>

                </div>

                <span className="text-slate-300">
                  {count} {count === 1 ? "report" : "reports"}
                </span>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Reports */}
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : filteredReports.length === 0 ? (
        <p className="text-slate-400">
          No reports match your search or selected category.
        </p>
      ) : (
        filteredReports.map((report) => (
          <div
            key={report._id}
            className="bg-slate-800 p-5 rounded-lg mb-4"
          >

            <h3 className="text-xl font-semibold">
              {report.title}
            </h3>

            <p className="mt-2">
              {report.description}
            </p>

            {report.image && (
              <img
                src={`http://localhost:5000${report.image}`}
                alt={report.title}
                className="w-full h-64 object-cover rounded-lg my-4"
              />
            )}

            <p className="text-sm mt-2">
              📍 {report.location}
            </p>

            <p className="text-sm">
              Category: {report.category}
            </p>

            <p className="text-sm">
              Status: {report.status}
            </p>

            <Link
              to={`/reports/${report._id}`}
              className="inline-block mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              View Details →
            </Link>

          </div>
        ))
      )}

    </div>
  );
}

export default Reports;