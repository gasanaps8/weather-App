import React from 'react';
import CitySearch from './components/CitySearch';
import { GlobalStyle } from './styles/GlobalStyle';

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <CitySearch />
    </div>
  );
};

export default App;