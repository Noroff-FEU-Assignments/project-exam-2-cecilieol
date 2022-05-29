import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function Footer() {

    // eslint-disable-next-line 
    const [auth, setAuth] = useContext(AuthContext);

    return (
        <footer className={auth ? ("admin") : ("")}>
            <p>Copyright © 2022 Holidaze. All rights reserved.</p>
        </footer>
    )
}