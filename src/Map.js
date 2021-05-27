import React from 'react'
import './Map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map({countries, center,zoom}) {
    return (
        <div className="map">
         <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            </MapContainer>
        </div>
    )
}

export default Map;
