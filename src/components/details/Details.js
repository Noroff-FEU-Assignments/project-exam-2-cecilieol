import { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { api } from "../../constants/api";
import Carousel from "react-bootstrap/Carousel";
import { Heading, Subheading } from "../layout/Heading";
import Location from "./Location";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

const schema = yup.object().shape({
	first_name: yup
		.string()
		.required("Please enter your first name")
		.min(2, "First name must be at least 2 characters"),
	last_name: yup
		.string()
		.required("Please enter your first name")
		.min(2, "Last name must be at least 2 characters"),
	email: yup
		.string()
		.required("Please enter you email address")
		.email('Invalid email format'),
	guests: yup
		.number()
		.required("Please choose number of guests"),
	checkin: yup
		.date()
		.required("Please choose a check-in date"),
	checkout: yup
		.date()
		.required("Please choose a check-out date")
		.min(yup.ref('checkin'), "Check-out date cannot be before check-in date"),
	message: yup
		.string(),
		
  });

export default function ViewPage() {
	const [page, setPage] = useState(null);
	const [fetchingPost, setFetchingPost] = useState(true);
	const [fetchError, setFetchError] = useState(null);

	const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

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

	async function onSubmit(data, e) {

        await axios
        .post('http://localhost:1337/api/enquiries?populate=%2A', {
            data: {
                hotel: id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                guests: data.guests,
                checkin: data.checkin,
                checkout: data.checkout,
                message: data.message,
                }
            },
        )

        .then(response => {
            console.log('Well done!');
            console.log('User profile', response.data);

            setSubmitted(true);
            e.target.reset();

        })
        .catch(error => { 
            console.log('An error occurred:', error.response);
        });
    }

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
				<Button className="primary" onClick={handleShow}>Send enquiry</Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send an enquiry to {page.data.attributes.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
            {submitted && <div className="success">Your enquiry has been sent</div>}

              <Form.Group className="mb-3 form-inline inline-first">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="first_name" placeholder="Your first name" {...register("first_name")}/>
                    {errors.first_name && <span className="text-danger">{errors.first_name.message}</span>}
                </Form.Group>

                <Form.Group className="mb-3 form-inline">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="last_name" placeholder="Your last name" {...register("last_name")}/>
                    {errors.last_name && <span className="text-danger">{errors.last_name.message}</span>}
                </Form.Group>

                <Form.Group className="mb-3 form-inline inline-first">
                    <Form.Label>E-mail address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Your email" {...register("email")}/>
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </Form.Group>
                <Form.Group className="mb-3 form-inline">
                    <Form.Label>Number of guests</Form.Label>
                    <Form.Control type="number" name="guests" placeholder="Number of guests" {...register("guests")}/>
                    {errors.guests && <span className="text-danger">{errors.guests.message}</span>}
                </Form.Group>

                <Form.Group className="mb-3 form-inline inline-first">
                    <Form.Label>Check-in</Form.Label>
                    <Form.Control type="date" name="checkin" placeholder="Your checkin" {...register("checkin")} />
                    {errors.checkin && <span className="text-danger">{errors.checkin.message}</span>}
                </Form.Group>
                <Form.Group className="mb-3 form-inline">
                    <Form.Label>Check-out</Form.Label>
                    <Form.Control type="date" name="checkout" placeholder="Your checkout" {...register("checkout")} />
                    {errors.checkout && <span className="text-danger">{errors.checkout.message}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Additional message</Form.Label>
                    <Form.Control as="textarea" rows={4} name="message" placeholder="Your message (optional)" {...register("message")}/>
                    {errors.message && <span className="text-danger">{errors.message.message}</span>}
                </Form.Group>

                <Button type="submit" className="primary">Send enquiry</Button>
                <Button className="secondary" onClick={handleClose}>Return</Button>

            </Form>
          </Modal.Body>
        </Modal>
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