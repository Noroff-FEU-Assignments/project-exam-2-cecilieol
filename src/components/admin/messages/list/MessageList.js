import { useState, useEffect } from "react";
import { api, messageEndpoint } from "../../../../constants/api";
import MessageCard from "./MessageCard";
import Loader from "../../../layout/Loader";
import { retrieveToken } from "../../../auth/token";

export default function MessageList() {
    const [messages, setMessages] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);


    useEffect(function() {

        const token = retrieveToken();

        async function getMessages() {
            try {
                const response = await fetch(api + messageEndpoint, {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        },
                })
                const json = await response.json();

                setMessages(json);

            } catch (error) {
                setError(error.toString());
            } finally {
                setLoader(false);
            }
        }
        getMessages();
    }, []);

    if (loader) {
		return <Loader />;
	}

	if (error) {
		return <div>An error occured: {error}</div>;
	}

    return (
        <div className="messages-list">
            {messages.data.map((message) => {
                return <MessageCard key={message.id} 
                            id={message.id} 
                            received={message.attributes.publishedAt}
                            firstname={message.attributes.first_name} 
                            lastname={message.attributes.last_name} 
                            email={message.attributes.email}
                            subject={message.attributes.subject}
                            message={message.attributes.message}
                        />;
			})}
        </div>
	);
}

