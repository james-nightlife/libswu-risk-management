import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from './SWU_Central_Library_TH_Color.png';
import './web.css';

function ENavbar({user}){
    const name = user['name'];
    var adminNav;

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        window.location.href = "/";
    };

    if(user.role === 'admin'){
        adminNav = <Nav.Link href="/user-manager">จัดการผู้ใช้</Nav.Link>;
    }
    

    return(
        <>
            <Navbar className="bg-white" fixed="top" expand='sm'>
                    <Navbar.Brand href="https://lib.swu.ac.th">
                        <img src={logo} height="100" alt="สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ" />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">                   
                        <Navbar.Brand href="/">ระบบจัดการความเสี่ยง</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" /> 
                        <Nav className="me-auto">
                            <Nav.Link href="/report">รายงานความเสี่ยง</Nav.Link>
                            {adminNav}
                        </Nav>   
                        <Nav className="d-flex">
                            <NavDropdown title={`สวัสดี, ${name}`}>
                                <NavDropdown.Item onClick={handleLogout}>ออกจากระบบ</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> 
                    </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default ENavbar;