
import React, {useEffect, useContext} from 'react';
import { render } from 'react-dom';
import MapDisplay from './components/MapDisplay.jsx';
import MarkerForm from './components/MarkerForm.jsx';
import ImageDisplay from './components/ImageDisplay.jsx';
import MarkerInfoBox from './components/MarkerInfoBox.jsx';
import TagSearch from "./components/TagSearch";
import style from './style.css'
import { Animated } from 'react-animated-css';
import { MapDisplayProvider} from "./context/MapDisplayContext";
import { makeStyles } from '@material-ui/core/styles';
//this one renders ya know the app.
const App = (props) => {
   return (
    <div id="map">
      <MapDisplayProvider>
      {/* header / title */}
      {/* map display */}
        <MapDisplay />
          {/*<h1 className="title">*/}
          {/*  Dear Travel Diary...*/}
          {/*</h1>*/}
        <TagSearch/>
        {/* Tag and description to the right of the map */}
    </MapDisplayProvider>
    </div>
   )
};
export default App;
