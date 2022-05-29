import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api, hotelEndpoint } from "../../constants/api";
import Carousel from "react-bootstrap/Carousel";
import Location from "./Location";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import EnquiryModal from "./Modal";
import Loader from "../layout/Loader";

export default function ViewPage() {
	const [page, setPage] = useState(null);
	const [fetchingPost, setFetchingPost] = useState(true);
	const [fetchError, setFetchError] = useState(null);

	let { id } = useParams();

	useEffect(
		function () {
			async function getPage() {
				try {
					const response = await fetch(api + hotelEndpoint + "/" + id);
					const json = await response.json();

				    setPage(json);

				} catch (error) {
					console.log(error);
					setFetchError(error.toString());
				} finally {
					setFetchingPost(false);
				}
			}

			getPage();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	if (fetchingPost) return <Loader />;

	if (fetchError) return <div>An error occured: {fetchError}</div>;

	return (
		<>
			<div className="p-1"></div>
			<Carousel variant="dark" interval={null}>
			  <Carousel.Item>
			    <img
			      className="d-block w-100"
			      src={page.data.attributes.image_url_1}
			      alt={page.data.attributes.name}
			    />
			    <Carousel.Caption>
			      <p>{page.data.attributes.name}</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			  <Carousel.Item>
			    <img
			      className="d-block w-100"
			      src={page.data.attributes.image_url_2}
			      alt={page.data.attributes.name}
			    />
			    <Carousel.Caption>
			      <p>{page.data.attributes.name}</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			  <Carousel.Item>
			    <img
			      className="d-block w-100"
			      src={page.data.attributes.image_url_3}
			      alt={page.data.attributes.name}
			    />
			    <Carousel.Caption>
			      <p>{page.data.attributes.name}</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			</Carousel>

			<Container fluid className="details-container">
				<Container fluid className="desktop-flex-between p-0">
					<Row className="page-left">
						<h1 className="h1-align-left">{page.data.attributes.name}</h1>
						<p>{page.data.attributes.description}</p>
					</Row>

					<Card className="page-right">
						<div className="card-inline">
							<Card.Text>Price per night: </Card.Text>
							<Card.Text>${page.data.attributes.price}</Card.Text>
						</div>
						<div className="card-inline">
							<Card.Text>Max # of guests: </Card.Text>
							<Card.Text>{page.data.attributes.guests}</Card.Text>
						</div>
						<EnquiryModal />
					</Card>
				</Container>

				<h2 className="h2-details">Facilities</h2>
					<ul className="facilities">
						<li><i className="fa fa-wifi"></i> Wi-Fi: {page.data.attributes.wifi}</li>
						<li><i className="fa fa-coffee"></i> Breakfast included: {page.data.attributes.breakfast_included}</li>
						<li><i className="fa fa-bath"></i> Private bathroom: {page.data.attributes.private_bathroom}</li>
						<li><i className="fa fa-wheelchair"></i> Disability friendly: {page.data.attributes.disability_friendly}</li>
						<li><i className="fa fa-paw"></i> Pet friendly: {page.data.attributes.pet_friendly}</li>
						<li><i className="fa fa-umbrella"></i> Complimentary Holidaze umbrellas: Yes</li>
					</ul>
				<h2 className="h2-details">Location</h2>
					<p>{page.data.attributes.address}</p>
				<div className="view-location">
    				<Location />
				</div>
			</Container>
        </>
	);
}