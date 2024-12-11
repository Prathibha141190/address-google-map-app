import React, { useState, useEffect } from "react";
import ManualSearch from "./ManualSearch";
import LocationSelector from "./LocationSelector";

function LocationModal() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [isManualSearch, setIsManualSearch] = useState(false);
  const [address, setAddress] = useState("");

  // Request user location
  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          alert(`Location enabled: Latitude ${latitude}, Longitude ${longitude}`);
          setIsModalVisible(false)
       render(
        <div className="mt-4 space-x-4">
        <Link to="/selecter" className="text-lg px-4 py-2 bg-red-500 text-white rounded">Your Location</Link>
       </div>
       )
          
        },
        () => {
          alert("Location permission denied.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Toggle manual address search
  const handleManualSearch = () => {
    setIsManualSearch(true);
    setIsModalVisible(false);
  };

  // Initialize Google Maps Autocomplete
  const initializeGoogleMaps = () => {
    if (!window.google) return;
    const input = document.getElementById("address-input");
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        setAddress(place.formatted_address);
        alert(`Selected address: ${place.formatted_address}\nLat: ${latitude}, Lng: ${longitude}`);
      }
    });
  };

  useEffect(() => {
    if (isManualSearch) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDmbMcl3DcDZC6nvKkWRDOGs-PT6Kk8bVc&libraries=places`;
      script.async = true;
      script.onload = initializeGoogleMaps;
      document.body.appendChild(script);
    }
  }, [isManualSearch]);

  return (
    <>
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800">
              Location Permission Required
            </h2>
            <p className="mt-2 text-gray-600">
              Your location permission is turned off. Enable location for a better experience or manually search for your address.
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={enableLocation}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Enable Location
              </button>
              <button
                onClick={handleManualSearch}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Search Manually
              </button>
            </div>
          </div>
        </div>
      )}
      {isManualSearch && (
        <div className="p-6">
          <h3 className="text-lg font-semibold">Manual Address Search</h3>
          <input
            id="address-input"
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Enter your address"
          />
          <ManualSearch/>
        </div>
      )}
    </>
  );
}

export default LocationModal;
