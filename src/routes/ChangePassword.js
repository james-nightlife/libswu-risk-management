import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";

// ส่ง Request เพื่อแก้ไขข้อมูลความเสี่ยง
async function changePassword(input){
    return fetch('http://127.0.0.1:9000/change-password', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
    }).then((data) => (data.json()))
    .catch((data) => ({
        'status': 'ok',
        'message': 'ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก'
    }))
}

const ChangePassword = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [input, setInput] = useState([]);

    // อัปเดต input
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [name]: value}));
    }

    // ตรวจสอบการเพิ่มบัญชีผู้ใช้
    const handleSubmit = async (e) => {
        let response;
        e.preventDefault();
        if(input.oldpassword &&
           input.newpassword1 &&
           input.newpassword2){
            response = await changePassword({
                username: input.username,
                oldpassword: input.oldpassword,
                newpassword1: input.newpassword1,
                newpassword2: input.newpassword2
            })
            if(response.status === '201'){
                Swal.fire({
                    title: 'Success',
                    text: 'ดำเนินการเพิ่มข้อมูลผู้ใช้แล้ว',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })/*.then(() => {
                    window.location.href = '/admin/users';
                })*/
            }else{
                Swal.fire({
                    title: 'ล้มเหลว',
                    text: 'เกิดปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
                    icon: 'error',
                })
            }  

            /*
            
                    if(response.status === '201'){
                        Swal.fire({
                            title: 'Success',
                            text: 'ดำเนินการเพิ่มข้อมูลผู้ใช้แล้ว',
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
        }
            */
        }else{
            Swal.fire({
                title: 'ล้มเหลว',
                text: 'โปรดระบุข้อมูลของผู้ใช้',
                icon: 'error'
            })
        }
            
    }

    return(
        <Container className="p-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>บัวศรีไอดี</Form.Label>
                    <Form.Control 
                        type="text"
                        name="username"
                        value={user.username}
                        disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>รหัสผ่านเดิม</Form.Label>
                    <Form.Control
                        type="password"
                        name="oldpassword"
                        onChange={handleChange}
                        value={input.oldpassword} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>รหัสผ่านใหม่</Form.Label>
                    <Form.Control
                        type="password"
                        name="newpassword1"
                        onChange={handleChange}
                        value={input.newpassword1} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ยืนยันรหัสใหม่</Form.Label>
                    <Form.Control
                        type="password"
                        name="newpassword2"
                        onChange={handleChange}
                        value={input.newpassword2} />
                </Form.Group>
                <div className="d-grid mt-3">
                    <Button
                        type="submit">
                        บันทึก
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default ChangePassword;
