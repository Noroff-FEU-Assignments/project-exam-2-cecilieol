import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import star from "../../../star.png";

export default function HotelCard({ name, description, address, price, image }) {
    return (
        <Col>
            <Card className="hotel-card">
                <Card.Img src={image} alt={name} className="hotel-img"/>
                <Card.Body className="hotel-body">
                    <Card.Title className="hotel-title"><h2>{name}</h2></Card.Title>
                    <Card.Text className="hotel-text description">{description}</Card.Text>
                    <Card.Text className="hotel-text">{address}</Card.Text>
                    <div className="card-bottom">
                        <Card.Text className="rating">
                            <Card.Img src={star} alt="rating1" className="star" />
                            <Card.Img src={star} alt="rating2" className="star" />
                            <Card.Img src={star} alt="rating3" className="star" />
                            <Card.Img src={star} alt="rating4" className="star" />
                            <Card.Img src={star} alt="rating5" className="star" />
                        </Card.Text>
                        <Card.Text className="hotel-text bold">${price} / night</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

HotelCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};

