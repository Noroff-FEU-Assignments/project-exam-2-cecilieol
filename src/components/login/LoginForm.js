import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveToken } from "../auth/token";
import { rememberUser } from "../auth/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Please enter an email address"),
    password: yup
        .string()
        .required("Please enter a password"),
});

export default function LoginForm() {

    let navigate = useNavigate(); 
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {

        axios
        .post('http://localhost:1337/api/auth/local', {
            identifier: data.email, 
            password: data.password 
        })

        .then(response => {
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);

            saveToken(response.data.jwt);
            rememberUser(response.data.user);
            navigate("/");

        })
        .catch(error => { 
            console.log('An error occurred:', error.response);
        });

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