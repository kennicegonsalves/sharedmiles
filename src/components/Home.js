// import { useContext, useRef, useEffect } from 'react';
// import Header from './Header';
// import AddressPicker from './AddressPicker';
// import RideList from './RideList';
// import RideDetail from './RideDetail';
// import { Context } from "../Context"; // Correct
// import mapboxgl from 'mapbox-gl';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import './Home.css';

// mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_API_KEY;

// const style = {
//   width: "100%",
//   height: "100vh",
//   position: "absolute",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
// };

// function Home() {
//   const { selectedFrom, selectedTo, user, currentRide } = useContext(Context);
//   const mapContainerRef = useRef(null);
//   const map = useRef(null);

//   // Initialize map
//   useEffect(() => {
//     if (map.current) return; // Avoid reinitializing

//     map.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11', // Mapbox style
//       center: [72.8383887488845, 19.17811183640418], // Initial center coordinates
//       zoom: 13,
//     });

//     // Add event listener for 'load' event
//     map.current.on('load', () => {
//       if (selectedFrom && selectedTo) {
//         drawRoute([selectedFrom.x, selectedFrom.y], [selectedTo.x, selectedTo.y]);
//       }
//     });

//     return () => {
//       if (map.current) {
//         map.current.remove();
//         map.current = null;
//       }
//     };
//   }, []);

//   // Draw route based on selected source and destination
//   useEffect(() => {
//     if (map.current && selectedFrom && selectedTo) {
//       if (map.current.isStyleLoaded()) {
//         if (isValidCoordinates(selectedFrom) && isValidCoordinates(selectedTo)) {
//           drawRoute([selectedFrom.x, selectedFrom.y], [selectedTo.x, selectedTo.y]);
//         }
//       } else {
//         map.current.once('load', () => {
//           if (isValidCoordinates(selectedFrom) && isValidCoordinates(selectedTo)) {
//             drawRoute([selectedFrom.x, selectedFrom.y], [selectedTo.x, selectedTo.y]);
//           }
//         });
//       }
//     }
//   }, [selectedFrom, selectedTo]);

//   const drawRoute = (src, dest) => {
//     const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${src[0]},${src[1]};${dest[0]},${dest[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         const route = data.routes[0]?.geometry?.coordinates; // Defensive check here
//         if (!route) return; // If no valid route, don't proceed

//         const geojson = {
//           type: 'Feature',
//           properties: {},
//           geometry: {
//             type: 'LineString',
//             coordinates: route,
//           },
//         };

//         // If a route already exists on the map, remove it
//         if (map.current.getSource('route')) {
//           map.current.getSource('route').setData(geojson);
//         } else {
//           // Ensure the map is fully loaded before adding the layer
//           map.current.addLayer({
//             id: 'route',
//             type: 'line',
//             source: {
//               type: 'geojson',
//               data: geojson,
//             },
//             layout: {
//               'line-join': 'round',
//               'line-cap': 'round',
//             },
//             paint: {
//               'line-color': '#3887be',
//               'line-width': 5,
//               'line-opacity': 0.75,
//             },
//           });
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching the route: ", error);
//       });
//   };

//   // Helper function to check if coordinates are valid
//   const isValidCoordinates = (coord) => {
//     return coord && typeof coord.x === 'number' && typeof coord.y === 'number';
//   };

//   // Render the sidebar based on user role and ride details
//   const renderSidebar = () => {
//     const isUser = user && user.role === 'user';
//     if (isUser && !currentRide) return <AddressPicker />;
//     if (isUser && currentRide) return <RideDetail user={currentRide.driver} isDriver={false} currentRide={currentRide} />;
//     if (!isUser && !currentRide) return <RideList />;
//     if (!isUser && currentRide) return <RideDetail user={currentRide.requestor} isDriver={true} currentRide={currentRide} />;
//   };

//   return (
//     <>
//       <Header />
//       <div ref={mapContainerRef} id="map" style={style} />
//       {renderSidebar()}
//     </>
//   );
// }

// export default Home;










// Under Progress........................
import { useContext, useRef, useEffect, useCallback } from 'react';
import Header from './Header';
import AddressPicker from './AddressPicker';
import RideList from './RideList';
import RideDetail from './RideDetail';
import { Context } from "../Context"; // Correct
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Home.css';

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_API_KEY;

const style = {
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

function Home() {
  const { selectedFrom, selectedTo, user, currentRide } = useContext(Context);
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  // Function to draw route, memoized with useCallback
  const drawRoute = useCallback((src, dest) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${src[0]},${src[1]};${dest[0]},${dest[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const route = data.routes[0]?.geometry?.coordinates;
        if (!route) return;

        const geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route,
          },
        };

        if (map.current.getSource('route')) {
          map.current.getSource('route').setData(geojson);
        } else {
          map.current.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: geojson,
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#ff0000',
              'line-width': 5,
              'line-opacity': 0.75,
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching the route: ", error);
      });
  }, []);

  // Initialize map
  useEffect(() => {
    if (map.current) return; // Avoid reinitializing

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [72.8383887488845, 19.17811183640418],
      zoom: 13,
    });

    map.current.on('load', () => {
      if (selectedFrom && selectedTo) {
        drawRoute([selectedFrom.x, selectedFrom.y], [selectedTo.x, selectedTo.y]);
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [drawRoute, selectedFrom, selectedTo]);

  // Draw route based on selected source and destination
  useEffect(() => {
    if (map.current && selectedFrom && selectedTo) {
      if (map.current.isStyleLoaded()) {
        if (isValidCoordinates(selectedFrom) && isValidCoordinates(selectedTo)) {
          drawRoute([selectedFrom.x, selectedFrom.y], [selectedTo.x, selectedTo.y]);
        }
      } else {
        map.current.once('load', () => {
          if (isValidCoordinates(selectedFrom) && isValidCoordinates(selectedTo)) {
            drawRoute([selectedFrom.x, selectedFrom.y], [selectedTo.x, selectedTo.y]);
          }
        });
      }
    }
  }, [selectedFrom, selectedTo, drawRoute]);

  const isValidCoordinates = (coord) => {
    return coord && typeof coord.x === 'number' && typeof coord.y === 'number';
  };

  const renderSidebar = () => {
    const isUser = user && user.role === 'user';
    if (isUser && !currentRide) return <AddressPicker />;
    if (isUser && currentRide) return <RideDetail user={currentRide.driver} isDriver={false} currentRide={currentRide} />;
    if (!isUser && !currentRide) return <RideList />;
    if (!isUser && currentRide) return <RideDetail user={currentRide.requestor} isDriver={true} currentRide={currentRide} />;
  };

  return (
    <>
      <Header />
      <div ref={mapContainerRef} id="map" style={style} />
      {renderSidebar()}
    </>
  );
}

export default Home;












//    Old latest working code

// import { useContext, useRef, useEffect, useCallback } from 'react';
// import Header from './Header';
// import AddressPicker from './AddressPicker';
// import RideList from './RideList';
// import RideDetail from './RideDetail';
// import Context from '../Context';
// import L from "leaflet";
// import 'mapbox-gl-leaflet';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import './Home.css';

// require("leaflet-routing-machine");

// const style = {
//   width: "100%",
//   height: "100vh",
//   position: "absolute",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
// };

// function Home() {
//   const { selectedFrom, selectedTo, user, currentRide } = useContext(Context);
//   const map = useRef(null);
//   const routeControl = useRef(null);

//   useEffect(() => {
//     if (!map.current) {
//       initMap();
//       initRouteControl();
//     }

//     // Clean-up function to remove map instance on component unmount
//     return () => {
//       if (map.current) {
//         map.current.remove();
//         map.current = null;
//       }
//     };
//   }, []);

//   const drawRoute = useCallback((from, to) => {
//     if (shouldRouteDraw(from, to) && routeControl.current) {
//       const fromLatLng = new L.LatLng(from.y, from.x);
//       const toLatLng = new L.LatLng(to.y, to.x);
//       routeControl.current.setWaypoints([fromLatLng, toLatLng]);
//     }
//   }, []);

//   useEffect(() => {
//     if (shouldRouteDraw(selectedFrom, selectedTo)) {
//       drawRoute(selectedFrom, selectedTo);
//     }
//   }, [selectedFrom, selectedTo, drawRoute]);

//   const shouldRouteDraw = (from, to) => {
//     return from && to && from.label && to.label && from.x && to.x && from.y && to.y;   
//   };

//   const initMap = () => {
//     map.current = L.map("map", {
//       center: [19.17811183640418, 72.8383887488845],
//       zoom: 13,
//     });

//     // Use Mapbox GL layer to avoid the "tiled" effect
//     L.mapboxGL({
//       accessToken: process.env.REACT_APP_MAP_BOX_API_KEY,
//       style: 'mapbox://styles/mapbox/streets-v11'
//     }).addTo(map.current);
//   };

//   const initRouteControl = () => {
//     routeControl.current = L.Routing.control({
//       show: true,
//       fitSelectedRoutes: true,
//       plan: false,
//       lineOptions: {
//         styles: [{ color: "blue", opacity: "0.7", weight: 6 }]
//       },
//       router: L.Routing.mapbox(`${process.env.REACT_APP_MAP_BOX_API_KEY}`)
//     }).addTo(map.current);
  
//     routeControl.current.on('routesfound', () => {
//       const routeLayer = routeControl.current._line;
//       if (routeLayer) {
//         routeLayer.setZIndex(1000);
//       }
//     });
//   };

//   const renderSidebar = () => {
//     const isUser = user && user.role === 'user';
//     if (isUser && !currentRide) return <AddressPicker />;
//     if (isUser && currentRide) return <RideDetail user={currentRide.driver} isDriver={false} currentRide={currentRide} />;
//     if (!isUser && !currentRide) return <RideList />;
//     if (!isUser && currentRide) return <RideDetail user={currentRide.requestor} isDriver={true} currentRide={currentRide} />;
//   };

//   return (
//     <>
//       <Header />
//       <div id="map" style={style} />
//       {renderSidebar()}
//     </>
//   );
// }

// export default Home;












// import { useContext, useRef, useEffect, useCallback } from 'react';
// import Header from './Header';
// import AddressPicker from './AddressPicker';
// import RideList from './RideList';
// import RideDetail from './RideDetail';
// import Context from '../Context';
// import L from "leaflet";
// import "leaflet-routing-machine";

// const style = {
//   width: "100%",
//   height: "100vh",
//   position: "relative" // Ensure proper positioning
// };

// function Home() {
//   const { selectedFrom, selectedTo, user, currentRide } = useContext(Context);
//   const map = useRef(null);
//   const routeControl = useRef(null);

//   useEffect(() => {
//     initMap();
//     initRouteControl();

//     // Call invalidateSize to fix tile display issues
//     if (map.current) {
//       setTimeout(() => {
//         map.current.invalidateSize();
//       }, 0);
//     }
//   }, []);

//   const drawRoute = useCallback((from, to) => {
//     if (shouldRouteDraw(from, to) && routeControl.current) {
//       const fromLatLng = new L.LatLng(from.y, from.x);
//       const toLatLng = new L.LatLng(to.y, to.x);
//       routeControl.current.setWaypoints([fromLatLng, toLatLng]);
//     }
//   }, []);

//   useEffect(() => {
//     if (shouldRouteDraw(selectedFrom, selectedTo)) {
//       drawRoute(selectedFrom, selectedTo);
//     }
//   }, [selectedFrom, selectedTo, drawRoute]);

//   /**
//    * Check if a route should be drawn
//    * @param {*} selectedFrom 
//    * @param {*} selectedTo 
//    */
//   const shouldRouteDraw = (selectedFrom, selectedTo) => {
//     return selectedFrom && selectedTo && selectedFrom.label &&
//       selectedTo.label && selectedFrom.x && selectedTo.x &&
//       selectedFrom.y && selectedTo.y;
//   };

//   /**
//    * Initialize Leaflet map
//    */
//   const initMap = () => {
//     if (!map.current) {
//       map.current = L.map("map", {
//         center: [38.8951, -77.0364],
//         zoom: 13,
//         layers: [
//           L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           })
//         ]
//       });
//     }
//   };

//   /**
//    * Initialize Route Control
//    */
//   const initRouteControl = () => {
//     if (map.current && !routeControl.current) {
//       routeControl.current = L.Routing.control({
//         show: true,
//         fitSelectedRoutes: true,
//         plan: false,
//         lineOptions: {
//           styles: [
//             {
//               color: "blue",
//               opacity: 0.7,
//               weight: 6
//             }
//           ]
//         },
//         router: L.Routing.mapbox(`${process.env.REACT_APP_MAP_BOX_API_KEY}`)
//       })
//         .addTo(map.current)
//         .getPlan();
//     }
//   };

//   const renderSidebar = () => {
//     const isUser = user && user.role === 'user';
//     if (isUser && !currentRide) {
//       return <AddressPicker />
//     }
//     if (isUser && currentRide) {
//       return <RideDetail user={currentRide.driver} isDriver={false} currentRide={currentRide} />
//     }
//     if (!isUser && !currentRide) {
//       return <RideList />
//     }
//     if (!isUser && currentRide) {
//       return <RideDetail user={currentRide.requestor} isDriver={true} currentRide={currentRide} />
//     }
//     return null;
//   };

//   return (
//     <>
//       <Header />
//       <div id="map" style={style} />
//       {renderSidebar()}
//     </>
//   );
// }

// export default Home;













// // import useRef, useEffect, useCallback
// import { useRef, useEffect, useCallback } from 'react';
// // import custom components.
// import Header from './Header';
// // import leaflet
// import L from "leaflet";

// require("leaflet-routing-machine");

// const style = {
//   width: "100%",
//   height: "100vh"
// };

// function Home() {
  
//   const map = useRef();
//   const routeControl = useRef();

//   useEffect(() => {
//     initMap();
//     initRouteControl();
//   }, []);

//   /**
//    * Dummy function to simulate route drawing. Uses static coordinates.
//    */
//   const drawRoute = useCallback(() => {
//     const from = { x: -77.0364, y: 38.8951 }; // Sample coordinates (Washington DC)
//     const to = { x: -77.0416, y: 38.8977 }; // Another point nearby
//     const fromLatLng = new L.LatLng(from.y, from.x);
//     const toLatLng = new L.LatLng(to.y, to.x);
//     if (routeControl && routeControl.current) {
//       routeControl.current.setWaypoints([fromLatLng, toLatLng]);
//     }
//   }, []);

//   useEffect(() => {
//     drawRoute();
//   }, [drawRoute]);

//   /**
//    * init leaflet map.
//    */
//   const initMap = () => {
//     map.current = L.map("map", {
//       center: [38.8951, -77.0364],
//       zoom: 13,
//       layers: [
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         })
//       ]
//     });
//   };

//   /**
//    * init route control.
//    */
//   const initRouteControl = () => {
//     routeControl.current = L.Routing.control({
//       show: true,
//       fitSelectedRoutes: true,
//       plan: false,
//       lineOptions: {
//         styles: [
//           {
//             color: "blue",
//             opacity: "0.7",
//             weight: 6
//           }
//         ]
//       },
//       // Replace router to avoid backend calls and use default
//       router: L.Routing.osrmv1({
//         serviceUrl: 'https://router.project-osrm.org/route/v1'
//       })
//     })
//       .addTo(map.current);
//   };

//   const renderSidebar = () => {
//     return (
//       <div style={{ padding: "20px", backgroundColor: "#fff", position: "absolute", top: "10px", right: "10px", zIndex: 1000 }}>
//         <p>Welcome to the map!</p>
//         <p>This is a demo sidebar content.</p>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Header />
//       <div id="map" style={style} />
//       {renderSidebar()}
//     </>
//   );
// }

// export default Home;
