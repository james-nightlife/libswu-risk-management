import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const UserManager = () => {
    const session = JSON.parse(sessionStorage.getItem('user'));
    if(session.role !== 'admin'){
        window.location.href = "/";
    }

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch('http://127.0.0.1:9000/users', {
            method: "GET",
        }).then((data) => (data.json()))
        .then((data) => {
            setUsers(data.data)
        }).catch();
    }

    return(
        <Container className='p-5'>
            <Row>
                <Col>
                    <div className="d-grid">
                        <Button href="/admin/users/add">เพิ่มผู้ใช้</Button>
                    </div> 
                </Col>
                <Col>
                    <div className="d-grid">
                        <Button>เพิ่มผู้ใช้</Button>
                    </div> 
                </Col>
            </Row>

            <Table className="mt-3" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>ชื่อ - สกุล</th>
                        <th>ส่วนงาน</th>
                        <th>สิทธิ์ใช้งาน</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((data, idx) => (
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{data.username}</td>
                            <td>{data.name}</td>
                            <td>{data.faculty}</td>
                            <td>{data.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
export default UserManager;