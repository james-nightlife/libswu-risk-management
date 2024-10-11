import { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import logo from '../images/SWU_Central_Library_TH_Color.png';
import SignInForm from "../forms/SignInForm";
import { SignInRequest } from "../requests/SignInRequest";
import { FailAlert } from "../alert/FailAlert";

const SignIn = () => {
    /** TITLE */
    document.title = "ลงชื่อเข้าใช้";

    /** INPUTS */
    const [inputs, setInputs] = useState({});
    const [signInButton, setSignInButton] = useState(false)

    /** HANDLE INPUT */
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    /** HANDLE AUTHENTICATION */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignInButton(true) // AVOID MULTIPLE REQUESTS THAT WILL CAUSE MULTIPLE INSERTIONS FOR NEW USERS
        if(
            inputs.username && 
            inputs.password
        ){
            const response = await SignInRequest({
                username: inputs.username.toLowerCase().trim(),
                password: inputs.password,
                role: [
                    'visitor',
                ]
            });
            if(response.status === 200){
                Swal.fire({
                    title: 'สำเร็จ',
                    text: response.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                    allowOutsideClick: false,
                }).then(() => {
                    sessionStorage.setItem('token', response.token);
                    sessionStorage.setItem('username', response.payload.user.username);
                    sessionStorage.setItem('role', response.role);
                    sessionStorage.setItem('name', response.fullname);
                    window.location.href = '/';
                })
            }else{
                FailAlert(response.message);
                setSignInButton(false);
            }
        }else{
            FailAlert('โปรดระบุบัวศรีไอดีและรหัสผ่านของคุณ');
            setSignInButton(false)
        } 
    }

    /** RENDER */
    return(
        <Container className="p-3">
            <Row>
                <Col sm></Col>
                <Col sm>
                    <Container className="p-3 border rounded">
                        <div className="text-center p-3">
                            <Image 
                                src={logo}
                                height={100}
                                alt="สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ" />
                        </div>
                        <SignInForm 
                            handleSubmit={handleSubmit} 
                            handleChange={handleChange} 
                            inputs={inputs}
                            signInButton={signInButton} />
                    </Container>  
                </Col>
                <Col sm></Col>
            </Row>
             
        </Container>
    );
}
export default SignIn;
