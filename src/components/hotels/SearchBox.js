import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export default function SearchBox() {
    return (
        <>
            <Form className="search-box">
                <Form.Group className="mb-3">
                    <Form.Label>Name search</Form.Label>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                </Form.Group>

                <Form.Group className="mb-3 form-inline inline-first">
                    <Form.Label>Check-in</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>
                <Form.Group className="mb-3 form-inline">
                    <Form.Label>Check-out</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Number of guests</Form.Label>
                    <Form.Control type="number" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price per night</Form.Label>
                    <Form.Control type="range" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Check type="checkbox" label="Hotel" />
                    <Form.Check type="checkbox" label="Hostel" />
                    <Form.Check type="checkbox" label="Apartment" />
                    <Form.Check type="checkbox" label="House" />
                    <Form.Check type="checkbox" label="Cabin" />
                </Form.Group>

                <Button className="primary" type="submit">Search</Button>
            </Form>
        </>
    )
}