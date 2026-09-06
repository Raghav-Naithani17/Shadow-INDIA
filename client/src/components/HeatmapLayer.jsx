import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

import cityCoordinates from "../data/cityCoordinates";

function HeatmapLayer({ reports }) {
  const map = useMap();

  useEffect(() => {
    // Convert reports into heatmap points
    const points = reports
      .map((report) => {
        const location = report.location?.trim();

        if (!location) return null;

        // Find city coordinates
        const coordinates = cityCoordinates[location];

        if (!coordinates) return null;

        // Give higher priority reports more heat
        let intensity = 0.5;

        if (report.priority === "High") {
          intensity = 1;
        } else if (report.priority === "Medium") {
          intensity = 0.7;
        }

        return [
          coordinates[0],
          coordinates[1],
          intensity,
        ];
      })
      .filter(Boolean);

    // Remove old heatmap if it exists
    const heatLayer = L.heatLayer(points, {
      radius: 35,
      blur: 25,
      maxZoom: 10,
      minOpacity: 0.4,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [reports, map]);

  return null;
}

export default HeatmapLayer;