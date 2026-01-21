import React, { useState } from 'react';
import type { ForecastItem } from '../types/weather';
import ForecastHourlyList from './ForcastHourlyList';
import { DailyContainer, DayCard, DayDate, DayDescription, DayTemp } from '../styles/DailyForecast.styles';

interface DailyForecastProps {
    items: ForecastItem[];
    unit: 'C' | 'F';
}

interface DailyData {
    date: string;
    avgTemp: number;
    description: string;
    icon: string;
    items: ForecastItem[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ items, unit }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const convertTemp = (kelvin: number) =>
        unit === 'C' ? kelvin - 273.15 : (kelvin - 273.15) * 9 / 5 + 32;

    const grouped: Record<string, ForecastItem[]> = items.reduce((acc, item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {} as Record<string, ForecastItem[]>);

    const dailySummaries: DailyData[] = Object.entries(grouped).map(([date, dayItems]) => {
        const avgTemp =
        dayItems.reduce((sum, i) => sum + convertTemp(i.main.temp), 0) / dayItems.length;

        const description = dayItems[0].weather.description;
        const icon = dayItems[0].weather.icon;

        return { date, avgTemp: parseFloat(avgTemp.toFixed(1)), description, icon, items: dayItems };
    });

    return (
        <div>
            <DailyContainer>
                {dailySummaries.map((day) => (
                <DayCard
                    key={day.date}
                    onClick={() =>
                    setSelectedDate(selectedDate === day.date ? null : day.date)
                    }
                    $selected={selectedDate === day.date}
                >
                    <DayDate>{day.date}</DayDate>
                    <DayTemp>{day.avgTemp}°{unit}</DayTemp>
                    <img
                        src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                        alt={day.description}
                        width={40}
                        height={40}
                    />
                    <DayDescription>{day.description}</DayDescription>
                </DayCard>
                ))}
            </DailyContainer>

            {selectedDate && (
                <ForecastHourlyList
                items={grouped[selectedDate]}
                unit={unit}
                />
            )}
        </div>
    );
};

export default DailyForecast;


