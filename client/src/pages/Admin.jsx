import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
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
    <section className="bg-slate-950 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-white mb-10">
          Admin Dashboard
        </h2>

        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-slate-800 rounded-xl p-6 mb-6"
          >
            <h3 className="text-2xl font-bold text-white">
              {report.title}
            </h3>

            <p className="text-slate-300 mt-2">
              {report.description}
            </p>

            <p className="text-cyan-400 mt-3">
              Current Status:
              <span className="ml-2 font-semibold">
                {report.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;