import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { retrieveToken } from "../../../helpers/auth/token";
import axios from "axios";
import { useState } from "react";
import { api, hotelEndpoint } from "../../../constants/api";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a name")
    .min(2, "Name must be at least 2 characters"),
  type: yup.string().required("Please select a category"),
  price: yup
    .number()
    .typeError("Please enter a number")
    .positive("Invalid number")
    .required("Please enter a price"),
  guests: yup
    .number()
    .typeError("Please enter a number")
    .positive("Invalid number")
    .required("Please enter a number"),
  address: yup.string().required("Please enter an address"),
  description: yup
    .string()
    .required("Please enter a description")
    .min(200, "Description must exceed 200 characters"),
  wifi: yup.string().required("Please select an option"),
  breakfast_included: yup.string().required("Please select an option"),
  disability_friendly: yup.string().required("Please select an option"),
  pet_friendly: yup.string().required("Please select an option"),
  private_bathroom: yup.string().required("Please select an option"),
  image_url_1: yup.string().required("Please enter a URL"),
  image_url_2: yup.string().required("Please enter a URL"),
  image_url_3: yup.string().required("Please enter a URL"),
});

export default function AddForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const token = retrieveToken();

  async function onSubmit(data, e) {
    await axios
      .post(
        api + hotelEndpoint,
        {
          data: {
            name: data.name,
            type: data.type,
            price: data.price,
            guests: data.guests,
            wifi: data.wifi,
            breakfast_included: data.breakfast_included,
            disability_friendly: data.disability_friendly,
            pet_friendly: data.pet_friendly,
            private_bathroom: data.private_bathroom,
            address: data.address,
            description: data.description,
            facilities: data.facilities,
            image_url_1: data.image_url_1,
            image_url_2: data.image_url_2,
            image_url_3: data.image_url_3,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((response) => {
        setSubmitted(true);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.response);
        setErrorMessage(error.response.statusText);
      });
  }

  return (
    <>
      {submitted && (
        <div className="success-container">
          New accommodation has been added
        </div>
      )}
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      <Form onSubmit={handleSubmit(onSubmit)} className="admin">
        <Form.Group className="mb-3 form-inline inline-first">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-danger-admin">{errors.name.message}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3 form-inline">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Select type"
            name="type"
            {...register("type")}
          >
            <option disabled value hidden>
              Select type
            </option>
            <option value="hotel">Hotel</option>
            <option value="hostel">Hostel</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="cabin">Cabin</option>
          </Form.Select>
          {errors.type && (
            <span className="text-danger-admin">{errors.type.message}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3 form-inline inline-first">
          <Form.Label>Price per night</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Price"
            {...register("price")}
          />
          {errors.price && (
            <span className="text-danger-admin">{errors.price.message}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3 form-inline">
          <Form.Label>Max # of guests</Form.Label>
          <Form.Control
            type="number"
            name="guests"
            placeholder="Guests"
            {...register("guests")}
          />
          {errors.guests && (
            <span className="text-danger-admin">{errors.guests.message}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3 form-inline inline-first">
          <Form.Label>Wi-Fi</Form.Label>
          <Form.Select
            aria-label="Select option"
            name="wifi"
            {...register("wifi")}
          >
            <option disabled value hidden>
              Select option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
          {errors.wifi && (
            <span className="text-danger-admin">{errors.wifi.message}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3 form-inline">
          <Form.Label>Breakfast Included</Form.Label>
          <Form.Select
            aria-label="Select option"
            name="breakfast_included"
            {...register("breakfast_included")}
          >
            <option disabled value hidden>
              Select option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
          {errors.breakfast_included && (
            <span className="text-danger-admin">
              {errors.breakfast_included.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3 form-inline inline-first">
          <Form.Label>Disability Friendly</Form.Label>
          <Form.Select
            aria-label="Select option"
            name="disability_friendly"
            {...register("disability_friendly")}
          >
            <option disabled value hidden>
              Select option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
          {errors.disability_friendly && (
            <span className="text-danger-admin">
              {errors.disability_friendly.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3 form-inline">
          <Form.Label>Pet Friendly</Form.Label>
          <Form.Select
            aria-label="Select option"
            name="pet_friendly"
            {...register("pet_friendly")}
          >
            <option disabled value hidden>
              Select option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
          {errors.pet_friendly && (
            <span className="text-danger-admin">
              {errors.pet_friendly.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3 form-inline inline-first">
          <Form.Label>Private Bathroom</Form.Label>
          <Form.Select
            aria-label="Select option"
            name="private_bathroom"
            {...register("private_bathroom")}
          >
            <option disabled value hidden>
              Select option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
          {errors.private_bathroom && (
            <span className="text-danger-admin">
              {errors.private_bathroom.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3 form-inline">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Address"
            {...register("address")}
          />
          {errors.address && (
            <span className="text-danger-admin">{errors.address.message}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-danger-admin">
              {errors.description.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image_url_1"
            placeholder="Image URL"
            {...register("image_url_1")}
          />
          {errors.image_url_1 && (
            <span className="text-danger-admin">
              {errors.image_url_1.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image_url_2"
            placeholder="Image URL"
            {...register("image_url_2")}
          />
          {errors.image_url_2 && (
            <span className="text-danger-admin">
              {errors.image_url_2.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image_url_3"
            placeholder="Image URL"
            {...register("image_url_3")}
          />
          {errors.image_url_3 && (
            <span className="text-danger-admin">
              {errors.image_url_3.message}
            </span>
          )}
        </Form.Group>

        <Button type="submit" className="admin">
          Add
        </Button>
      </Form>
    </>
  );
}
