import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { submitRisk } from "../components/RequestProcess";

const RiskReport = () => {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
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
                        reporter: username,
                        detail: inputs.detail, 
                        location: inputs.location
                    }, token);
                    if(response.status == 200){
                        Swal.fire({
                            title: 'Success',
                            text: response.message,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            window.location.href = '/';
                        });
                    }else{
                        Swal.fire({
                            title: 'ล้มเหลว',
                            text: response.message,
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