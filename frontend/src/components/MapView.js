import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';

const MapView = ({ routes }) => {
    const [mapCenter, setMapCenter] = useState(null);
    // const [key, setKey] = useState(Date.now());
    const mapRef = useRef();
    const mapsRef = useRef();
    const directionsRendererRef = useRef();

    // Function to find the route with the least risk score
    const getLeastRiskRoute = (routes) => { 
        let leastRiskRoute = null;
        let minRiskScore = Number.MAX_VALUE;

        Object.values(routes).forEach(route => {
            if (route.risk_score < minRiskScore) {
                minRiskScore = route.risk_score;
                leastRiskRoute = route;
            }
        });
        return leastRiskRoute;
    };

    const routeToDisplay = getLeastRiskRoute(routes);

    useEffect(() => {
        if (routeToDisplay && routeToDisplay.Coordinate && routeToDisplay.Coordinate.length > 0) {
            const firstCoord = routeToDisplay.Coordinate[0];
            setMapCenter({ lat: firstCoord.lat, lng: firstCoord.long });
        }
    }, [routeToDisplay]);


    useEffect(() => {
        console.log(mapRef.current, mapsRef.current, routeToDisplay, mapCenter)
        if (mapRef.current && mapsRef.current && routeToDisplay && mapCenter && directionsRendererRef.current) {
            const directionsService = new mapsRef.current.DirectionsService();
            const directionsRenderer = new mapsRef.current.DirectionsRenderer();
            directionsRenderer.setMap(mapRef.current);

            const waypoints = routeToDisplay.Coordinate.slice(1, -1).map(coord => ({
                location: new mapsRef.current.LatLng(coord.lat, coord.long),
                stopover: true
            }));

            const origin = routeToDisplay.Coordinate[0];
            const destination = routeToDisplay.Coordinate[routeToDisplay.Coordinate.length - 1];

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
    }, [routeToDisplay, mapCenter]);

    if (!mapCenter) return null; // Don't render the map until the center is set


    return (
        <div>
            <div>
                {mapCenter && routeToDisplay ?
                    (
                        <div>
                            <p>Risk Score: {routeToDisplay.risk_score}</p>
                            <p>Distance: {routeToDisplay.distance}</p> 
                            <p>Time: {routeToDisplay.time}</p> 
                        </div>
                    ) : null }
            </div>
            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    // key={key} // Use key for reinitialization
                    bootstrapURLKeys={{ key: 'AIzaSyDx7Qa2hpuHNUVjSmesZOc32WhcdRHSWTw' }}
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
