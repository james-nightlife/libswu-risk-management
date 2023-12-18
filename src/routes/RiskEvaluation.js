import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";

const RiskEvaluation = () => {
    const id = localStorage.getItem('risk_id');
    if(!id){
        window.location.href = "/";
    }
    
    const [risk, setRisk] = useState([]);

    useEffect(() => {
        fetchRiskData();
    }, []);

    const fetchRiskData = async () => {
        return fetch('http://127.0.0.1:9000/get-risk', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                risk_id: id
            })
        }).then((data) => (data.json()))
        .then((data) => {
            console.log(data)
            setRisk(data.result);
        }).catch();
    }


    return(
        <Container className="p-5">
            {risk}
            <Form>
                <h5>ข้อมูลความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label>รายละเอียดความเสี่ยง</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>ผู้รายงานความเสี่ยง</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>วันที่รายงานความเสี่ยง</Form.Label>
                </Form.Group>
                <h5>การประเมินความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label>ผู้ประเมินความเสี่ยง</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>โอกาส</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>ผลกระทบ</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>ระดับความเสี่ยง</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>ประเภทความเสี่ยง</Form.Label>
                    <Form.Select>
                        <option>a</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>รหัสข้อมูลความเสี่ยงที่เกี่ยวข้อง (กรณีที่เป็นความเสี่ยงที่เคยรายงานแล้ว)</Form.Label>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default RiskEvaluation;