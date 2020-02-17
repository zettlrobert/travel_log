import React, { useState, useEffect, Fragment } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';


import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setaddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 47.7525, //Hausham
    longitude: 11.8372,
    zoom: 5
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
    })();


    return () => {
      // cleanup
    };
  }, [])



  const showAddMarkerPopup = (event) => {
    console.log(event);

    // Destructure Event out of event
    const [longitude, latitude] = event.lngLat;

    setaddEntryLocation({
      longitude,
      latitude
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >

      {
        logEntries.map(entry => (
          <Fragment
            key={entry._id}
          >
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
                onClick={() => setShowPopup({
                  [entry._id]: true,
                })}
              >
                <svg
                  className="marker"
                  style={{
                    width: `${6 * viewport.zoom}`,
                    height: `${6 * viewport.zoom}`,
                  }}
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>

            </Marker >

            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div
                    className="popup"
                  >
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
                    <p>{entry.personalComment}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()} </small>
                  </div>
                </Popup>
              ) : null
            }

          </Fragment>
        ))
      }

      {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >
              <div>
                <svg
                  className="marker-2"
                  style={{
                    width: `${6 * viewport.zoom}`,
                    height: `${6 * viewport.zoom}`,
                  }}
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>

            </Marker >
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              dynamicPosition={true}
              onClose={() => setaddEntryLocation(null)}
              anchor="top" >
              <div
                className="popup"
              >
                <h3>Add new log entry</h3>
              </div>
            </Popup>
          </>
        ) : null
      }

    </ReactMapGL >
  );
}

export default App;
