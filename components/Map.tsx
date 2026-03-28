import type { GeoJsonObject } from "geojson";
import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import styled from "styled-components";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
// Do not import leaflet/dist/leaflet.css here: the published leaflet package omits
// dist/images/*.png, so webpack cannot resolve url(...) in that stylesheet. Core
// Leaflet CSS is loaded globally via <link> in pages/_app.tsx (CDN matches package version).

type LngLat = [number, number];

function RecenterAutomatically({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      map.setView([lat, lng]);
    }
  }, [lat, lng, map]);

  return null;
}

function readTextFromLoadEvent(e: ProgressEvent<FileReader>): string | null {
  const target = e.target;
  if (!(target instanceof FileReader)) return null;
  const { result } = target;
  return typeof result === "string" ? result : null;
}

export default function MyMap() {
  const zoom = 11;

  // [lng, lat] — Leaflet MapContainer uses [lat, lng], swapped below
  const position: LngLat = [-0.09, 51.505];

  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null);
  const [mapPosition, setMapPosition] = useState<LngLat>(position);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setGeoJsonData(null);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = readTextFromLoadEvent(e);
        if (text == null) return;

        const parsedGeoJson = JSON.parse(text) as {
          features?: { geometry?: { coordinates?: number[][][] } }[];
          geometry?: { coordinates?: number[][][] };
        };

        setGeoJsonData(parsedGeoJson as GeoJsonObject);

        let ring: number[][] = [];

        if (parsedGeoJson.features?.[0]?.geometry?.coordinates?.[0]) {
          ring = parsedGeoJson.features[0].geometry.coordinates[0];
        } else if (parsedGeoJson.geometry?.coordinates?.[0]) {
          ring = parsedGeoJson.geometry.coordinates[0];
        }

        if (ring.length === 0) return;

        const [sumLng, sumLat] = ring.reduce<[number, number]>(
          (acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]],
          [0, 0]
        );
        const n = ring.length;
        const centroid: LngLat = [sumLng / n, sumLat / n];
        setMapPosition(centroid);
      } catch (error) {
        console.error("Error parsing GeoJSON file:", error);
      }
    };

    reader.readAsText(file);
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
        {GeoJsonComponent}

        <RecenterAutomatically lat={mapPosition[1]} lng={mapPosition[0]} />
      </MapContainer>
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
