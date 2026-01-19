import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import type { ForecastItem } from '../types/weather';

interface TemperatureMapProps {
  cityLat: number;
  cityLng: number;
  forecast: ForecastItem[];
}

const TemperatureMap: React.FC<TemperatureMapProps> = ({ cityLat, cityLng, forecast }) => {
    useEffect(() => {
        const map = L.map('temperature-map', {
            center: [cityLat, cityLng],
            zoom: 12,
            scrollWheelZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        const kelvinToC = (k: number) => k - 273.15;

        const points = forecast.map((item) => {
            const tempC = kelvinToC(item.main.temp);
            let intensity = (tempC - 10) / (30 - 10);
            intensity = Math.min(Math.max(intensity, 0), 1);
            const latOffset = (Math.random() - 0.5) * 0.02;
            const lngOffset = (Math.random() - 0.5) * 0.02;
            return [cityLat + latOffset, cityLng + lngOffset, intensity] as [number, number, number];
        });

        L.heatLayer(points, {
            radius: 70,
            blur: 15,
            minOpacity: 0.4,
            maxZoom: 17,
            gradient: { 0.4: 'blue', 0.7: 'lime', 1: 'red' },
        }).addTo(map);

        return (): void => {
            map.remove();
        };
        }, [cityLat, cityLng, forecast]);


  return <div id="temperature-map" style={{ width: '100%', height: '400px', margin: '1rem 0' }} />;
};

export default TemperatureMap;
