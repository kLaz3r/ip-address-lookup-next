import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Map = ({ data }) => {
    return (
        <MapContainer
            style={{ height: '100vh', zIndex: '-1' }}
            center={[data.location.lat, data.location.lng]}
            zoom={16}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {/* <Marker position={[data.location.lat, data.location.lng]}>
                <Popup>Marker</Popup>
            </Marker> */}
        </MapContainer>
    );
};

export default Map;
