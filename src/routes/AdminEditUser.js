import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { updateUser } from "../components/RequestProcess";
import UserEditForm from "../forms/UserEditForm";

const AdminEditUser = () => {
    // Form Input
    const [input, setInput] = useState([]);

    const user = localStorage.getItem('edit_username');

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
                'lib-token': token
            },
        }).then((data) => (data.json()))
        .then((data) => {
            setInput({
                username: data.username,
                role: data.role
            });    
        }).then(() => {
            
        })
        .catch((error) => {
            console.error('Error fetching risk data:', error);
        });
    }

    


    const token = sessionStorage.getItem('token')
    
    const username = sessionStorage.getItem('username');

    var roleDropdown = false

    //เช็กว่าเป็นแอคของเจ้าของหรือไม่

    if(input.username === username){
        roleDropdown = true
    }else{
        roleDropdown = false
    }


    // ตรวจสอบการเพิ่มบัญชีผู้ใช้
    const handleSubmit = async (e) => {
        let response;
        e.preventDefault();
        if(input.username && /*
           input.uni_id &&
           input.name &&
           input.faculty &&
           input.status && */
           input.role && /*
           input.faculty !== '0' &&
           input.status !== '0' && */
           input.role !== '0' ){
            Swal.fire({
                title: 'ยืนยันการแก้ไข',
                html: `บัวศรีไอดี : ${input.username} <br>
                            เลขประจำตัวบุคลากร / นิสิต : ${input.uni_id} <br>
                            ชื่อ - สกุล : ${input.name} <br>
                            ส่วนงาน : ${input.faculty} <br>
                            สถานะ : ${input.status} <br>
                            สถานะการใช้งาน : ${input.role} <br>
                            เปลี่ยนรหัสผ่าน : ${Boolean(input.password)}`,
                icon: 'warning',
                showCancelButton: true,
            }).then(async confirm =>  {
                if(confirm.isConfirmed){
                    if(input.password){
                        response = await updateUser({
                            username: input.username,
                            password: input.password, /*
                            uni_id: input.uni_id,
                            name: input.name,
                            faculty: input.faculty,
                            status: input.status, */
                            role: input.role
                        }, user, token)
                    }else{
                        response = await updateUser({
                            username: input.username,
                            role: input.role,
                        }, user, token)
                    }
                    console.log(response)
                    if(response.status === 200){
                        Swal.fire({
                            title: 'สำเร็จ',
                            text: 'ดำเนินการแก้ไขข้อมูลผู้ใช้เรียบร้อยแล้ว',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            window.location.href = '/admin/users';
                        })
                    }else{
                        Swal.fire({
                            title: 'ล้มเหลว',
                            text: 'เกิดปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
                            icon: 'error',
                        })
                    }  
                }
            }) 
        }else{
            Swal.fire({
                title: 'ล้มเหลว',
                text: 'โปรดระบุข้อมูลของผู้ใช้',
                icon: 'error'
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