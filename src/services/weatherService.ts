import type { Forecast } from '../types/forecast';
import type { ForecastItem } from '../types/weather';
import type {
    OpenWeatherForecastResponse,
    OpenWeatherForecastItem,
} from '../types/openWeatheApiResponse';

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const BASE_URL = 'https://api.openweathermap.org';

interface OpenWeatherError {
    cod: number | string;
    message: string;
}

export const getWeatherForecast = async (city: string): Promise<Forecast> => {
    const response = await fetch(
        `${BASE_URL}/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
        const error: OpenWeatherError = {
            cod: data.cod,
            message: data.message,
        };
        throw error;
    }

    const typedData = data as OpenWeatherForecastResponse;

    const list: ForecastItem[] = typedData.list.map(
        (item: OpenWeatherForecastItem): ForecastItem => ({
            dt: item.dt,
            dt_txt: item.dt_txt,
            main: item.main,
            weather: item.weather[0],
            wind: item.wind,
            clouds: item.clouds.all,
            pop: item.pop,
            rain: item.rain?.['3h'] ?? 0,
            snow: item.snow?.['3h'] ?? 0,
        })
    );

    const location = {
        name: typedData.city.name,
        country: typedData.city.country,
        lat: typedData.city.coord.lat,
        lon: typedData.city.coord.lon,
    };

    return {
        list,
        location,
    };
};
/*
import mockForecast from '../mock/forecast.json';
import type { Forecast } from '../types/forecast';
import type { ForecastItem } from '../types/weather';
import type {
    OpenWeatherForecastResponse,
    OpenWeatherForecastItem,
} from '../types/openWeatheApiResponse';

const data = mockForecast as OpenWeatherForecastResponse;

export const getWeatherForecast = async (city: string): Promise<Forecast> => {
    await new Promise((r) => setTimeout(r, 500));
    void city;

    const list: ForecastItem[] = data.list.map(
        (item: OpenWeatherForecastItem): ForecastItem => ({
            dt: item.dt,
            dt_txt: item.dt_txt,
            main: item.main,
            weather: item.weather[0],
            wind: item.wind,
            clouds: item.clouds.all,
            pop: item.pop,
            rain: item.rain?.['3h'] ?? 0,
            snow: item.snow?.['3h'] ?? 0,
        })
    );

    const location = {
        name: data.city.name,
        country: data.city.country,
        lat: data.city.coord.lat,
        lon: data.city.coord.lon,
    };

    return {
        list,
        location,
    };
};
*/



