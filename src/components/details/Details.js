import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../constants/api";
import Carousel from "react-bootstrap/Carousel";
import { Heading, Subheading } from "../layout/Heading";
import Location from "./Location";
import EnquiryModal from "./Modal";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function ViewPage() {
	const [page, setPage] = useState(null);
	const [fetchingPost, setFetchingPost] = useState(true);
	const [fetchError, setFetchError] = useState(null);

	let { id } = useParams();

	useEffect(
		function () {
			async function getPage() {
				try {
					const response = await fetch(api + "/" + id);
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


	if (fetchingPost) return <div>Loading...</div>;

	if (fetchError) return <div>Error loading post</div>;

	return (
		<>
			<Carousel variant="dark" interval={null}>
			  <Carousel.Item>
			    <img
			      className="d-block w-100"
			      src={page.data.attributes.image_url_1}
			      alt={page.data.attributes.name}
			    />
			    <Carousel.Caption>
			      <p>Image from {page.data.attributes.name}</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			  <Carousel.Item>
			    <img
			      className="d-block w-100"
			      src={page.data.attributes.image_url_2}
			      alt={page.data.attributes.name}
			    />
			    <Carousel.Caption>
			      <p>Image from {page.data.attributes.name}</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			  <Carousel.Item>
			    <img
			      className="d-block w-100"
			      src={page.data.attributes.image_url_3}
			      alt={page.data.attributes.name}
			    />
			    <Carousel.Caption>
			      <p>Image from {page.data.attributes.name}</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			</Carousel>
			<Container fluid className="details-container">
			<Container fluid className="desktop-flex-between">
			<Row className="page-left">
				<Heading title={page.data.attributes.name} />
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

			<Subheading title="Facilities" />
				<ul className="facilities">
					<li>{page.data.attributes.facilities}</li>
				</ul>
			<Subheading title="Location" />
			<p>{page.data.attributes.address}</p>
			<div className="view-location">
    			<Location />
			</div>
			</Container>
        </>
	);
}