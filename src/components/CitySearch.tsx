import React, { useState } from 'react';
import { getWeatherForecast } from '../services/weatherService';
import ForecastHourlyList from './ForcastHourlyList';
import TemperatureGraph from './TemperatureGraph';
import type { Forecast } from '../types/forecast';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { breakpoints } from '../styles/GlobalStyle';
import logo from '../assets/logo.png';

import {
    Container,
    LogoImg,
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
    MainFuncionalities,
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
    .required('City is required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(
      /^[\p{L}\s]+$/u,
      'City name must contain only letters'
    ),
});

const CitySearch: React.FC = () => {

    const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`);

    const [forecast, setForecast] = useState<Forecast | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<TempUnit>('C');

    type ViewType = 'forecast' | 'graph' | 'daily' | 'map' | null;
    const [activeView, setActiveView] = useState<ViewType>(null);

    const convertTemp = (kelvin: number, unit: TempUnit) => {
        return unit === 'C'
        ? kelvin - 273.15
        : (kelvin - 273.15) * 9 / 5 + 32;
    };

    const handleLogoClick = () => {
        window.location.reload();
    };

    const handleLoadForecast = async (city: string) => {
        setLoading(true);
        setError(null);
        setForecast(null);

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
            <LogoImg src={logo} alt="Weather App Logo" onClick={handleLogoClick} />

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

                <GeneralInfo>
                    <img
                    src={`https://openweathermap.org/img/wn/${forecast.list[0].weather.icon}.png`}
                    alt={forecast.list[0].weather.description}
                    width={40}
                    height={40}
                    />
                </GeneralInfo>

                <MainFuncionalities>
                    <Dropdown value={unit} onChange={handleUnitChange}>
                        <option value="C">Celsius (°C)</option>
                        <option value="F">Fahrenheit (°F)</option>
                    </Dropdown>

                    {!isMobile && (
                        <ButtonRow>
                            <Button onClick={() => setActiveView(activeView === 'forecast' ? null : 'forecast')}>
                            3H Forecast
                            </Button>

                            <Button onClick={() => setActiveView(activeView === 'graph' ? null : 'graph')}>
                            Temperature Graph
                            </Button>

                            <Button onClick={() => setActiveView(activeView === 'daily' ? null : 'daily')}>
                            Daily Forecast
                            </Button>

                            <Button onClick={() => setActiveView(activeView === 'map' ? null : 'map')}>
                            Temperature Map
                            </Button>
                        </ButtonRow>
                    )}
                    {isMobile && (
                        <Dropdown
                            value={activeView ?? ''}
                            onChange={(e) => setActiveView(e.target.value as ViewType)}
                        >
                            <option value="">Select view</option>
                            <option value="forecast">3H Forecast</option>
                            <option value="graph">Temperature Graph</option>
                            <option value="daily">Daily Forecast</option>
                            <option value="map">Temperature Map</option>
                        </Dropdown>
                    )}
                </MainFuncionalities>
                </>
            )}

            {forecast && activeView === 'forecast' && (
                <ForecastHourlyList items={forecast.list} unit={unit} />
                )}

                {forecast && activeView === 'graph' && (
                <TemperatureGraph items={forecast.list} unit={unit} />
                )}

                {forecast && activeView === 'daily' && (
                <DailyForecast items={forecast.list} unit={unit} />
                )}

                {forecast && activeView === 'map' && (
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
