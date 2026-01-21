import React from 'react';
import type { ForecastItem } from '../types/weather';
import { ForecastList } from '../styles/ForcastHourlyList.styles';
import ForecastCardItem from './ForecastCardItem';

interface ForecastHourlyListProps {
    items: ForecastItem[];
    unit: 'C' | 'F';
}

const ForecastHourlyList: React.FC<ForecastHourlyListProps> = ({ items, unit }) => {
    return (
        <ForecastList>
            {items.map((item) => (
                <ForecastCardItem key={item.dt} item={item} unit={unit} />
            ))}
        </ForecastList>
    );
};

export default ForecastHourlyList;
