import { useState, useEffect, useContext} from "react";
import AuthContext from "../../context/AuthContext";
import { api, hotelEndpoint } from "../../constants/api";
import axios from 'axios';
import searchicon from "../../search-interface-symbol.png";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Heading } from "../layout/Heading";

export default function SearchResults() {

    const [results, setResults] = useState([]);
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isActive, setActive] = useState(false);

    // eslint-disable-next-line 
    const [auth, setAuth] = useContext(AuthContext);

    useEffect(() => {
        const loadResults = async () => {
        const response = await axios.get(api + hotelEndpoint);
        setResults(response.data.data);
        }
        loadResults();
    }, [])

    const onChangeHandler = (text) => {
        let matches = [];
        
        if (text.length > 0) {
            matches = results.filter(result => {
                const regex = new RegExp(`${text}`, "gi");
                setActive(true);
                return result.attributes.name.match(regex);
            })

        } else {
            setActive(false);
        }

        setSuggestions(matches);
        setText(text);
    }

    return (
        <div className={auth ? ("search-container admin") : ("search-container")}>
            <div className={auth ? ("search-box admin") : ("search-box")}>
                <Heading title="Find your next stay" />
                <InputGroup className={isActive ? "d-flex m-auto search-bar-active" : "d-flex m-auto search-bar"}>
                    <FormControl
                    type="search"
                    placeholder="Search hotel names.."
                    className="me-2"
                    aria-label="Search"
                    onChange={e => onChangeHandler(e.target.value)}
                    value={text}
                    />
                
                    <Button variant="link">
                        <img src={searchicon} alt="Search" className="search-icon" />
                    </Button>
                </InputGroup>

                {suggestions && suggestions.map((suggestion, i) =>
                <Link to={`hotels/details/${suggestion.id}`} key={suggestion.id} >
                    <div key={i} className="result">
                        <img src={suggestion.attributes.image_url_1} alt={suggestion.attributes.name}/>
                        <div className="d-block ms-2">
                            <p>{suggestion.attributes.name}</p>
                            <p>${suggestion.attributes.price} / night</p>
                        </div>
                    </div>
                </Link>
                )}
            </div>
        </div>
    )
}

