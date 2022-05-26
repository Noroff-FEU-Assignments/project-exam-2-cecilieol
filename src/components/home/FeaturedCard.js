import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// import star from "../../../star.png";

export default function HotelCard({ name, price, guests, image }) {

    return (
        <Col>
            <Card className="featured-card">
                <Card.Img src={image} alt={name} className="featured-img"/>
                <Card.Body className="featured-body">
                    <Card.Title className="featured-title"><h3>{name}</h3></Card.Title>
                    <div className="featured-bottom">
                        <Card.Text className="guests"><i className="fa fa-user"></i> {guests}</Card.Text>
                        <Card.Text className="featured-text bold">${price} / night</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

HotelCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};
