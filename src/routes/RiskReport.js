import { useState } from "react";
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import swal from "sweetalert";

async function submitRisk(input){
    return fetch('http://127.0.0.1:9000/insert-risk', {
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

const RiskReport = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (e) => {
        let response;
        e.preventDefault();
        if(inputs.detail){
            response = await submitRisk({
                reporter: user.username,
                detail: inputs.detail
            })
            if(response.status === '201'){
                swal("Success", 'ดำเนินการเพิ่มข้อมูลความเสี่ยงเรียบร้อยแล้ว', "success", {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    window.location.href = '/';
                })
            }else{
                swal("ล้มเหลว", 'เกิดปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก', "error");
            }
        }else{
            swal("ล้มเหลว", "โปรดระบุรายละเอียดความเสี่ยง", "error");
        }

    }

    return(
        <Container className="p-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <FormLabel>บัวศรีไอดี</FormLabel>
                    <Form.Control 
                    name="reporter"
                    type="text" 
                    value={user.username} 
                    disabled />
                </Form.Group>
                <Form.Group className="mt-3">
                    <FormLabel>ชื่อ</FormLabel>
                    <Form.Control 
                    name="name" 
                    type="text" 
                    value={user.name} 
                    disabled />
                </Form.Group>
                <Form.Group className="mt-3">
                    <FormLabel>รหัสบุคลากร / นิสิต</FormLabel>
                    <Form.Control 
                    name="uni_id" 
                    type="text" 
                    value={user.uni_id} 
                    disabled />
                </Form.Group>
                <Form.Group className="mt-3">
                    <FormLabel>ส่วนงาน</FormLabel>
                    <Form.Control 
                    name="faculty" 
                    type="text" 
                    value={user.faculty} 
                    disabled />
                </Form.Group>
                <Form.Group className="mt-3">
                    <FormLabel>รายละเอียดความเสี่ยง</FormLabel>
                    <Form.Control 
                    name="detail" 
                    type="text" 
                    as="textarea"
                    value={'' || inputs.detail}
                    onChange={handleChange} />
                </Form.Group>
                <div className="d-grid mt-3">
                    <Button type="submit">
                        บันทึก
                    </Button>
                </div>
                
            </Form>
        </Container>
    )
}
export default RiskReport;