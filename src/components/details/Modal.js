import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { api, enquiryEndpoint, relations } from "../../constants/api";
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
		.min(yup.ref('checkin'), "Check-out date must be after check-in date"),
	message: yup
		.string(),
		
  });


export default function EnquiryModal() {

	const [show, setShow] = useState(false);
	const [submitted, setSubmitted] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

	let { id } = useParams();

    async function onSubmit(data, e) {

        await axios
        .post(api + enquiryEndpoint + relations, {
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
        <Button className="primary" onClick={handleShow}>Send enquiry</Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send an enquiry</Modal.Title>
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
        </>
    );
  }