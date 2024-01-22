import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import UserEditForm from "../forms/UserEditForm";
import { UserUpdateRequest } from "../requests/UserUpdateRequest";
import { ConfirmAlert } from "../alert/ConfirmAlert";
import { SuccessAlert } from "../alert/SuccessAlert";
import { FailAlert } from "../alert/FailAlert";
import { SessionExpired } from "../functions/SessionExpired";

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

    const handleTokenExpiration = async () => {
        SessionExpired();
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
            ConfirmAlert({
                title: 'ยืนยันการแก้ไข',
                html: `บัวศรีไอดี : ${input.username} <br>
                        สถานะการใช้งาน : ${input.role} <br>`,
            }, async () => {
                const response = await UserUpdateRequest({
                    username: input.username,
                    role: input.role,
                }, user, token);
                if(response.status === 200){
                    SuccessAlert(response.message, '/admin/users')     
                }else{
                    FailAlert(response.message);
                }
            })
        }else{
            FailAlert('โปรดระบุข้อมูลของผู้ใช้');
        }    
    }

    return(
        <Container className="p-3">
            <UserEditForm handleChange={handleChange} handleSubmit={handleSubmit} inputs={input} roleDropdown={roleDropdown} />
        </Container>
    );
}
export default AdminEditUser;