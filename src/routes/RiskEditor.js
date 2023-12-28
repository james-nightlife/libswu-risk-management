import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { dateToDateTime } from "../components/Simple";
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

const RiskEditor = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const id = Number(localStorage.getItem('risk_id'));
    const [risk, setRisk] = useState([]);
    
    if(!id){
        window.location.href = "/";
    }

    const fetchRiskData = async () => {
        await fetch('http://127.0.0.1:9000/get-risk', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                risk_id: id
            })
        }).then((data) => (data.json()))
        .then((data) => {
            setRisk(data.result);
        }).catch((error) => {
            console.error('Error fetching risk data:', error);
        });
    }

    useEffect(() => {
        fetchRiskData();
    }, []);

    const disabled = () => {
        if(user.username === risk.reporter){
            return(false)
        }else{
            return(true)
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRisk(values => ({...values, [name]: value}));
    }

    
    const handleSubmit = async (e) => {
        let response;
        e.preventDefault();
        if(risk.detail){
            response = await submitRisk({
                reporter: user.username,
                detail: risk.detail
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
                <h5>ข้อมูลความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label>รายละเอียดความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="detail" 
                        type="text" 
                        as="textarea"
                        disabled={disabled()}
                        value={risk.detail} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ผู้รายงานความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="reporter" 
                        type="text" 
                        disabled 
                        value={risk.reporter} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>วันที่รายงานความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="report_date" 
                        type="text" 
                        disabled 
                        value={dateToDateTime(risk.report_date)} />
                </Form.Group>
                <h5>การประเมินความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label>การประเมินความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="detail" 
                        type="text" 
                        as="textarea"
                        disabled={disabled()}
                        value={risk.detail} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ผู้ประเมินความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="report_date" 
                        type="text" 
                        disabled 
                        value={risk.assessor || ''} />
                </Form.Group>
                <div className="d-grid mt-3">
                    <Button type="submit">
                        บันทึก
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default RiskEditor;