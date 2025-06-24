import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

const RoutingMachine = ({ source, destination }) => {
  const map = useMapEvents({});
  const routingControlRef = useRef(null);

  useEffect(() => {
    // Ensure that the map is ready before performing any operations
    if (!map) return;

    // Remove the existing routing control if present
    if (routingControlRef.current) {
      try {
        map.removeControl(routingControlRef.current);
      } catch (err) {
        console.error("Error while removing routing control:", err);
      }
    }

    // Add new routing control if both source and destination exist
    if (source && destination) {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(source[0], source[1]),
          L.latLng(destination[0], destination[1]),
        ],
        routeWhileDragging: true,
      }).addTo(map);
    }

    // Clean up function to remove the routing control when the component unmounts
    return () => {
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch (err) {
          console.error("Error during cleanup of routing control:", err);
        }
      }
    };
  }, [source, destination, map]);

  return null;
};

const LocationMarker = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
};

const MapWithRouting = () => {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {source && <Marker position={source}></Marker>}
      {destination && <Marker position={destination}></Marker>}

      <RoutingMachine source={source} destination={destination} />

      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
        <h4>Set Source & Destination</h4>
        <button onClick={() => setSource(null)}>Clear Source</button>
        <button onClick={() => setDestination(null)}>Clear Destination</button>

        <p>Click on the map to select positions</p>
      </div>

      <LocationMarker setPosition={setSource} />
      <LocationMarker setPosition={setDestination} />
    </MapContainer>
  );
};

function Map() {
  return (
    <div>
      <MapWithRouting />
    </div>
  );
}

export default Map;
