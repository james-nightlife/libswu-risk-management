import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { dateToDateTime } from "../components/Simple";
import Swal from "sweetalert2";
import { deleteRisk, updateRisk } from "../components/RequestProcess";

const RiskEditor = () => {
    const username = sessionStorage.getItem('username');
    const id = localStorage.getItem('risk_id');
    const role = sessionStorage.getItem('role');
    const token = sessionStorage.getItem('token');
    const [risk, setRisk] = useState([]);
    
    // ดักการลักไก่เข้าหน้าข้อมูลความเสี่ยงผ่าน Url
    if(!id){
        window.location.href = "/";
    }

    // ดึงข้อมูลความเสี่ยง (datatype id ความเสี่ยงต้องเป็น number)
    const fetchRiskData = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/risk/record/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((data) => (data.json()))
        .then((data) => {
            if(data.status){
                setRisk({...data, old_status: data.status}); 
            }else{
                setRisk({...data, old_status: 'รอดำเนินการ'}); 
            }
        }).catch((error) => {
            console.error('Error fetching risk data:', error);
        });
    }

    useEffect(() => {
        fetchRiskData();
    }, []);

    // ผู้รายงานความเสี่ยงสามารถแก้ไขข้อมูลความเสี่ยง
    const reporterEdit = () => {
        if(username === risk.reporter){
            return(false)
        }else{
            return(true)
        }
    }

    // admin เป็นผู้ประเมินความเสี่ยง
    const evaluation = () => {
        if(role === 'admin'){
            return(false)
        }else{
            return(true)
        }
    }

    const disabledDeleteBtn = () => {
        if(role === 'admin' || username === risk.reporter){
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
        if(risk.detail &&
            risk.location &&
            risk.location !== '0'){
            Swal.fire({
                title: 'ยืนยันการแก้ไข',
                text: 'ยืนยันการแก้ไขข้อมูลความเสี่ยง',
                icon: 'warning',
                showCancelButton: true,
            }).then(async confirm =>  {
                if(confirm.isConfirmed){
                    response = await updateRisk({
                        detail: risk.detail,
                        location: risk.location,
                    }, id, token)
                    if(response.status == 200){
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
                            text: response.message,
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
        let initialized_date;
        let finalized_date;
        e.preventDefault();
        if(risk.feedback &&
            risk.status){
            Swal.fire({
                title: 'ยืนยันการประเมิน',
                html: `ยืนยันการประเมินความเสี่ยง<br>
                        การดำเนินการ : ${risk.feedback}<br>
                        สถานะเดิม : ${risk.old_status}<br>
                        สถานะใหม่ : ${risk.status}<br>`,
                icon: 'warning',
                showCancelButton: true,
            }).then(async confirm =>  {
                if(confirm.isConfirmed){
                    if((risk.old_status === 'รอดำเนินการ') && 
                        (risk.status === 'อยู่ระหว่างการดำเนินการ')){
                        initialized_date = new Date();
                        finalized_date = risk.finalized_date;
                    }else if((risk.old_status === 'อยู่ระหว่างการดำเนินการ') && 
                        (risk.status === 'ดำเนินการแล้วเสร็จ')){
                        initialized_date = risk.initialized_date;
                        finalized_date = new Date();
                    }else if((risk.old_status === 'รอดำเนินการ') && (risk.status === 'ดำเนินการแล้วเสร็จ')){
                        initialized_date = new Date();
                        finalized_date = new Date();
                    }else{
                        initialized_date = risk.initialized_date;
                        finalized_date = risk.finalized_date;
                    }
                    response = await updateRisk({
                        feedback: risk.feedback,
                        status: risk.status,
                        initialized_date: initialized_date,
                        finalized_date: finalized_date,        
                    }, id, token)
                    if(response.status === 200){
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
                            text: response.message,
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
                response = await deleteRisk(token, id)
                if(response.status == 200){
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
                <h5>รายงานความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label className="pt-3">รายละเอียดความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="detail" 
                        type="text" 
                        as="textarea"
                        onChange={handleChange}
                        disabled={reporterEdit() || (risk.old_status === 'ดำเนินการแล้วเสร็จ')}
                        value={'' || risk.detail} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>สถานที่แจ้งความเสี่ยง</Form.Label>
                    <Form.Select 
                        name="location" 
                        value={0 || risk.location}
                        onChange={handleChange}
                        disabled={reporterEdit() || (risk.old_status === 'ดำเนินการแล้วเสร็จ')}>
                        <option value='0'>-- สถานที่ --</option>
                        <option>ประสานมิตร</option>
                        <option>องครักษ์</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">ผู้รายงานความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="reporter" 
                        type="text" 
                        disabled 
                        value={'' || risk.reporter} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">วันที่รายงานความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="report_date" 
                        type="text" 
                        disabled 
                        value={'' || dateToDateTime(risk.report_date)} />
                </Form.Group>
                <div className="d-grid mt-3">
                    <Button 
                        type="submit" 
                        disabled={reporterEdit() || (risk.old_status === 'ดำเนินการแล้วเสร็จ')}>
                        แก้ไขข้อมูล
                    </Button>
                </div>
            </Form>
            <Form onSubmit={handleEvaluation}>
                <h5 className="pt-3">การพิจารณาความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label className="pt-3">การดำเนินการ</Form.Label>
                    <Form.Control 
                        name="feedback" 
                        type="text" 
                        as="textarea"
                        disabled={evaluation() || (risk.old_status === 'ดำเนินการแล้วเสร็จ')}
                        onChange={handleChange}
                        value={'' || risk.feedback} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">สถานะการดำเนินการ</Form.Label>
                    <Form.Select 
                        name="status" 
                        type="text" 
                        disabled={evaluation() || (risk.old_status === 'ดำเนินการแล้วเสร็จ')}
                        onChange={handleChange}
                        value={'รอดำเนินการ' || risk.status}>
                            {(risk.status === 'รอดำเนินการ' || !risk.status) ? <option>รอดำเนินการ</option> : '' }
                            <option>อยู่ระหว่างการดำเนินการ</option>
                            <option>ดำเนินการแล้วเสร็จ</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">วันที่เริ่มดำเนินการ</Form.Label>
                    <Form.Control 
                        name="initialized_date" 
                        type="text" 
                        disabled 
                        value={'' || dateToDateTime(risk.initialized_date)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">วันที่ดำเนินการแล้วเสร็จ</Form.Label>
                    <Form.Control 
                        name="finalized_date" 
                        type="text" 
                        disabled 
                        value={'' || dateToDateTime(risk.finalized_date)} />
                </Form.Group>
                <div className="d-grid mt-3">
                    <Button 
                        type="submit" 
                        disabled={evaluation() || (risk.old_status === 'ดำเนินการแล้วเสร็จ')}>
                        ประเมินความเสี่ยง
                    </Button>
                </div>
            </Form>
            
            <div className="d-grid mt-3">
                    <Button 
                        className="btn-danger" 
                        disabled={disabledDeleteBtn() || (risk.old_status === 'ดำเนินการแล้วเสร็จ')}
                        onClick={handleDelete}>
                        ลบข้อมูลความเสี่ยง
                    </Button>
                </div>
        </Container>
    );
};

export default RiskEditor;