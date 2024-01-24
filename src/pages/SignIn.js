import { useState } from "react";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import logo from '../images/SWU_Central_Library_TH_Color.png';
import SignInForm from "../forms/SignInForm";
import { SignInRequest } from "../requests/SignInRequest";
import { FailAlert } from "../alert/FailAlert";

const SignIn = () => {
    document.title = "ลงชื่อเข้าใช้";

    const [inputs, setInputs] = useState({});
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(
            inputs.username && 
            inputs.password
        ){
            const response = await SignInRequest({
                username: inputs.username,
                password: inputs.password,
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
            }
        }else{
            FailAlert('โปรดระบุบัวศรีไอดีและรหัสผ่านของคุณ');
        } 
    }
    
    return(
        <Container className="p-3">
            <div className="text-center p-3">
                <img 
                    src={logo}
                    height="100"
                    alt="สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ" />
            </div>
            <h1 className="text-center p-3">ลงชื่อเข้าใช้</h1>
            <SignInForm 
                handleSubmit={handleSubmit} 
                handleChange={handleChange} 
                inputs={inputs} />
        </Container>
    );
}
export default SignIn;
