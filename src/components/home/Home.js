import Row from "react-bootstrap/Row";
import SearchResults from "./SearchResults";

export default function Home() {
 return (
     <Row>
        <div className="gradient">
            <SearchResults />
        </div>
     </Row>
 );
}