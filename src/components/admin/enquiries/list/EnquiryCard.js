import moment from "moment";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export default function EnquiryCard({ hotel, firstname, lastname, email, guests, checkin, checkout, message, received }) {

    let firstDate = new Date(checkin);
    let secondDate = new Date(checkout);

    const timeDifference = secondDate.getTime() - firstDate.getTime();
    const nights = timeDifference / (1000 * 3600 * 24);

    const receivedformat = moment(received).format('DD.MM.YYYY');
    const checkinformat = moment(checkin).format('DD.MM.YYYY');
    const checkoutformat = moment(checkout).format('DD.MM.YYYY');

    return (
        <Col>
            <Card className="enquiry-card">
                <Card.Body>
                    <div className="card-top">
                        <Card.Title>Enquiry for {hotel}</Card.Title>
                        <Card.Text>Received: {receivedformat} </Card.Text>
                    </div>
                    <div className="card-mid">
                    <div className="card-left">
                        <Card.Text>Name: {firstname} {lastname}</Card.Text>
                        <Card.Text>Number of guests: {guests}</Card.Text>
                        <Card.Text>Number of nights: {nights} </Card.Text>
                        <Card.Text>Requested dates: {checkinformat} to {checkoutformat}</Card.Text>
                    </div>
                    <div className="card-right">
                        <Card.Text>Additional message: {message}</Card.Text>
                    </div>
                    </div>
                    <div className="card-bottom">
                        <Button className="admin" onClick={() => window.location = `mailto:${email}`}>Respond to enquiry</Button>
                        <Button className="danger">Delete request</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}


EnquiryCard.propTypes = {
    hotel: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    checkin: PropTypes.string.isRequired,
    checkout: PropTypes.string.isRequired,
    message: PropTypes.string
};

