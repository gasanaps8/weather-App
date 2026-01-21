export interface OpenWeatherForecastItem {
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    clouds: {
        all: number;
    };
    pop: number;
    rain?: {
        '3h'?: number;
    };
    snow?: {
        '3h'?: number;
    };
}

export interface OpenWeatherForecastResponse {
    list: OpenWeatherForecastItem[];
    city: {
        name: string;
        country: string;
        coord: {
        lat: number;
        lon: number;
        };
    };
}
