import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import swal from "sweetalert";
import logo from '../components/SWU_Central_Library_TH_Color.png';

/* รับ username และ password ส่งให้ api ตรวจสอบบัญชีผู้ใช้ */
async function loginUser(credentials){
    return fetch('http://127.0.0.1:9000/auth', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then((data) => (data.json()))
    .catch((data) => (({
        'status': 'ok',
        'message': 'ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก'
    })))
}


const SignIn = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async e => {
        let response;
        e.preventDefault();
        if(inputs.username && inputs.password){
            response = await loginUser({
                username: inputs.username,
                password: inputs.password
            });
            if("user" in response){
                swal("Success", response.message, "success", {
                    buttons: false,
                    timer: 2000,
                }).then((value) => {
                    sessionStorage.setItem('user', JSON.stringify(response['user']));
                    window.location.href = '/';
                })
            } else{
                swal("ล้มเหลว", response.message, "error");
            }
        }else{
            swal("ล้มเหลว", "โปรดระบุบัวศรีไอดีและรหัสผ่านของคุณ", "error");
        } 
    }
    
    return(
        <Container className="p-5">
            <div className="text-center p-3">
                <img src={logo} height="100" alt="สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ" />
            </div>
            <h1 className="text-center p-3">ลงชื่อเข้าใช้</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="p-3">
                    <Form.Label>บัวศรีไอดี</Form.Label>
                    <Form.Control 
                        type="text" 
                        name='username' 
                        value={inputs.username || ''} 
                        onChange={handleChange} 
                        placeholder="กรอกบัวศรีไอดีของคุณ" 
                    />
                </Form.Group>
                <Form.Group className="p-3" >
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <Form.Control 
                        type="password" 
                        name='password' 
                        value={inputs.password || ''} 
                        onChange={handleChange} 
                        placeholder="กรอกรหัสผ่านของคุณ" 
                    />
                </Form.Group>
                <div className="d-grid p-3">
                    <Button variant="primary" type="submit">
                        ลงชื่อเข้าใช้
                    </Button>
                </div> 
            </Form>
        </Container>
    );
}
export default SignIn;