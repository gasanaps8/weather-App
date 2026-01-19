import React, { useState } from 'react';
import { getWeatherForecast } from '../services/weatherService';
import ForecastHourlyList from './ForcastHourlyList';
import TemperatureGraph from './TemperatureGraph';
import type { Forecast } from '../types/forecast';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
    Container,
    Title,
    Button,
    GeneralInfoContainer,
    GeneralInfo,
    FormContainer, 
    InputRow,
    CityField, 
    SubmitButton,
    ErrorText,
    Dropdown,
    ButtonRow,
} from '../styles/CitySearch.styles';
import DailyForecast from './DailyForecast';
import TemperatureMap from './TemperatureMap';

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="23" y1="23" x2="18.65" y2="18.65" />
  </svg>
);

type TempUnit = 'C' | 'F';

interface ApiError {
    cod: number | string;
    message: string;
}

const CitySchema = Yup.object().shape({
  city: Yup.string()
    .required("City is required")
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z\s]+$/, "City name must contain only letters"),
    
});

const CitySearch: React.FC = () => {
    const [forecast, setForecast] = useState<Forecast | null>(null);
    const [showForecast, setShowForecast] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [showDaily, setShowDaily] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<TempUnit>('C');

    const convertTemp = (kelvin: number, unit: TempUnit) => {
        return unit === 'C'
        ? kelvin - 273.15
        : (kelvin - 273.15) * 9 / 5 + 32;
    };

    const handleLoadForecast = async (city: string) => {
        setLoading(true);
        setError(null);
        setForecast(null);
        setShowForecast(false);
        setShowGraph(false);

        try {
            const data = await getWeatherForecast(city);
            setForecast(data);
        } catch (err) {
            const apiError = err as ApiError;

            if (apiError?.cod === 401 || apiError?.cod === '401') {
                setError('Trouble using API key. Please try again later.');
            } else if (apiError?.message) {
                setError(apiError.message);
            } else {
                setError('Unexpected error occurred. Please try again.');
            }
            } finally {
            setLoading(false);
        }
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUnit(e.target.value as TempUnit);
    };

    return (
        <Container>
        <Title>Weather App</Title>

        <Formik
            initialValues={{
                city: '',
            }}
            validationSchema={CitySchema}
            onSubmit={async (values, { setSubmitting }) => {
                await handleLoadForecast(values.city);
                setSubmitting(false);
            }}
        >
            {({ errors, touched }) => (
                <FormContainer>
                    <InputRow>
                        <CityField
                            type="text"
                            name="city"
                            placeholder="Enter city name"
                        />
                        <SubmitButton  type="submit" disabled={loading}>
                            <SearchIcon />
                        </SubmitButton >
                    </InputRow>

                    {errors.city && touched.city && (
                        <ErrorText>{errors.city}</ErrorText>
                    )}

                    {error && <ErrorText>{error}</ErrorText>}

                </FormContainer>
             )}
        </Formik>
        
        {!error && forecast && (
            <>
            <GeneralInfoContainer>
                <GeneralInfo>
                    {forecast.location.name}, {forecast.location.country}
                </GeneralInfo>

                <GeneralInfo>
                    {forecast.list[0]
                    ? `${convertTemp(
                        forecast.list[0].main.temp,
                        unit
                        ).toFixed(1)}°${unit}`
                    : '--'}
                </GeneralInfo>
            </GeneralInfoContainer>

            <GeneralInfo>
                    {forecast.list[0].weather.description}
            </GeneralInfo>

            <Dropdown value={unit} onChange={handleUnitChange}>
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
            </Dropdown>

            <ButtonRow>
                <Button onClick={() => {
                    setShowForecast(prev => !prev);
                    setShowGraph(false);
                    setShowDaily(false);
                    setShowMap(false);
                }}>
                    {showForecast ? 'Hide 3H Forecast' : 'Show 3H Forecast'}
                </Button>

                <Button onClick={() => {
                    setShowGraph(prev => !prev);
                    setShowForecast(false);
                    setShowDaily(false);
                    setShowMap(false);
                }}>
                    {showGraph ? 'Hide Temperature Graph' : 'Show Temperature Graph'}
                </Button>

                <Button onClick={() => {
                    setShowDaily(prev => !prev);
                    setShowForecast(false);
                    setShowGraph(false);
                    setShowMap(false);
                }}>
                    {showDaily ? 'Hide Daily Forecast' : 'Show Daily Forecast'}
                </Button>

                <Button onClick={() => {
                    setShowMap(prev => !prev);
                    setShowForecast(false);
                    setShowGraph(false);
                    setShowDaily(false);
                }}>
                    {showMap? 'Hide Temperature Map' : 'Show Temperature Map'}
                </Button>
            </ButtonRow>
            </>
        )}

        {!error && forecast && showForecast && (
            <ForecastHourlyList items={forecast.list} unit={unit} />
        )}

        {!error && forecast && showGraph && (
            <TemperatureGraph items={forecast.list} unit={unit} />
        )}

        {!error && forecast && showDaily && (
            <DailyForecast items={forecast.list} unit={unit} />
        )}

        {!error && forecast && showMap &&(
            <TemperatureMap
                cityLat={forecast.location.lat}
                cityLng={forecast.location.lon}
                forecast={forecast.list}
            />
        )}
        </Container>
    );
};

export default CitySearch;
