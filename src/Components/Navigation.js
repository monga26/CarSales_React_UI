import React,{Component} from "react";
import {NavLink} from "react-router-dom";
import {Navbar,Nav} from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown'


export default class Navigation extends Component{

    render() {
        return (
          
            <Navbar bg="dark"  variant="dark" expand="lg" sticky="top">
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                        {/* <NavLink className="d-inline p-2 bg-dark text-white" to="/CarDisplayList">Create A Car</NavLink> */}
                        <NavDropdown  title="Vehicle" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/CarDisplayList">Create a Car</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Create a Bike</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }

}
