import type { ForecastItem } from "./weather";
import type { GeoLocation } from "./geolocation";

export interface Forecast {
    list: ForecastItem[];
    location: GeoLocation; 
}