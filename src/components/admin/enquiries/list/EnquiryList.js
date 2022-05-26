import { useState, useEffect } from "react";
import { api, enquiryEndpoint, relations } from "../../../../constants/api";
import EnquiryCard from "./EnquiryCard";
import Loader from "../../../layout/Loader";
import { retrieveToken } from "../../../auth/token";

export default function EnquiryList() {
    const [enquiries, setEnquiries] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function() {

        const token = retrieveToken();

        async function getEnquiries() {
            try {
                const response = await fetch(api + enquiryEndpoint + relations, {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        },
                })
                const json = await response.json();

                setEnquiries(json);

            } catch (error) {
                setError(error.toString());
            } finally {
                setLoader(false);
            }
        }
        getEnquiries();
    }, []);

    if (loader) {
		return <Loader />;
	}

	if (error) {
		return <div>An error occured: {error}</div>;
	}

    return (
        <div className="enquiries-list">
            {enquiries.data.map((enquiry) => {
                return <EnquiryCard key={enquiry.id} 
                            id={enquiry.id} 
                            hotel={enquiry.attributes.hotel.data.attributes.name}
                            firstname={enquiry.attributes.first_name} 
                            lastname={enquiry.attributes.last_name} 
                            email={enquiry.attributes.email}
                            guests={enquiry.attributes.guests}
                            checkin={enquiry.attributes.checkin}
                            checkout={enquiry.attributes.checkout}
                            message={enquiry.attributes.message}
                            received={enquiry.attributes.publishedAt}
                        />;
			})}
        </div>
	);
}

