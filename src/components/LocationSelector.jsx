// LocationSelector.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useGeolocated } from 'react-geolocated';
import 'leaflet/dist/leaflet.css';

const LocationSelector = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]); // Default coordinates (London)

  const { coords, getCurrentPosition } = useGeolocated();

  useEffect(() => {
    if (coords) {
      setPosition([coords.latitude, coords.longitude]);
      setMarkerPosition([coords.latitude, coords.longitude]);
    }
  }, [coords]);

  // Handle manual address search (simplified)
  const handleSearch = (event) => {
    // This should ideally call a geocoding API (e.g., Google Maps API, OpenStreetMap, etc.)
    // Here we simulate it with static coordinates for simplicity.
    if (event.target.value === 'Paris') {
      setMarkerPosition([48.8566, 2.3522]);
    } else if (event.target.value === 'New York') {
      setMarkerPosition([40.7128, -74.0060]);
    }
    setAddress(event.target.value);
  };

  // Locate user button handler
  const locateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition([latitude, longitude]);
      });
    }
  };

  return (
    <div className="relative w-full h-[500px]">
      {/* Location Input */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10 p-2 bg-white shadow-md rounded-md">
        <input
          type="text"
          value={address}
          onChange={handleSearch}
          placeholder="Search for an address"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={locateMe}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Locate Me
        </button>
      </div>

      {/* Map */}
      <MapContainer center={markerPosition} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        <Marker position={markerPosition}>
          <Popup>{address || 'Selected Location'}</Popup>
        </Marker>

        {/* Map events for adjusting marker */}
        <MapWithMarkerUpdate markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
      </MapContainer>
    </div>
  );
};

// Component for handling map interactions (dragging the marker)
const MapWithMarkerUpdate = ({ markerPosition, setMarkerPosition }) => {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setMarkerPosition([lat, lng]);
    },
  });

  return <Marker position={markerPosition} draggable={true} eventHandlers={{ dragend: (e) => setMarkerPosition([e.target.getLatLng().lat, e.target.getLatLng().lng]) }} />;
};

export default LocationSelector;
