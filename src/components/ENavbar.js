import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from './SWU_Central_Library_TH_Color.png';
import './web.css';
import { SignOut } from "../functions/SignOut";

function ENavbar(){
    const username = sessionStorage.getItem('name');
    const role = sessionStorage.getItem('role');
    var adminNav;

    if(role === 'admin'){
        adminNav = <Nav.Link href="/admin/users">จัดการผู้ใช้</Nav.Link>;
    }
    
    return(
        <>
            <Navbar className="bg-white" sticky="top" expand='sm'>
                <Container>
                    <Navbar.Brand href="https://lib.swu.ac.th" className='m-auto'>
                        <img src={logo} height="100" alt="สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ" />
                    </Navbar.Brand>
                    <Navbar.Brand href="/">ระบบรวบรวมรายงานความเสี่ยง</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="/report">รายงานความเสี่ยง</Nav.Link>
                            {adminNav}
                        </Nav>   
                        <Nav className="d-flex">
                            <NavDropdown title={`สวัสดี, ${username}`}>
                                {/* <NavDropdown.Item href="/change-password">เปลี่ยนรหัสผ่าน</NavDropdown.Item> */}
                                <NavDropdown.Item onClick={SignOut}>ออกจากระบบ</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> 
                    </Navbar.Collapse>
                </Container>    
            </Navbar>
        </>
    )
}

export default ENavbar;