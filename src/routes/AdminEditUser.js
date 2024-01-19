import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import UserEditForm from "../forms/UserEditForm";
import { UserUpdateRequest } from "../requests/UserUpdateRequest";
import { SignOut } from "../functions/SignOut";

const AdminEditUser = () => {
    document.title = "จัดการบัญชีผู้ใช้";

    const user = localStorage.getItem('edit_username');
    const token = sessionStorage.getItem('token') 
    const username = sessionStorage.getItem('username');

    // Form Input
    const [input, setInput] = useState([]);

    // อัปเดต input
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [name]: value}));
    }

    useEffect(() => {
        fetchRiskData();
    }, []);

    // ดึงข้อมูลความเสี่ยง (datatype id ความเสี่ยงต้องเป็น number)
    const fetchRiskData = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/user/record/${user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'lib-token': token,
            },
        }).then(async (res) => {
            const status = res.status;
            const data = await res.json();
            if(status === 200){
                setInput({
                    username: data.username,
                    role: data.role
                });
            }else if(status === 500){
                handleTokenExpiration()
            }
        }).catch((error) => {
            console.error('Error fetching risk data:', error);
        });
    }

    const handleTokenExpiration = () => {
        Swal.fire({
            title: 'เซสชันหมดอายุ',
            text: 'กรุณาลงชื่อเข้าใช้อีกครั้ง',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
            allowOutsideClick: false
        }).then(() => {
            setTimeout(() => {
                SignOut();
            }, 2000 )
            
        });
    }
    
    //เช็กว่าเป็นแอคของเจ้าของหรือไม่
    var roleDropdown = false
    if(input.username === username){
        roleDropdown = true
    }else{
        roleDropdown = false
    }

    // ตรวจสอบการเพิ่มบัญชีผู้ใช้
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(
           input.role && 
           input.role !== '0'
        ){
            Swal.fire({
                title: 'ยืนยันการแก้ไข',
                html: `บัวศรีไอดี : ${input.username} <br>
                        สถานะการใช้งาน : ${input.role} <br>`,
                icon: 'warning',
                showCancelButton: true,
            }).then(async (confirm) =>  {
                if(confirm.isConfirmed){
                    const response = await UserUpdateRequest({
                            username: input.username,
                            role: input.role,
                        }, user, token);
                    if(response.status === 200){
                        Swal.fire({
                            title: 'สำเร็จ',
                            text: response.message,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000,
                            allowOutsideClick: false,
                        }).then(() => {
                            window.location.href = '/admin/users';
                        })
                    }else{
                        Swal.fire({
                            title: 'ล้มเหลว',
                            text: response.message,
                            icon: 'error',
                            allowOutsideClick: false,
                        })
                    }  
                }
            }) 
        }else{
            Swal.fire({
                title: 'ล้มเหลว',
                text: 'โปรดระบุข้อมูลของผู้ใช้',
                icon: 'error',
                allowOutsideClick: false,
            })
        }    
    }

    return(
        <Container className="p-3">
            <UserEditForm handleChange={handleChange} handleSubmit={handleSubmit} inputs={input} roleDropdown={roleDropdown} />
        </Container>
    );
}
export default AdminEditUser;