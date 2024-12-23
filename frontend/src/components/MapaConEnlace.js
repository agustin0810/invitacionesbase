import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Configuración de los íconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});


function MapaConEnlace() {
  // Coordenadas del punto específico
  const position = [-34.4352065, -57.7453595];

  // URL de Google Maps con las coordenadas
  const googleMapsLink = `https://www.google.com/maps?q=${position[0]},${position[1]}`;

  return (
    <div style={{ height: "300px", width: "80%", maxWidth: '600px', margin: 'auto', marginTop: '7vh' }}>
      <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <div>
              <p>¡Aquí está la ubicación!</p>
              <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                Abrir en Google Maps
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapaConEnlace;
