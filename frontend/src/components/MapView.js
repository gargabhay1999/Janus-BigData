import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';

const MapView = ({ route }) => {
    const [mapCenter, setMapCenter] = useState(null);
    const mapRef = useRef();
    const mapsRef = useRef();
    const directionsRendererRef = useRef();

    useEffect(() => {
        if (route && route.Coordinate && route.Coordinate.length > 0) {
            const firstCoord = route.Coordinate[0];
            setMapCenter({ lat: firstCoord.lat, lng: firstCoord.long });
        }
    }, [route]);


    useEffect(() => {
        console.log(mapRef.current, mapsRef.current, route, mapCenter)
        if (mapRef.current && mapsRef.current && route && mapCenter && directionsRendererRef.current) {
            const directionsService = new mapsRef.current.DirectionsService();
            const directionsRenderer = new mapsRef.current.DirectionsRenderer();
            directionsRenderer.setMap(mapRef.current);

            const waypoints = route.Coordinate.slice(1, -1).map(coord => ({
                location: new mapsRef.current.LatLng(coord.lat, coord.long),
                stopover: true
            }));

            if (waypoints.length>25) {
                alert("please choose small distance addresses.")
                return
            }

            const origin = route.Coordinate[0];
            const destination = route.Coordinate[route.Coordinate.length - 1];

            const request = {
                origin: new mapsRef.current.LatLng(origin.lat, origin.long),
                destination: new mapsRef.current.LatLng(destination.lat, destination.long),
                waypoints: waypoints,
                travelMode: mapsRef.current.TravelMode.WALKING
            };

            directionsService.route(request, (result, status) => {
                if (status === mapsRef.current.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    console.error(`Directions request failed due to ${status}`);
                }
            });
        }
    }, [route, mapCenter]);

    if (!mapCenter) return null;

    return (
        <div>
            <div>
                {mapCenter && route ?
                    (
                        <div>
                            <p>Risk Score: {route.risk_score} | Distance: {route.distance} | Time: {route.time}</p> 
                        </div>
                    ) : null }
            </div>
            <div style={{ height: '650px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                    defaultCenter={mapCenter}
                    defaultZoom={12}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => {
                        mapRef.current = map;
                        mapsRef.current = maps;
                        directionsRendererRef.current = new maps.DirectionsRenderer();
                        directionsRendererRef.current.setMap(map);
                    }}
                >
                </GoogleMapReact>
            </div>
        </div>
    );

};

export default MapView;
