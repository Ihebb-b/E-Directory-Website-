// GoogleMapsProvider.js
import React from 'react';
import { LoadScript } from '@react-google-maps/api';

export const GoogleMapsContext = React.createContext();

export function GoogleMapsProvider({ children }) {
    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            {children}
        </LoadScript>
    );
}