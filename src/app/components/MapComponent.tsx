"use client";

import { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyAMCWperc8KDch8EtugfzPagBuQJtaOk50"; // Replace with your Google Maps API Key

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = {
    lat: 39.8283, // Default to USA center
    lng: -98.5795,
};

type Vehicle = {
    id: string;
    latitude: number;
    longitude: number;
    status: "active" | "idle" | "maintenance";
};

interface MapComponentProps {
    vehicleLocations: Vehicle[];
}

export default function MapComponent({ vehicleLocations }: MapComponentProps) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    });

    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    if (!isLoaded) return <div>Loading Google Maps...</div>;

    // Define the marker colors based on status
    const getMarkerIcon = (status: string) => {
        return {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: status === "active" ? "green" : status === "idle" ? "yellow" : "red",
            fillOpacity: 1,
            strokeWeight: 1,
        };
    };

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={vehicleLocations.length > 0 ? { lat: vehicleLocations[0].latitude, lng: vehicleLocations[0].longitude } : defaultCenter}
            zoom={vehicleLocations.length > 0 ? 4 : 5}
        >
            {vehicleLocations.map((vehicle) => (
                <Marker
                    key={vehicle.id}
                    position={{ lat: vehicle.latitude, lng: vehicle.longitude }}
                    icon={getMarkerIcon(vehicle.status)}
                    onClick={() => setSelectedVehicle(vehicle)}
                />
            ))}

            {selectedVehicle && (
                <InfoWindow
                    position={{ lat: selectedVehicle.latitude, lng: selectedVehicle.longitude }}
                    onCloseClick={() => setSelectedVehicle(null)}
                >
                    <div className="text-sm">
                        <h3 className="font-semibold">Vehicle ID: {selectedVehicle.id}</h3>
                        <p>Status: <span className="font-bold capitalize">{selectedVehicle.status}</span></p>
                        <p>Location: {selectedVehicle.latitude.toFixed(4)}, {selectedVehicle.longitude.toFixed(4)}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}