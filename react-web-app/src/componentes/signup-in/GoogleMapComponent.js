import React, { useEffect, useState } from "react";

const GoogleMapComponent = ({ address }) => {
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (address) {
      const geocodeAddress = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_GOOGLE_MAPS_API_KEY`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            initMap(location.lat, location.lng);
          } else {
            setError("Unable to find the location. Please check the address.");
          }
        } catch (error) {
          setError("Failed to load the map. Please try again.");
          console.error("Error fetching geocoding data:", error);
        }
      };

      geocodeAddress();
    }
  }, [address]);

  const initMap = (lat, lng) => {
    const mapOptions = {
      center: { lat, lng },
      zoom: 12,
    };

    const map = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );
    setMap(map);

    new window.google.maps.Marker({
      position: { lat, lng },
      map: map,
    });
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div id="map" style={{ width: "100%", height: "400px" }}></div>
      )}
    </div>
  );
};

export default GoogleMapComponent;
