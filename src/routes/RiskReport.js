import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";

async function submitRisk(input){
    return fetch(`${process.env.REACT_APP_SERVER}/insert-risk`, {
        method: "PUT",
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
        if(inputs.detail &&
            inputs.location &&
            inputs.location !== '0'){
            Swal.fire({
                title: 'ยืนยันการรายงาน',
                text: 'ยืนยันการรายงานความเสี่ยง',
                icon: 'warning',
                showCancelButton: true,
            }).then(async confirm => {
                if(confirm.isConfirmed){
                    response = await submitRisk({
                        reporter: user.username,
                        detail: inputs.detail, 
                        location: inputs.location
                    });
                    if(response.status === '201'){
                        Swal.fire({
                            title: 'Success',
                            text: 'ดำเนินการเพิ่มข้อมูลความเสี่ยงเรียบร้อยแล้ว',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            window.location.href = '/';
                        });
                    }else{
                        Swal.fire({
                            title: 'ล้มเหลว',
                            text: 'เกิดปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
                            icon: 'error'
                        });
                    }
                }
            })     
        }else{
            Swal.fire({
                title: 'ล้มเหลว',
                text: 'โปรดระบุรายละเอียดความเสี่ยง',
                icon: 'error'
            });
        }
    }

    return(
        <Container className="p-5">
            <h1>รายงานความเสี่ยง</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-3">
                    <Form.Label>รายละเอียดความเสี่ยง</Form.Label>
                    <Form.Control 
                    name="detail" 
                    type="text" 
                    as="textarea"
                    value={'' || inputs.detail}
                    onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>สถานที่แจ้งความเสี่ยง</Form.Label>
                    <Form.Select 
                        name="location" 
                        value={'' || inputs.location}
                        onChange={handleChange}>
                        <option value='0'>-- สถานที่ --</option>
                        <option>ประสานมิตร</option>
                        <option>องครักษ์</option>
                    </Form.Select>
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