import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { retrieveToken } from "../../auth/token";
import axios from 'axios';
import { useState } from "react";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Please enter a name")
        .min(2, "Name must be at least 2 characters"),
    type: yup
        .string()
        .required("Please select a category"),
    price: yup
        .number()
        .required("Please enter a price"),
    guests: yup
        .number()
        .required("Please enter a number"),
    address: yup
        .string()
        .required("Please enter an address"),
    description: yup
        .string()
        .required("Please enter a description"),
    facilities: yup
        .string()
        .required("Please enter some facilities"),
    image_url_1: yup
        .string()
        .required("Please enter a URL"),
    image_url_2: yup
        .string()
        .required("Please enter a URL"),
    image_url_3: yup
        .string()
        .required("Please enter a URL"),
        
});

export default function AddForm() {

    const [submitted, setSubmitted] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const token = retrieveToken();

    async function onSubmit(data, e) {

        await axios
            .post('http://localhost:1337/api/hotels', {
                data: {
                    name: data.name,
                    type: data.type,
                    price: data.price,
                    guests: data.guests,
                    address: data.address,
                    description: data.description,
                    facilities: data.facilities,
                    image_url_1: data.image_url_1,
                    image_url_2: data.image_url_2,
                    image_url_3: data.image_url_3,
                    }
                },
                {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                    },
                }
            )
      
            .then(response => {
                console.log('New accommodation', response.data);
            
                setSubmitted(true);
                e.target.reset();

            })
            .catch(error => { 
                console.log('An error occurred:', error.response);
            });

    }

    return( 

        <>
        {submitted && <div className="success">New accommodation has been added</div>}

        <Form onSubmit={handleSubmit(onSubmit)}>

            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Accommodation name" {...register("name")}/>
                {errors.name && <span className="text-danger">{errors.name.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Select type" name="type" {...register("type")}>
                    <option value disabled>Select type</option>
                    <option value="hotel">Hotel</option>
                    <option value="hostel">Hostel</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="cabin">Cabin</option>
                </Form.Select> 
                {errors.type && <span className="text-danger">{errors.type.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Price per night</Form.Label>
                <Form.Control type="number" name="price" placeholder="Price" {...register("price")}/>
                {errors.price && <span className="text-danger">{errors.price.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Max # of guests</Form.Label>
                <Form.Control type="number" name="guests" placeholder="Guests" {...register("guests")}/>
                {errors.guests && <span className="text-danger">{errors.guests.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" placeholder="Address" {...register("address")}/>
                {errors.address && <span className="text-danger">{errors.address.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} name="description" placeholder="Description" {...register("description")}/>
                {errors.description && <span className="text-danger">{errors.description.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Facilities</Form.Label>
                <Form.Control as="textarea" rows={4} name="facilities" placeholder="Facilities" {...register("facilities")}/>
                {errors.facilities && <span className="text-danger">{errors.facilities.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" name="image_url_1" placeholder="Image URL" {...register("image_url_1")}/>
                {errors.image_url_1 && <span className="text-danger">{errors.image_url_1.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" name="image_url_2" placeholder="Image URL" {...register("image_url_2")}/>
                {errors.image_url_2 && <span className="text-danger">{errors.image_url_2.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" name="image_url_3" placeholder="Image URL" {...register("image_url_3")}/>
                {errors.image_url_3 && <span className="text-danger">{errors.image_url_3.message}</span>}
            </Form.Group>

            <Button type="submit" className="primary">Add</Button>
        </Form>
        </>
    )
}