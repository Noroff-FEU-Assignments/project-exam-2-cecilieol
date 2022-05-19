import { useState, useEffect } from "react";
import { api } from "../../../../constants/api";
import EnquiryCard from "./EnquiryCard";
import Loader from "../../../layout/Loader";

export default function EnquiryList() {
    const [enquiries, setEnquiries] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function() {
        async function getEnquiries() {
            try {
                const response = await fetch(api + "?populate=*");
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
                return <EnquiryCard key={enquiry.attributes.enquiries.data[0].id} 
                            id={enquiry.attributes.enquiries.data[0].id} 
                            hotel={enquiry.attributes.name}
                            firstname={enquiry.attributes.enquiries.data[0].attributes.first_name} 
                            lastname={enquiry.attributes.enquiries.data[0].attributes.last_name} 
                            email={enquiry.attributes.enquiries.data[0].attributes.email}
                            guests={enquiry.attributes.enquiries.data[0].attributes.guests}
                            checkin={enquiry.attributes.enquiries.data[0].attributes.checkin}
                            checkout={enquiry.attributes.enquiries.data[0].attributes.checkout}
                            message={enquiry.attributes.enquiries.data[0].attributes.message}
                            received={enquiry.attributes.enquiries.data[0].attributes.publishedAt}
                        />;
			})}
        </div>
	);
}

