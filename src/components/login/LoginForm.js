import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveToken } from "../../helpers/auth/token";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api, authEndpoint } from "../../constants/api";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

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

    const [loginError, setLoginError] = useState("");

    let navigate = useNavigate(); 
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    // eslint-disable-next-line 
    const [auth, setAuth] = useContext(AuthContext);

    function onSubmit(data) {

        axios
        .post(api + authEndpoint, {
            identifier: data.email, 
            password: data.password 
        })

        .then(response => {
            saveToken(response.data.jwt);
            setAuth(response.data);
            navigate("/");

        })
        .catch(error => { 
            console.log(error.response);
            setLoginError(error.response.data.error.message);
        });
    }

    return( 

        <>
        {loginError && <div className="error-container">{loginError}</div>}
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
        </>
    )
}