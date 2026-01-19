// src/types/leaflet-heat.d.ts
import * as L from 'leaflet';

declare module 'leaflet' {
  interface HeatMapOptions extends L.LayerOptions {
    radius?: number;
    blur?: number;
    maxZoom?: number;
    gradient?: { [key: number]: string };
    minOpacity?: number;
  }

  function heatLayer(
    latlngs: [number, number, number][],
    options?: HeatMapOptions
  ): L.Layer;
}
