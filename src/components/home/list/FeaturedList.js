import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api, hotelEndpoint } from "../../../constants/api";
import FeaturedCard from "./FeaturedCard";
import Loader from "../../layout/Loader";
import { Subheading } from "../../layout/Heading";

export default function HotelList() {
    const [cheapest, setCheapest] = useState([]);
    const [biggest, setBiggest] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function() {
        async function getResults() {
            try {
                const response = await fetch(api + hotelEndpoint);
                const json = await response.json();
                
                const results = json.data;

                let cheapestSorted = results.sort((a, b) => parseFloat(a.attributes.price) - parseFloat(b.attributes.price));
                let cheapestSplice = cheapestSorted.splice(0, 4);

                let biggestSorted = results.sort((a, b) => parseFloat(b.attributes.guests) - parseFloat(a.attributes.guests));
                let biggestSplice = biggestSorted.splice(0, 4);

                setCheapest(cheapestSplice);
                setBiggest(biggestSplice);

            } catch (error) {
                setError(error.toString());
            } finally {
                setLoader(false);
            }
        }
        getResults();
    }, []);

    if (loader) return <Loader />;

	if (error) return <div>An error occured: {error}</div>;

    return (
        <div className="featured-container">
            <Subheading title="Cheapest stays" />
            <div className="featured-hotels cheapest-hotels">
            {cheapest.map((result) => {
                return (
                    <Link to={`hotels/details/${result.id}`} key={result.id}>
                        <FeaturedCard key={result.id} 
                            id={result.id} 
                            image={result.attributes.image_url_1} 
                            name={result.attributes.name} 
                            description={result.attributes.description} 
                            address={result.attributes.address}
                            price={result.attributes.price} 
                            guests={result.attributes.guests}
                        />
                    </Link>
                );
			})}
            </div>
            <Subheading title="Stays for larger groups" />
            <div className="featured-hotels biggest-hotels">
            {biggest.map((result) => {
                return (
                    <Link to={`hotels/details/${result.id}`} key={result.id}>
                        <FeaturedCard key={result.id} 
                            id={result.id} 
                            image={result.attributes.image_url_1} 
                            name={result.attributes.name} 
                            description={result.attributes.description} 
                            address={result.attributes.address}
                            price={result.attributes.price} 
                            guests={result.attributes.guests}
                        />
                    </Link>
                );
			})}
            </div>
        </div>
	);
}

