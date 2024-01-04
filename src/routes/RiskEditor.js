import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { dateToDateTime } from "../components/Simple";
import Swal from "sweetalert2";

// ส่ง Request เพื่อแก้ไขข้อมูลความเสี่ยง
async function editRisk(input){
    return fetch('http://127.0.0.1:9000/edit-risk', {
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

// ส่ง Request เพื่อประเมินความเสี่ยง
async function evalRisk(input){
    return fetch('http://127.0.0.1:9000/eval-risk', {
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

// ส่ง Request เพื่อประเมินความเสี่ยง
async function deleteRisk(input){
    return fetch('http://127.0.0.1:9000/delete-risk', {
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
    
    // ดักการลักไก่เข้าหน้าข้อมูลความเสี่ยงผ่าน Url
    if(!id){
        window.location.href = "/";
    }

    // ดึงข้อมูลความเสี่ยง (datatype id ความเสี่ยงต้องเป็น number)
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

    // ผู้รายงานความเสี่ยงสามารถแก้ไขข้อมูลความเสี่ยง
    const reporterEdit = () => {
        if(user.username === risk.reporter){
            return(false)
        }else{
            return(true)
        }
    }

    // admin เป็นผู้ประเมินความเสี่ยง
    const evaluation = () => {
        if(user.role === 'admin'){
            return(false)
        }else{
            return(true)
        }
    }

    const disabledDeleteBtn = () => {
        if(user.role === 'admin' || user.username === risk.reporter){
            return(false);
        }else{
            return(true);
        }
    }


    // อัปเดต input
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRisk(values => ({...values, [name]: value}));
    }

    // ตรวจสอบการแก้ไขข้อมูลความเสี่ยง
    const handleEdit = async (e) => {
        let response;
        e.preventDefault();
        if(risk.detail){
            Swal.fire({
                title: 'ยืนยันการแก้ไข',
                text: 'ยืนยันการแก้ไขข้อมูลความเสี่ยง',
                icon: 'warning',
                showCancelButton: true,
            }).then(async confirm =>  {
                if(confirm.isConfirmed){
                    response = await editRisk({
                        id: id,
                        detail: risk.detail
                    })
                    if(response.status === '201'){
                        Swal.fire({
                            title: 'Success',
                            text: 'ดำเนินการแก้ไขข้อมูลความเสี่ยงเรียบร้อยแล้ว',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                         }).then(() => {
                            window.location.href = '/';
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
                text: 'โปรดระบุรายละเอียดความเสี่ยง',
                icon: 'error'
            })
        }    
    }

    // ตรวจสอบข้อมูลการประเมินความเสี่ยง
    const handleEvaluation = async (e) => {
        let response;
        e.preventDefault();
        if(risk.feedback){
            Swal.fire({
                title: 'ยืนยันการประเมิน',
                text: 'ยืนยันการประเมินความเสี่ยง',
                icon: 'warning',
                showCancelButton: true,
            }).then(async confirm =>  {
                if(confirm.isConfirmed){
                    response = await evalRisk({
                        id: id,
                        feedback: risk.feedback,
                        assessor: user.username
                    })
                    if(response.status === '201'){
                        Swal.fire({
                            title: 'Success',
                            text: 'ดำเนินการประเมินความเสี่ยงเรียบร้อยแล้ว',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            window.location.href = '/';
                        })
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
                text: 'โปรดระบุข้อมูลการประเมินความเสี่ยง',
                icon: 'error'
            });
        }        
    }

    const handleDelete = async (e) => {
        let response;
        e.preventDefault();
        Swal.fire({
            title: 'ยืนยันการลบข้อมูล',
                text: 'ยืนยันการลบข้อมูลความเสี่ยง',
                icon: 'warning',
                showCancelButton: true,
        }).then(async confirm => {
            if(confirm.isConfirmed){
                response = await deleteRisk({
                    id: id,
                })
                if(response.status === '201'){
                    Swal.fire({
                        title: 'Success',
                        text: response.message,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        window.location.href = '/';
                    })
                }else{
                    Swal.fire({
                        title: 'ล้มเหลว',
                        text: 'เกิดปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
                        icon: 'error'
                    });
                }
            }
        });
    }

    return(
        <Container className="p-5">
            <Form onSubmit={handleEdit}>
                <h5>ข้อมูลความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label className="pt-3">รายละเอียดความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="detail" 
                        type="text" 
                        as="textarea"
                        onChange={handleChange}
                        disabled={reporterEdit()}
                        value={risk.detail} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">ผู้รายงานความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="reporter" 
                        type="text" 
                        disabled 
                        value={risk.reporter} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">วันที่รายงานความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="report_date" 
                        type="text" 
                        disabled 
                        value={dateToDateTime(risk.report_date)} />
                </Form.Group>
                <div className="d-grid mt-3">
                    <Button 
                        type="submit" 
                        disabled={reporterEdit()}>
                        แก้ไขข้อมูล
                    </Button>
                </div>
            </Form>
            <Form onSubmit={handleEvaluation}>
                <h5 className="pt-3">การประเมินความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label className="pt-3">การประเมินความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="feedback" 
                        type="text" 
                        as="textarea"
                        disabled={evaluation()}
                        onChange={handleChange}
                        value={risk.feedback} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">ผู้ประเมินความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="report_date" 
                        type="text" 
                        disabled 
                        value={risk.assessor} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">วันที่ประเมินความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="eval_date" 
                        type="text" 
                        disabled 
                        value={dateToDateTime(risk.eval_date)} />
                </Form.Group>
                <div className="d-grid mt-3">
                    <Button 
                        type="submit" 
                        disabled={evaluation()}>
                        ประเมินความเสี่ยง
                    </Button>
                </div>
            </Form>
            <Form.Group>
                    <Form.Label className="pt-3">วันที่ปรับปรุงข้อมูลล่าสุด</Form.Label>
                    <Form.Control 
                        name="eval_date" 
                        type="text" 
                        disabled 
                        value={dateToDateTime(risk.latest_update_date)} />
                </Form.Group>
            <div className="d-grid mt-3">
                    <Button 
                        className="btn-danger" 
                        disabled={disabledDeleteBtn()}
                        onClick={handleDelete}>
                        ลบข้อมูลความเสี่ยง
                    </Button>
                </div>
        </Container>
    );
};

export default RiskEditor;