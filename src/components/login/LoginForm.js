import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveToken } from "../auth/token";
import { rememberUser } from "../auth/user";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Please enter an email address"),
    password: yup
        .string()
        .required("Please enter a password"),
});

export default function LoginForm(email, password) {

    let navigate = useNavigate(); 
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const credentials = JSON.stringify({ 
        identifier: email, 
        password: password 
    });

    async function onSubmit() {

        try {
            const response = await fetch('http://localhost:1337/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: credentials,
            })

            const login = await response.json();

            if (login.user) {
                saveToken(login.jwt);
                rememberUser(login.user);
    
                navigate("/")
            } else {
                navigate("/login");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return( 

        <Form onSubmit={handleSubmit(onSubmit)}>

            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control id="email" type="email" name="email" placeholder="Enter email"  {...register("email")}/>
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control id="password" type="password" name="password" placeholder="Password" {...register("password")}/>
                {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </Form.Group>
            
            <Button type="submit" className="primary">Log in</Button>

        </Form>
    )
}