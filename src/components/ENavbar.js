import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from './SWU_Central_Library_TH_Color.png';
import './web.css';
import { useState } from "react";

function ENavbar({user}){
    const name = user['name'];
    var adminNav;

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        window.location.href = "/";
    };

    if(user.status === 'admin'){
        adminNav = <Nav.Link href="/">ทดสอบ</Nav.Link>;
    }
    

    return(
        <>
            <Navbar className="navcolor" expand='sm'>
                <Container fluid>
                    <Navbar.Brand href="https://lib.swu.ac.th">
                        <img src={logo} height="100" alt="สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ" />
                    </Navbar.Brand>                   
                    <Navbar.Brand href="/">ระบบจัดการความเสี่ยง</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" /> 
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="/">ระบุความเสี่ยง</Nav.Link>
                            {adminNav}
                        </Nav>
                        
                        <Nav className="d-flex">
                            <NavDropdown title={`สวัสดี, ${name}`}>
                                <NavDropdown.Item onClick={handleLogout}>ออกจากระบบ</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> 
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default ENavbar;