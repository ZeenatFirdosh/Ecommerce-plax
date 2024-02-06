import React, { useEffect, useState ,useRef} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
const MapComponent = () => {
    const [position, setPosition] = useState([51.505, -0.09]); // Default position, London

    useEffect(() => {
        const fetchLocation = async () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(position => {
                    setPosition([position.coords.latitude, position.coords.longitude]);
                });
            }
        };

        fetchLocation();
    }, []);

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position &&
                <Marker position={position}>
                    <Popup>You are here</Popup>
                </Marker>
            }
        </MapContainer>
    );
};

export default MapComponent;
