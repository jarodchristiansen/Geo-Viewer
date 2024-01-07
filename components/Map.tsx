import { useEffect, useMemo, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import styled from "styled-components";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

export default function MyMap(props: any) {
  const zoom = 11;

  // Need to figure out where inversion is in upload process
  const position = [-0.09, 51.505];

  const [geoJsonData, setGeoJsonData] = useState(null);
  const [mapPosition, setMapPosition] = useState(position);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setGeoJsonData(null);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedGeoJson = JSON.parse(e.target.result.toString());

          console.log(
            { parsedGeoJson },
            "geoJsonData in set geoJson Data hook"
          );

          setGeoJsonData(parsedGeoJson);

          // Check the GeoJSON type and extract coordinates accordingly
          let coordinates = [];

          if (parsedGeoJson.features) {
            // Assuming it's a FeatureCollection with MultiPolygon
            coordinates = parsedGeoJson.features[0].geometry.coordinates[0];
          } else if (parsedGeoJson.geometry?.coordinates) {
            // Assuming it's a Polygon
            coordinates = parsedGeoJson.geometry.coordinates[0];
          }

          // Calculate the center of the polygon
          const center = coordinates.reduce(
            (acc, coord) => {
              acc[0] += coord[0];
              acc[1] += coord[1];
              return acc;
            },
            [0, 0]
          );

          const formattedCenter = coordinates[0];

          // Now, you can set the map center to the calculated center
          const newMapPosition = {
            center: formattedCenter,
          };

          // Update the map position using the above information
          setMapPosition(newMapPosition.center);
        } catch (error) {
          console.error("Error parsing GeoJSON file:", error);
        }
      };

      reader.readAsText(file);
    }
  };

  const RecenterAutomatically = ({ lat = 1, lng = 1 }) => {
    const map = useMap();

    useEffect(() => {
      if (!Array.isArray(lat) && !isNaN(lat) && !isNaN(lng)) {
        console.log({ lat, lng }, "IN RECENTER AUTOMATICALLY");

        //   map.setView([lat[1], lat[0]]);
        map.setView([lat, lng]);
      } else {
        console.error("Invalid latitude and longitude values:", lat, lng);
        map.setView([lat[1], lat[0]]);
      }
    }, [lat, lng]);

    return null;
  };

  const GeoJsonComponent = useMemo(() => {
    if (!geoJsonData) return null;

    return <GeoJSON data={geoJsonData} />;
  }, [geoJsonData]);

  return (
    <MapManagerContainer>
      <input type="file" onChange={handleFileUpload} />
      <MapContainer
        center={[mapPosition[1], mapPosition[0]]}
        zoom={zoom}
        style={{ height: "400px", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
        />
        {/* {geoJsonData && <GeoJSON data={geoJsonData} />} */}
        {GeoJsonComponent}

        <RecenterAutomatically lat={mapPosition[1]} lng={mapPosition[0]} />
      </MapContainer>

      {/* {Map} */}
    </MapManagerContainer>
  );
}

const MapManagerContainer = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;
