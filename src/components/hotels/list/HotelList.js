import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api, hotelEndpoint } from "../../../constants/api.js";
import HotelCard from "./HotelCard.js";
import Loader from "../../layout/Loader.js";

export default function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function() {
        async function getHotels() {
            try {
                const response = await fetch(api + hotelEndpoint);
                const json = await response.json();

                setHotels(json);

            } catch (error) {
                setError(error.toString());
            } finally {
                setLoader(false);
            }
        }
        getHotels();
    }, []);

    if (loader) return <Loader />;

	if (error) return <div>An error occured: {error}</div>;

    return (
        <div className="hotels">
            {hotels.data.map((hotel) => {
                return (
                    <Link to={`details/${hotel.id}`} key={hotel.id}>
                        <HotelCard key={hotel.id} 
                            id={hotel.id} 
                            image={hotel.attributes.image_url_1} 
                            name={hotel.attributes.name} 
                            description={hotel.attributes.description} 
                            address={hotel.attributes.address}
                            price={hotel.attributes.price} 
                            guests={hotel.attributes.guests}
                        />
                    </Link>
                );
			})}
        </div>
	);
}

