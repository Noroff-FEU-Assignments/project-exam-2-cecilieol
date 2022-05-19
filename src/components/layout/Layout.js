import logo from "../../logo.svg";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "../home/Home";
import Hotels from "../hotels/Hotels";
import Details from "../details/Details";
import Contact from "../contact/Contact";
import Login from "../login/Login";
import Add from "../admin/add/Add";
import Enquiries from "../admin/enquiries/Enquiries";
import Messages from "../admin/messages/Messages";

export default function Layout() {
 return (
    <Router>
        <Navbar collapseOnSelect expand="lg">
            <Container fluid>
                <NavLink to="/" exact className="logo">
                    <Navbar.Brand>
                        <img src={logo} alt="Holidaze Logo" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">

                    <Nav>
                        <NavLink to="/hotels" exact className="nav-link">Browse</NavLink>
                        <NavLink to="/contact" exact className="nav-link">Contact</NavLink>
                        <NavLink to="/login" exact className="nav-link">Login</NavLink>
                        <NavLink to="/add" exact className="nav-link">Add</NavLink>
                        <NavLink to="/enquiries" exact className="nav-link">Enquiries</NavLink>
                        <NavLink to="/messages" exact className="nav-link">Messages</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container fluid>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/hotels" exact element={<Hotels />} />
                <Route path="/hotels/details/:id" element={<Details />} />
                <Route path="/contact" exact element={<Contact />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/add" exact element={<Add />} />
                <Route path="/enquiries" exact element={<Enquiries />} />
                <Route path="/messages" exact element={<Messages />} />
            </Routes>
        </Container>
   </Router>
 );
}