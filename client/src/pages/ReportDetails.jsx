import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function ReportDetails() {
  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const res = await API.get(`/reports/${id}`);
      setReport(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-black";

      case "In Progress":
        return "bg-blue-500 text-white";

      case "Resolved":
        return "bg-green-500 text-white";

      default:
        return "bg-slate-600 text-white";
    }
  };

  // Priority badge styling
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";

      case "Medium":
        return "bg-orange-500 text-white";

      case "Low":
        return "bg-green-500 text-white";

      default:
        return "bg-slate-600 text-white";
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-slate-950 min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">
          Loading report...
        </p>
      </section>
    );
  }

  // Report not found
  if (!report) {
    return (
      <section className="bg-slate-950 min-h-screen flex items-center justify-center px-6">
        <div className="text-center">

          <div className="text-6xl mb-5">
            🔍
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Report Not Found
          </h2>

          <p className="text-slate-400 mb-6">
            The report you're looking for may have been deleted
            or does not exist.
          </p>

          <Link
            to="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            ← Back to Home
          </Link>

        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-950 min-h-screen py-16">

      <div className="max-w-5xl mx-auto px-6">

        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition"
        >
          ← Back to Community Reports
        </Link>

        {/* Main Card */}
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl">

          {/* Report Image */}
          {report.image ? (
            <img
              src={`http://localhost:5000${report.image}`}
              alt={report.title}
              className="w-full h-80 object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-slate-700 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">
                  📷
                </div>

                <p className="text-slate-400">
                  No image available
                </p>
              </div>
            </div>
          )}

          <div className="p-8">

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-4">
              {report.title}
            </h1>

            {/* Status + Priority */}
            <div className="flex flex-wrap gap-3 mb-6">

              <span
                className={`px-4 py-2 rounded-full font-semibold ${getStatusStyle(
                  report.status
                )}`}
              >
                Status: {report.status}
              </span>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${getPriorityStyle(
                  report.priority
                )}`}
              >
                Priority: {report.priority}
              </span>

            </div>

            {/* Description */}
            <div className="mb-8">

              <h2 className="text-xl font-semibold text-white mb-3">
                Description
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed">
                {report.description}
              </p>

            </div>

            {/* Report Information */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* Category */}
              <div className="bg-slate-700 rounded-xl p-5">

                <p className="text-slate-400 text-sm mb-1">
                  Category
                </p>

                <p className="text-white text-lg font-semibold">
                  🏷️ {report.category}
                </p>

              </div>

              {/* Location */}
              <div className="bg-slate-700 rounded-xl p-5">

                <p className="text-slate-400 text-sm mb-1">
                  Location
                </p>

                <p className="text-white text-lg font-semibold">
                  📍 {report.location}
                </p>

              </div>

              {/* Status */}
              <div className="bg-slate-700 rounded-xl p-5">

                <p className="text-slate-400 text-sm mb-1">
                  Current Status
                </p>

                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>

              </div>

              {/* Priority */}
              <div className="bg-slate-700 rounded-xl p-5">

                <p className="text-slate-400 text-sm mb-1">
                  Priority Level
                </p>

                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${getPriorityStyle(
                    report.priority
                  )}`}
                >
                  {report.priority}
                </span>

              </div>

            </div>

            {/* Report Date */}
            {report.createdAt && (
              <div className="mt-8 bg-slate-700 rounded-xl p-5">

                <p className="text-slate-400 text-sm mb-1">
                  Reported On
                </p>

                <p className="text-white">
                  📅{" "}
                  {new Date(report.createdAt).toLocaleString()}
                </p>

              </div>
            )}

            {/* Footer */}
            <div className="border-t border-slate-700 mt-8 pt-6">

              <p className="text-slate-400 text-sm">
                This report is part of the Shadow India community
                reporting system.
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default ReportDetails;