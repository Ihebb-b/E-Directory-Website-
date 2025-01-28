import React from 'react';

const CustomMarker = ({ countryName }) => {
  return (
    <div className="marker-container">
      <div className="marker-pin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FF6B6B"
          width="24px"
          height="24px"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
      <div className="marker-tooltip">{countryName}</div>
      <div className="marker-shadow"></div>
    </div>
  );
};

export default CustomMarker;