export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust?: number;
}

export interface ForecastItem {
    dt: number;
    dt_txt: string;
    main: MainWeather;
    weather: WeatherCondition;
    wind: Wind;
    clouds: number;
    pop: number;
    rain: number;
    snow: number;
}
