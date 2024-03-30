import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import UserEditForm from "../forms/UserEditForm";
import { UserUpdateRequest } from "../requests/UserUpdateRequest";
import { ConfirmAlert } from "../alert/ConfirmAlert";
import { SuccessAlert } from "../alert/SuccessAlert";
import { FailAlert } from "../alert/FailAlert";
import { SessionExpired } from "../functions/SessionExpired";
import { UserEditInputControl } from "../functions/UserEditInputControl";

const AdminEditUser = () => {
    // TITLE
    document.title = "จัดการบัญชีผู้ใช้";

    // Form Input
    const [input, setInput] = useState([]);
    const user = localStorage.getItem('edit_username');
    const token = sessionStorage.getItem('token') 

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
                    role: data.role,
                    oldrole: data.role
                });
            }else if(status === 500){
                SessionExpired();
            }
        }).catch((error) => {
            console.error('Error fetching risk data:', error);
        });
    }

    useEffect(() => {
        fetchRiskData();
    }, []);

    // อัปเดต input
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [name]: value}));
    }
    
    //เช็กว่าเป็นแอคของเจ้าของหรือไม่
    var roleDropdown = UserEditInputControl(input);
    
    // ตรวจสอบการเพิ่มบัญชีผู้ใช้
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(
           input.role.length > 0
        ){
            console.log(input.role);
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
            <UserEditForm 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                inputs={input} 
                setInputs={setInput} />
        </Container>
    );
}
export default AdminEditUser;