import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import moment from "moment";

export default function MessageCard({ firstname, lastname, email, subject, message, received }) {

    const receivedformat = moment(received).format('DD.MM.YYYY');

    return (
        <Col>
            <Card className="message-card">
                <Card.Body>
                    <div className="card-top">
                        <Card.Title>From: {firstname} {lastname}</Card.Title>
                        <Card.Text>Received: {receivedformat}</Card.Text>
                    </div>
                    <div className="card-left">
                    <Card.Text className="bold">Subject: {subject}</Card.Text>
                    <Card.Text>Message: {message}</Card.Text>
                    </div>
                    <div className="card-bottom">
                    <Button className="admin" onClick={() => window.location = `mailto:${email}`}>Respond to message</Button>
                    <Button className="danger">Delete request</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

MessageCard.propTypes = {
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

