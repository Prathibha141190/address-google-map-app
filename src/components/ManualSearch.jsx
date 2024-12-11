import React, { useRef } from "react";

const ManualSearch = () => {
  const inputRef = useRef(null);

  const handlePlaceSelect = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log(place.formatted_address); // Use this address as needed
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search your address"
        ref={inputRef}
        onFocus={handlePlaceSelect}
      />
    </div>
  );
};

export default ManualSearch;
