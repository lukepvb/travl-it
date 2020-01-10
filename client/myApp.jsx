import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import DestinationDisplay from './components/DestinationDisplay.jsx';
import { MapDisplayProvider } from './context/MapDisplayContext.js';


const MyApp = props => {
  return (
    <div className="router">
      <h1>App</h1>
        <MapDisplayProvider>
          <DestinationDisplay />
        </MapDisplayProvider>
    </div>
  );
}

export default MyApp;
