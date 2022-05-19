import { useState, useEffect } from "react";
import { api } from "../../constants/api";
import axios from 'axios';
import searchicon from "../../search-interface-symbol.png";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function SearchResults() {

    const [results, setResults] = useState([]);
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isActive, setActive] = useState("false");

    useEffect(() => {
        const loadResults = async () => {
        const response = await axios.get(api);
        setResults(response.data.data);
        }
        loadResults();
    }, [])

    const onChangeHandler = (text) => {
        let matches = [];
        
        if (text.length > 0) {
            matches = results.filter(result => {
                const regex = new RegExp(`${text}`, "gi");
                return result.attributes.name.match(regex);
            })
            setActive(!isActive);

        } else {
            setActive(isActive);
        }

        setSuggestions(matches);
        setText(text);
    }

    return (
        <div className="search-container">
            <InputGroup className={isActive ? "d-flex m-auto search-bar" : "d-flex m-auto search-bar-active"}>
                <FormControl
                  type="search"
                  placeholder="Search hotel names, location.."
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
    )
}
