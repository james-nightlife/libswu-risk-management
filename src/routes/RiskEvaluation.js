import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { dateToDateTime } from "../components/Simple";

const RiskEvaluation = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const id = Number(localStorage.getItem('risk_id'));
    if(!id){
        window.location.href = "/";
    }
    
    const [risk, setRisk] = useState([]);

    useEffect(() => {
        fetchRiskData();
    }, []);

    const fetchRiskData = async () => {
        await console.log("test")
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


    return(
        <Container className="p-5">
            <Form>
                <h5>ข้อมูลความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label>รายละเอียดความเสี่ยง</Form.Label>
                    <Form.Control name="detail" type="text" disabled value={risk.detail} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ผู้รายงานความเสี่ยง</Form.Label>
                    <Form.Control name="reporter" type="text" disabled value={risk.reporter} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>วันที่รายงานความเสี่ยง</Form.Label>
                    <Form.Control name="report_date" type="text" disabled value={dateToDateTime(risk.report_date)} />
                </Form.Group>
                <h5>การประเมินความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label>ผู้ประเมินความเสี่ยง</Form.Label>
                    <Form.Control name="report_date" type="text" disabled value={user.username} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>โอกาส</Form.Label>
                    <Form.Control name="chance_score" type="number" max={5} min={1} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ผลกระทบ</Form.Label>
                    <Form.Control name="effect_score" type="text" disabled value={user.username} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ระดับความเสี่ยง</Form.Label>
                    <Form.Control name="report_date" type="text" disabled value={user.username} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ประเภทความเสี่ยง</Form.Label>
                    <Form.Select>
                        <option>a</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>รหัสข้อมูลความเสี่ยงที่เกี่ยวข้อง (กรณีที่เป็นความเสี่ยงที่เคยรายงานแล้ว)</Form.Label>
                    <Form.Control name="report_date" type="text" disabled value={user.username} />
                </Form.Group>
            </Form>
        </Container>
    );
};

export default RiskEvaluation;