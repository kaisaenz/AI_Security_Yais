"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { DialogTrigger } from "@/components/ui/dialog";

// Fix missing marker icons in Next.js + Leaflet
const createCustomIcon = (status: string) => {
  let color = "#f43f5e"; // rose-500
  if (status === "Avanzado") color = "#10b981"; // emerald-500
  if (status === "Intermedio") color = "#f59e0b"; // amber-500

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3" fill="white"></circle>
    </svg>`;

  return L.divIcon({
    className: "custom-leaflet-icon",
    html: `<div style="width: 30px; height: 30px; filter: drop-shadow(0 0 8px ${color});">${svgIcon}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

const createNewsIcon = () => {
  const color = "#06b6d4"; // cyan-500
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-radio">
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
    </svg>`;

  return L.divIcon({
    className: "custom-leaflet-icon",
    html: `<div style="width: 24px; height: 24px; filter: drop-shadow(0 0 10px ${color}); animation: pulse 2s infinite;">${svgIcon}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

interface MapProps {
  policyData: any[];
  newsData?: any[];
  onMarkerClick: (countryId: string) => void;
}

export default function GeopoliticsMap({ policyData, newsData = [], onMarkerClick }: MapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-slate-950 flex items-center justify-center text-slate-500">Iniciando Enlace Satelital...</div>;

  return (
    <MapContainer 
      center={[-15.0, -60.0]} 
      zoom={3} 
      style={{ height: '100%', width: '100%', background: '#020617' }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {policyData.map((country) => (
        <Marker 
          key={country.id} 
          position={[country.lat, country.lng]} 
          icon={createCustomIcon(country.status)}
          eventHandlers={{
            click: () => onMarkerClick(country.id),
          }}
        >
        </Marker>
      ))}
      
      {newsData.map((news) => (
        <Marker 
          key={news.id} 
          position={[news.lat, news.lng]} 
          icon={createNewsIcon()}
        >
          <Popup className="custom-popup">
            <div className="bg-slate-900 text-slate-200 p-2 rounded-lg border border-slate-700 min-w-[200px]">
              <div className="text-[10px] font-mono text-cyan-400 mb-1 border-b border-slate-700 pb-1 flex justify-between">
                <span>{news.source}</span>
                <span className="px-1 bg-cyan-900/50 rounded">{news.tag}</span>
              </div>
              <p className="text-sm font-semibold leading-tight">{news.title}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
