import logo from "../../logo.svg";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import ProtectedRoutes from "../../helpers/auth/protectedRoutes";
import ScrollToTop from "../../helpers/ScrollToTop";
import Home from "../home/Home";
import Hotels from "../hotels/Hotels";
import Details from "../details/Details";
import Contact from "../contact/Contact";
import Login from "../login/Login";
import Add from "../admin/add/Add";
import Enquiries from "../admin/enquiries/Enquiries";
import Messages from "../admin/messages/Messages";
import Footer from "./Footer";
import AuthContext from "../../context/AuthContext";

export default function Layout() {
    const [expanded, setExpanded] = useState(false);
    const [auth, setAuth] = useContext(AuthContext);

    function logout() {
        setAuth(null);
        localStorage.clear();
        setExpanded(false);
    }

 return (
    <>
        <Router>
            <ScrollToTop>
                <Navbar expand="lg" expanded={expanded} className={auth ? ("admin") : ("")}>
                    <Container fluid>
                        <NavLink to="/" exact className="logo">
                            <Navbar.Brand onClick={() => setExpanded(false)}>
                                <img src={logo} alt="Holidaze Logo" />
                            </Navbar.Brand>
                        </NavLink>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                            <Nav>
                                <NavLink to="/hotels" exact className="nav-link" onClick={() => setExpanded(false)}>Browse</NavLink>
                                <NavLink to="/contact" exact className="nav-link" onClick={() => setExpanded(false)}>Contact</NavLink>
                                {auth ? (
                                <div className="navbar-nav-admin">
                                    <NavLink to="/add" exact className="nav-link" onClick={() => setExpanded(false)}>Add</NavLink>
                                    <NavLink to="/enquiries" exact className="nav-link" onClick={() => setExpanded(false)}>Enquiries</NavLink>
                                    <NavLink to="/messages" exact className="nav-link" onClick={() => setExpanded(false)}>Messages</NavLink>
                                    <NavLink to="/" exact className="nav-link no-style" onClick={logout}>Log out</NavLink>
                                </div>
                                ) : (
                                <div className="navbar-nav-admin">
                                    <NavLink to="/login" exact className="nav-link" onClick={() => setExpanded(false)}>Login</NavLink>
                                </div>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container fluid className="body-container">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/hotels" exact element={<Hotels />} />
                        <Route path="/hotels/details/:id" exact element={<Details />} />
                        <Route path="/contact" exact element={<Contact />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/" element={<ProtectedRoutes/>}>
                            <Route path="/add" exact element={<Add />} />
                            <Route path="/enquiries" exact element={<Enquiries />} />
                            <Route path="/messages" exact element={<Messages />} />
                        </Route>
                    </Routes>
                </Container>
                <Footer />
            </ScrollToTop>
        </Router>
   </>
 );
}