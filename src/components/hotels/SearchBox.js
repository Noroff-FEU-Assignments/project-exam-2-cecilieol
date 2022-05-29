import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Accordion from "react-bootstrap/Accordion";

export default function SearchBox() {

    return (
        <>
            <Accordion flush className="modified-accordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Search and filter results</Accordion.Header>
                    <Accordion.Body className="collapse show">
                        <Form className="search-box">
                            <Form.Group className="mb-3">
                                <Form.Label>Search</Form.Label>
                                <FormControl
                                    type="Search"
                                    placeholder="Search by name, location..."
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

                            <Form.Group>
                                <Form.Label>Min. number of guests</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                                    <FormControl type="number" />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Max. price per night</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <FormControl type="number" />
                                </InputGroup>
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
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}