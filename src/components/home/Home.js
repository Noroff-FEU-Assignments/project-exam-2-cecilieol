import Row from "react-bootstrap/Row";
import SearchResults from "./SearchResults";
import FeaturedList from "./list/FeaturedList";

export default function Home() {
 return (
     <Row>
            <SearchResults />
            <FeaturedList />
     </Row>
 );
}