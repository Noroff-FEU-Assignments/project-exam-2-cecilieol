import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { api, messageEndpoint } from "../../constants/api";

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
    subject: yup
        .string()
        .required("Please enter a subject")
        .min(4, "Subject must be at least 4 characters"),
    message: yup
        .string()
        .required("Please enter a message")
        .min(25, "Message must be at least 25 characters"),
        
});

export default function ContactForm() {

    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });


    async function onSubmit(data, e) {

        await axios
        .post(api + messageEndpoint, {
            data
        })

        .then(response => {
            setSubmitted(true);
            e.target.reset();

        })
        .catch(error => { 
            console.log(error.response);
            setErrorMessage(error.response.data.error.message);
        });
    }


    return (
        <>
        {submitted && <div className="success-container">Your message has been sent</div>}
        {errorMessage && <div className="error-container">{errorMessage}</div>}
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3 form-inline inline-first" controlId="FirstNameInput">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="first_name" placeholder="Your first name" {...register("first_name")}/>
                {errors.first_name && <span className="text-danger">{errors.first_name.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3 form-inline" controlId="LastNameInput">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="last_name" placeholder="Your last name" {...register("last_name")}/>
                {errors.last_name && <span className="text-danger">{errors.last_name.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="EmailInput">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Your email" {...register("email")}/>
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="SubjectInput">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="select" name="subject" placeholder="Your subject" {...register("subject")}/>
                {errors.subject && <span className="text-danger">{errors.subject.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="MessageInput">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} name="message" placeholder="Your message" {...register("message")}/>
                {errors.message && <span className="text-danger">{errors.message.message}</span>}
            </Form.Group>
            <Button type="submit" className="primary">Send</Button>
        </Form>
        </>
    );
}