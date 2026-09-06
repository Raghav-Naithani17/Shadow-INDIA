import HeatmapLayer from "./HeatmapLayer";
import { useEffect, useState } from "react";
import API from "../services/api";
import cityCoordinates from "../data/cityCoordinates";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import redIcon from "leaflet-color-markers/img/marker-icon-red.png";
import greenIcon from "leaflet-color-markers/img/marker-icon-green.png";
import orangeIcon from "leaflet-color-markers/img/marker-icon-orange.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
const highIcon = new L.Icon({
  iconUrl: redIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const mediumIcon = new L.Icon({
  iconUrl: orangeIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const lowIcon = new L.Icon({
  iconUrl: greenIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function IndiaMap() {
    const [reports, setReports] = useState([]);
    const totalReports = reports.length;

const pendingReports = reports.filter(
  (report) => report.status === "Pending"
).length;

const progressReports = reports.filter(
  (report) => report.status === "In Progress"
).length;

const resolvedReports = reports.filter(
  (report) => report.status === "Resolved"
).length;
    const [selectedCategory, setSelectedCategory] = useState("All");

useEffect(() => {
  fetchReports();
}, []);

const fetchReports = async () => {
  try {
    const res = await API.get("/reports");
    setReports(res.data.data);
    console.log(res.data.data);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="mt-8 mb-8">

      <h2 className="text-4xl font-bold text-white text-center mb-3">
        India Live Issue Map
      </h2>

      <p className="text-slate-400 text-center mb-8">
        Explore reported issues across the country.
      </p>
<div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">

  <div className="bg-slate-800 rounded-xl p-5 text-center">
    <h3 className="text-slate-400">Total Reports</h3>
    <p className="text-3xl font-bold text-white mt-2">
      {totalReports}
    </p>
  </div>

  <div className="bg-yellow-500 rounded-xl p-5 text-center">
    <h3 className="text-white">Pending</h3>
    <p className="text-3xl font-bold">
      {pendingReports}
    </p>
  </div>

  <div className="bg-blue-500 rounded-xl p-5 text-center">
    <h3 className="text-white">In Progress</h3>
    <p className="text-3xl font-bold">
      {progressReports}
    </p>
  </div>

  <div className="bg-green-500 rounded-xl p-5 text-center">
    <h3 className="text-white">Resolved</h3>
    <p className="text-3xl font-bold">
      {resolvedReports}
    </p>
  </div>

</div>
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        scrollWheelZoom={true}
        style={{
            height: "350px",
            width: "100%",
            borderRadius: "18px",
        }}
      ><div className="flex justify-center mb-6">
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="bg-slate-800 text-white px-5 py-2 rounded-lg border border-slate-600"
  >
    <option>All</option>
    <option>Roads</option>
    <option>Garbage</option>
    <option>Electricity</option>
    <option>Water</option>
    <option>Street Lights</option>
  </select>
</div>

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Demo Marker */}

        {reports.map((report, index) => {
  const coordinates = cityCoordinates[report.location.trim()];

  if (!coordinates) return null;

  // Small offset so markers don't overlap
  const offset = 0.003;

  const position = [
    coordinates[0] + (index % 5) * offset,
    coordinates[1] + Math.floor(index / 5) * offset,
  ];
let markerIcon = mediumIcon;

if (report.priority === "High") {
  markerIcon = highIcon;
} else if (report.priority === "Low") {
  markerIcon = lowIcon;
}
  return (
    <Marker
  key={report._id}
  position={position}
  icon={markerIcon}
>
      <Popup>

  <div className="w-56">

    <h3 className="text-lg font-bold mb-2">
      🚧 {report.title}
    </h3>

    <p>
      <strong>📍 Location:</strong> {report.location}
    </p>

    <p>
      <strong>Category:</strong> {report.category}
    </p>

    <p>
      <strong>Status:</strong> {report.status}
    </p>

    <p>
      <strong>Priority:</strong> {report.priority}
    </p>

    <hr className="my-2" />

    <p className="text-sm">
      {report.description}
    </p>

  </div>

</Popup>
    </Marker>
  );
})}
<HeatmapLayer reports={reports} />
      </MapContainer>

    </div>
  );
}

export default IndiaMap;