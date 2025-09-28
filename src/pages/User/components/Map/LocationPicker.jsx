import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ initialCoords, onLocationSelect, disabled}) {
  const [position, setPosition] = useState(initialCoords);

  // Update position when parent provides new initialCoords
  useEffect(() => {
    if (initialCoords) {
      setPosition(initialCoords);
    }
  }, [initialCoords]);

  // Keep map centered when position changes
  const RecenterMap = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      if (coords) {
        map.setView(coords, map.getZoom());
      }
    }, [coords, map]);
    return null;
  };

  // Handle clicks on the map
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if(!disabled){
          setPosition(e.latlng);
          onLocationSelect && onLocationSelect(e.latlng);
        }
        
      },
    });
    return null;
  };

  // Handle marker drag end
  const handleMarkerDragEnd = (e) => {
    const latlng = e.target.getLatLng();
    setPosition(latlng);
    onLocationSelect && onLocationSelect(latlng);
  };

  return (
    <MapContainer
      center={position || [7.8731, 80.7718]} // <- Use initialCoords if available
      zoom={position ? 12 : 7} // closer zoom if a saved location is available
      minZoom={4}
      maxZoom={20}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      <RecenterMap coords={position} />
      {position && (
        <Marker
          position={position}
          draggable={true}
          eventHandlers={{
            dragend: handleMarkerDragEnd,
          }}
        />
      )}
    </MapContainer>
  );
}

export default LocationPicker;
