// TemperatureGraph.tsx
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  type DotItemDotProps,
} from 'recharts';
import { useTheme } from 'styled-components';
import type { ForecastItem } from '../types/weather';
import {
  ChartWrapper,
  ChartInner,
  ChartTitle,
  ChartContainer,
} from '../styles/TemperatureGraph.styles';

interface TemperatureGraphProps {
  items: ForecastItem[];
  unit: 'C' | 'F';
}

// Custom dot with weather icon
const CustomDot = ({ cx, cy, payload }: DotItemDotProps) => {
  if (!cx || !cy || !payload) return null;

  return (
    <image
      href={`https://openweathermap.org/img/wn/${payload.icon}.png`}
      x={cx - 12}
      y={cy - 26}
      width={24}
      height={24}
    />
  );
};

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({ items, unit }) => {
  const theme = useTheme();

  const convertTemp = (kelvin: number) =>
    unit === 'C' ? kelvin - 273.15 : (kelvin - 273.15) * 9 / 5 + 32;

  const data = items.map((item) => ({
    time: item.dt_txt.slice(11, 16),
    temp: Number(convertTemp(item.main.temp).toFixed(1)),
    icon: item.weather.icon,
  }));

  return (
    <ChartContainer>
      <ChartTitle>Temperature Forecast</ChartTitle>

      <ChartWrapper>
        <ChartInner points={data.length}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={theme.colors.graphArea}
                    stopOpacity={0.6}
                  />
                  <stop
                    offset="100%"
                    stopColor={theme.colors.graphArea}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke={theme.colors.graphGrid}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="time"
                tick={{ fill: theme.colors.graphAxis, fontSize: 12 }}
                axisLine={{ stroke: theme.colors.graphAxis }}
                tickLine={false}
              />

              <YAxis
                unit={`°${unit}`}
                tick={{ fill: theme.colors.graphAxis, fontSize: 12 }}
                axisLine={{ stroke: theme.colors.graphAxis }}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: theme.colors.graphTooltipBg,
                  border: 'none',
                  borderRadius: 8,
                  color: theme.colors.graphTooltipText,
                }}
                labelStyle={{ color: theme.colors.graphTooltipText }}
                formatter={(value: number | undefined) =>
                    value != null ? `${value}°${unit}` : ''
                }
                labelFormatter={(label) => `Time: ${label}`}
              />

              <Area
                type="monotone"
                dataKey="temp"
                stroke={theme.colors.graphLine}
                fill="url(#tempGradient)"
                strokeWidth={3}
                dot={CustomDot}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartInner>
      </ChartWrapper>
    </ChartContainer>
  );
};

export default TemperatureGraph;
