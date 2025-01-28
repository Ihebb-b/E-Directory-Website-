import React from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker'; // Import the custom marker component
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer to render the custom marker

const RestaurantMap = ({ countries, handleMapClick }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '500px', // Increased height for better visibility
    borderRadius: '12px', // Rounded corners for the map
    overflow: 'hidden', // Ensure rounded corners are applied
  };

  // Calculate the initial center based on the countries' coordinates
  const calculateCenter = (countries) => {
    let totalLat = 0;
    let totalLng = 0;
    let count = 0;

    countries.forEach((country) => {
      country.coordinates.forEach((coord) => {
        totalLat += coord.lat; // Access the `lat` property
        totalLng += coord.lng; // Access the `lng` property
        count++;
      });
    });

    return [totalLat / count, totalLng / count]; // Return the average center
  };

  const center = calculateCenter(countries);
  const zoom = 5;

  // Create a custom icon using divIcon
  const customIcon = (countryName) =>
    L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(<CustomMarker countryName={countryName} />),
      iconSize: [40, 40], // Adjust the size as needed
      iconAnchor: [20, 40], // Adjust the anchor point as needed
    });

  return (
    <MapContainer center={center} zoom={zoom} style={mapContainerStyle}>
      {/* Add a TileLayer for the map background (no labels) */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" // No-labels tile layer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render polygons for each country */}
      {countries.map((country) => (
        <Polygon
          key={country.name}
          positions={country.coordinates.map((coord) => [coord.lat, coord.lng])} // Convert { lat, lng } to [lat, lng]
          eventHandlers={{
            click: () => handleMapClick(country.name),
          }}
          pathOptions={{
            color: '#4A90E2', // Modern blue stroke color
            fillColor: '#A2D5F2', // Light blue fill color
            fillOpacity: 0.4, // Slightly transparent fill
          }}
        />
      ))}

      {/* Add custom markers for each country */}
      {countries.map((country) => (
        <Marker
          key={country.name}
          position={[country.coordinates[0].lat, country.coordinates[0].lng]} // Use the first coordinate as the marker position
          icon={customIcon(country.name)} // Use the custom icon with country name
          eventHandlers={{
            click: () => handleMapClick(country.name),
          }}
        >
          {/* <Popup className="custom-popup">
            <div className="popup-content">
              <h3>{country.name}</h3>
              <img
                src="https://via.placeholder.com/100x50" // Placeholder image for restaurant
                alt="Restaurant"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </div>
          </Popup> */}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RestaurantMap;