import { useEffect, useState } from "react";
import API from "../services/api";

function Reports() {
  const [reports, setReports] = useState([]);

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

  return (
    <div className="text-white p-10">
      <h2 className="text-3xl font-bold mb-6">
        Community Reports
      </h2>

      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reports.map((report) => (
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
          </div>
        ))
      )}
    </div>
  );
}

export default Reports;