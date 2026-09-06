import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Admin() {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  inProgress: 0,
  resolved: 0,
});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchReports();
    fetchStats();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStats = async () => {
  try {
    const res = await API.get("/reports/stats");
    setStats(res.data.data);
  } catch (error) {
    console.log(error);
  }
};

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/reports/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReports();
      fetchStats();
      toast.success("Status Updated");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReport = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/reports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchReports();
      fetchStats();
      toast.success("Report Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-slate-950 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-white mb-8">
          Admin Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

  <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
    <h3 className="text-slate-400 text-lg">
      📄 Total Reports
    </h3>

    <p className="text-4xl font-bold text-white mt-3">
      {stats.total}
    </p>
  </div>

  <div className="bg-yellow-500 p-6 rounded-xl shadow-lg">
    <h3 className="text-white text-lg">
      🟡 Pending
    </h3>

    <p className="text-4xl font-bold text-white mt-3">
      {stats.pending}
    </p>
  </div>

  <div className="bg-blue-500 p-6 rounded-xl shadow-lg">
    <h3 className="text-white text-lg">
      🔵 In Progress
    </h3>

    <p className="text-4xl font-bold text-white mt-3">
      {stats.inProgress}
    </p>
  </div>

  <div className="bg-green-500 p-6 rounded-xl shadow-lg">
    <h3 className="text-white text-lg">
      🟢 Resolved
    </h3>

    <p className="text-4xl font-bold text-white mt-3">
      {stats.resolved}
    </p>
  </div>

</div>

        {/* Search Bar */}

        <input
          type="text"
          placeholder="🔍 Search reports by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 text-white p-4 rounded-xl mb-6 outline-none border border-slate-700 focus:border-cyan-400"
        />

        {/* Filter Buttons */}

        <div className="flex gap-4 mb-8 flex-wrap">

          <button
            onClick={() => setFilter("All")}
            className={`px-5 py-2 rounded-lg transition ${
              filter === "All"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-white"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("Pending")}
            className={`px-5 py-2 rounded-lg transition ${
              filter === "Pending"
                ? "bg-yellow-500 text-white"
                : "bg-slate-800 text-white"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => setFilter("In Progress")}
            className={`px-5 py-2 rounded-lg transition ${
              filter === "In Progress"
                ? "bg-blue-500 text-white"
                : "bg-slate-800 text-white"
            }`}
          >
            In Progress
          </button>

          <button
            onClick={() => setFilter("Resolved")}
            className={`px-5 py-2 rounded-lg transition ${
              filter === "Resolved"
                ? "bg-green-500 text-white"
                : "bg-slate-800 text-white"
            }`}
          >
            Resolved
          </button>

        </div>

        {reports
          .filter((report) =>
            report.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter((report) =>
            filter === "All" ? true : report.status === filter
          )
          .map((report) => (

            <div
              key={report._id}
              className="bg-slate-800 rounded-xl p-8 mb-8"
            >

              <h3 className="text-2xl font-bold text-white">
                {report.title}
              </h3>

              <p className="text-slate-300 mt-3">
                {report.description}
              </p>

              <div className="mt-5">

                <span className="text-slate-300 font-medium">
                  Status
                </span>

                <span
                  className={`ml-3 px-3 py-1 rounded-full text-sm text-white font-semibold ${
                    report.status === "Pending"
                      ? "bg-yellow-500"
                      : report.status === "In Progress"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                >
                  {report.status}
                </span>

              </div>

              <div className="flex justify-between items-center mt-6">

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      updateStatus(report._id, "Pending")
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(report._id, "In Progress")
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(report._id, "Resolved")
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
                  >
                    Resolved
                  </button>

                </div>

                <button
                  onClick={() => deleteReport(report._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

      </div>
    </section>
  );
}

export default Admin;