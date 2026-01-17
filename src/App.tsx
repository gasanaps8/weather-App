import React from 'react';
import CitySearch from './components/CitySearch';
import './App.css'

const App: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <CitySearch />
    </div>
  );
};

export default App;