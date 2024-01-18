import { useState } from "react";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import logo from '../components/SWU_Central_Library_TH_Color.png';
import { loginUser } from "../components/RequestProcess";
import SignInForm from "../forms/SignInForm";

const SignIn = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (e) => {
        let response;
        e.preventDefault();
        if(
            inputs.username && 
            inputs.password
        ){
            response = await loginUser({
                username: inputs.username,
                password: inputs.password,
            });
            if('token' in response){
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
                Swal.fire({
                    title: 'ล้มเหลว',
                    text: response.message,
                    icon: 'error'
                })
            }
        }else{
            Swal.fire({
                title: 'ล้มเหลว',
                text: 'โปรดระบุบัวศรีไอดีและรหัสผ่านของคุณ',
                icon: 'error'
            })
        } 
    }
    
    return(
        <Container className="p-3">
            <div className="text-center p-3">
                <img src={logo} height="100" alt="สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ" />
            </div>
            <h1 className="text-center p-3">ลงชื่อเข้าใช้</h1>
            <SignInForm handleSubmit={handleSubmit} handleChange={handleChange} inputs={inputs} />
        </Container>
    );
}
export default SignIn;
