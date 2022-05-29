import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
 
export function Location ({ google, locations = [] }) {
  const markerPosition = {
      lat: 60.39773, 
      lng: 5.32452
  };

  return (
    <Map
      className="location-map"
      google={google}
      initialCenter={markerPosition}
      center={markerPosition}
      zoom={locations.length === 1 ? 18 : 13}
      id="map"
      containerStyle={{
        position: "absolute",
        width: "90%",
        height: "auto",
        maxWidth: "1200px",
    }}
    >
    
    <Marker position={markerPosition} />

    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCkp7-23Exq39ru1YKVNKrjRNmpKe3PYbc'
})(Location);