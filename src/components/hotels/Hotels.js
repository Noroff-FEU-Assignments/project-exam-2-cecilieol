import { Heading } from "../layout/Heading";
import HotelList from "./list/HotelList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SearchBox from "./SearchBox";

export default function Hotels() {
 return (
    <>
      <Heading title="Browse accommodations" />
      <Container fluid className="desktop-flex-evenly">
         <SearchBox />
         <Row className="align-items-end">
            <HotelList />
         </Row>
      </Container>
    </>
 );
}