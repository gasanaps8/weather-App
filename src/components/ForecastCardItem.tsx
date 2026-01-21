import React, { useState } from 'react';
import type { ForecastItem } from '../types/weather';
import {
    ForecastCard,
    CardHeader,
    DateText,
    ExpandableContent,
    ForecastDetails,
} from '../styles/ForecastCardItem.styles';

interface ForecastCardItemProps {
    item: ForecastItem;
    unit: 'C' | 'F';
}

const ForecastCardItem: React.FC<ForecastCardItemProps> = ({ item, unit }) => {
    const [expanded, setExpanded] = useState(false);

    const convertTemp = (kelvin: number) => {
        const celsius = kelvin - 273.15;

        const value =
        unit === 'C'
            ? celsius
            : celsius * 9 / 5 + 32;

        return value.toFixed(1);
    };


    return (
        <ForecastCard $expanded={expanded} onClick={() => setExpanded(!expanded)}>
            <CardHeader>
                {convertTemp(item.main.temp)}
                {unit === 'C' ? '°C' : '°F'}

                <img
                    src={`https://openweathermap.org/img/wn/${item.weather.icon}.png`}
                    alt={item.weather.description}
                    width={40}
                    height={40}
                    />

                <DateText>{item.dt_txt}</DateText>
            </CardHeader>

            <ExpandableContent $expanded={expanded}>
                <ForecastDetails>
                    <div>{item.weather.description}</div>
                    <div>
                        Feels like: {convertTemp(item.main.feels_like)}
                        {unit === 'C' ? '°C' : '°F'}
                    </div>
                    <div>Humidity: {item.main.humidity}%</div>
                    <div>Wind: {item.wind.speed} m/s</div>
                    <div>Rain: {item.rain} mm</div>
                </ForecastDetails>
            </ExpandableContent>
        </ForecastCard>
    );
};

export default ForecastCardItem;
