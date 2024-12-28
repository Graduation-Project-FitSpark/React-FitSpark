import React, { useState, useEffect } from "react";
import "./LocationsMap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import URL from "../../../enum/enum";

const LocationsMap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${URL}/getAllLocations`);
        setLocations(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching locations", error);
        alert("Failed to load locations");
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="map-container">
      <MapContainer
        className="map"
        center={[32.314558, 35.029778]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => {
          const [latitude, longitude] = JSON.parse(location.Location);
          return (
            <Marker key={index} position={[latitude, longitude]}>
              <Popup>
                <div className="marker-popup">
                  <p className="username-text">{location.Username}</p>
                  {location.img && (
                    <img
                      src={location.img}
                      alt="User"
                      className="popup-image"
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="description">
        Locations of users who signed up with Fitspark
      </div>
    </div>
  );
};

export default LocationsMap;
