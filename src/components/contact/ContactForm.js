import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data) {

            const contactMsg = await fetch('http://localhost:1337/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data
                })
            })
            const response = await contactMsg.json();
            console.log(response);

    }

    return (
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
    );
}