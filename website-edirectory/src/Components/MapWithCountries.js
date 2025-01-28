import React, { useState } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

const MapWithCountries = ({ onCountryClick }) => {
    const countries = [
        {
          name: "Tunisia",
          coordinates: [
            { lat: 37.3428, lng: 10.0304 },
            { lat: 33.8869, lng: 9.5375 },
            { lat: 32.0000, lng: 10.0000 },
            { lat: 34.0000, lng: 8.0000 },
          ],
        },
        {
          name: "Algeria",
          coordinates: [
            { lat: 36.7529, lng: 3.0420 },
            { lat: 28.0339, lng: 1.6596 },
            { lat: 24.0000, lng: 5.0000 },
            { lat: 34.0000, lng: -1.0000 },
          ],
        },
        {
          name: "France",
          coordinates: [
            { lat: 46.6034, lng: 1.8883 },
            { lat: 48.8566, lng: 2.3522 },
            { lat: 43.6047, lng: 1.4442 },
            { lat: 45.7640, lng: 4.8357 },
          ],
        },
        {
          name: "Italy",
          coordinates: [
            { lat: 41.8719, lng: 12.5674 },
            { lat: 45.4384, lng: 10.9916 },
            { lat: 40.8518, lng: 14.2681 },
            { lat: 43.7696, lng: 11.2558 },
          ],
        },
        {
          name: "Spain",
          coordinates: [
            { lat: 40.4168, lng: -3.7038 },
            { lat: 41.3879, lng: 2.1699 },
            { lat: 37.3886, lng: -5.9823 },
            { lat: 39.4699, lng: -0.3763 },
          ],
        },
        {
          name: "Albania",
          coordinates: [
            { lat: 41.3275, lng: 19.8189 },
            { lat: 40.6401, lng: 19.6498 },
            { lat: 42.0667, lng: 20.5167 },
            { lat: 40.9000, lng: 19.7500 },
          ],
        },
        {
          name: "Herzegovina",
          coordinates: [
            { lat: 43.9159, lng: 17.6791 },
            { lat: 44.7833, lng: 17.2000 },
            { lat: 43.5000, lng: 17.7000 },
            { lat: 43.3000, lng: 18.1167 },
          ],
        },
        {
          name: "Croatia",
          coordinates: [
            { lat: 45.8150, lng: 15.9819 },
            { lat: 44.1194, lng: 15.2314 },
            { lat: 43.5081, lng: 16.4402 },
            { lat: 45.3271, lng: 14.4422 },
          ],
        },
        {
          name: "Cyprus",
          coordinates: [
            { lat: 35.1264, lng: 33.4299 },
            { lat: 34.9167, lng: 33.6367 },
            { lat: 35.1667, lng: 33.3667 },
            { lat: 35.0419, lng: 32.8326 },
          ],
        },
        {
          name: "Greece",
          coordinates: [
            { lat: 37.9838, lng: 23.7275 },
            { lat: 40.6401, lng: 22.9444 },
            { lat: 35.3387, lng: 25.1442 },
            { lat: 39.0742, lng: 21.8243 },
          ],
        },
        {
          name: "Lebanon",
          coordinates: [
            { lat: 33.8547, lng: 35.8623 },
            { lat: 34.0000, lng: 36.0000 },
            { lat: 33.3000, lng: 35.2000 },
            { lat: 34.2500, lng: 36.2500 },
          ],
        },
        {
          name: "Syria",
          coordinates: [
            { lat: 34.8021, lng: 38.9968 },
            { lat: 36.2000, lng: 37.1500 },
            { lat: 35.0000, lng: 38.5000 },
            { lat: 33.5000, lng: 36.3000 },
          ],
        },
        {
          name: "Morocco",
          coordinates: [
            { lat: 31.7917, lng: -7.0926 },
            { lat: 33.9716, lng: -6.8498 },
            { lat: 35.7595, lng: -5.8339 },
            { lat: 34.0209, lng: -6.8416 },
          ],
        },
        {
          name: "Egypt",
          coordinates: [
            { lat: 26.8206, lng: 30.8025 },
            { lat: 30.0444, lng: 31.2357 },
            { lat: 31.2001, lng: 29.9187 },
            { lat: 25.6872, lng: 32.6396 },
          ],
        },
        {
          name: "Libya",
          coordinates: [
            { lat: 32.8872, lng: 13.1913 },
            { lat: 30.0333, lng: 19.2000 },
            { lat: 24.0000, lng: 20.0000 },
            { lat: 32.0000, lng: 14.3000 },
          ],
        },
        {
          name: "Palestine",
          coordinates: [
            { lat: 31.9522, lng: 35.2332 },
            { lat: 32.2211, lng: 35.2629 },
            { lat: 31.7000, lng: 34.8000 },
            { lat: 32.0833, lng: 35.1833 },
          ],
        },
      ];
      

  const handleCountryClick = (countryName) => {
    onCountryClick(countryName);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={{ lat: 33.8869, lng: 9.5375 }} // Center on North Africa
        zoom={5}
      >
        {countries.map((country) => (
          <Polygon
            key={country.name}
            paths={country.coordinates}
            options={{
              fillColor: "#00FF00",
              fillOpacity: 0.5,
              strokeColor: "#0000FF",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
            onClick={() => handleCountryClick(country.name)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithCountries;
