import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import RiskEditForm from "../forms/RiskEditForm";
import RiskProcessForm from "../forms/RiskProcessForm";
import { RiskUpdateRequest } from "../requests/RiskUpdateRequest";
import { RiskDeleteRequest } from "../requests/RiskDeleteRequest";
import { SessionExpired } from "../functions/SessionExpired";
import { ConfirmAlert } from "../alert/ConfirmAlert";
import { SuccessAlert } from "../alert/SuccessAlert";
import { FailAlert } from "../alert/FailAlert";

const RiskEditor = () => {
    document.title = "จัดการรายงานความเสี่ยง";

    // ดักการลักไก่เข้าหน้าข้อมูลความเสี่ยงผ่าน Url
    const id = localStorage.getItem('risk_id');

    // ดึงข้อมูลความเสี่ยง (datatype id ความเสี่ยงต้องเป็น number)
    useEffect(() => {
        if(id){
            fetchRiskData();
        }else{
            window.location.href = "/";
        }
        
    }, [id]);

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

    // ผู้รายงานความเสี่ยงสามารถแก้ไขข้อมูลความเสี่ยง
    const role = sessionStorage.getItem('role');
    const username = sessionStorage.getItem('username');
    const isAdminOrReporter = () => {
        if(
            username === risk.reporter ||
            role === 'admin' ||
            role === 'committee'
        ){
            return(false)
        }else{
            return(true)
        }
    }

    // admin เป็นผู้ประเมินความเสี่ยง
    const evaluation = () => {
        if(
            role === 'admin' ||
            role === 'committee'
        ){
            return(false)
        }else{
            return(true)
        }
    }

    const [risk, setRisk] = useState([]);

    const token = sessionStorage.getItem('token');
    
    // อัปเดต input
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRisk(values => ({...values, [name]: value}));
    }

    // ตรวจสอบการแก้ไขข้อมูลความเสี่ยง
    const handleEdit = async (e) => {
        e.preventDefault();
        if(
            risk.detail &&
            risk.location &&
            risk.location !== '0'
        ){
            ConfirmAlert({
                title: 'ยืนยันการแก้ไข',
                text: 'ยืนยันการแก้ไขข้อมูลความเสี่ยง',
            }, async () => {
                const response = await RiskUpdateRequest({
                    detail: risk.detail,
                    location: risk.location,
                }, id, token)
                if(response.status === 200){
                    SuccessAlert(response.message);
                }else if(response.message === 'Token Invalid'){
                    SessionExpired();
                }else{
                    FailAlert(response.message);
                }
            });
        }else{
            FailAlert('โปรดระบุข้อมูลการประเมินความเสี่ยง');
        }    
    }

    // ตรวจสอบข้อมูลการประเมินความเสี่ยง
    const handleEvaluation = async (e) => {
        e.preventDefault();
        if(
            risk.feedback &&
            risk.status
        ){
            ConfirmAlert({
                title: 'ยืนยันการประเมิน',
                html: `ยืนยันการประเมินความเสี่ยง<br>
                        การดำเนินการ : ${risk.feedback}<br>
                        สถานะเดิม : ${risk.old_status}<br>
                        สถานะใหม่ : ${risk.status}<br>`,
            }, async () => {
                let initialized_date;
                let finalized_date;
                if(
                    (risk.old_status === 'รอดำเนินการ') && 
                    (risk.status === 'อยู่ระหว่างการดำเนินการ')
                ){
                    initialized_date = new Date();
                    finalized_date = risk.finalized_date;
                }else if(
                    (risk.old_status === 'อยู่ระหว่างการดำเนินการ') && 
                    (risk.status === 'ดำเนินการแล้วเสร็จ')
                ){
                    initialized_date = risk.initialized_date;
                    finalized_date = new Date();
                }else if((risk.old_status === 'รอดำเนินการ') && (risk.status === 'ดำเนินการแล้วเสร็จ')){
                    initialized_date = new Date();
                    finalized_date = new Date();
                }else{
                    initialized_date = risk.initialized_date;
                    finalized_date = risk.finalized_date;
                }
                const response = await RiskUpdateRequest({
                    feedback: risk.feedback,
                    status: risk.status,
                    initialized_date: initialized_date,
                    finalized_date: finalized_date,        
                }, id, token)
                if(response.status === 200){
                    SuccessAlert(response.message)
                }else if(response.message === 'Token Invalid'){
                    SessionExpired();
                }else{
                    FailAlert(response.message);
                }
            })
        }else{
            FailAlert('โปรดระบุข้อมูลการประเมินความเสี่ยง');
        }        
    }

    const handleDelete = async (e) => {
        let response;
        e.preventDefault();
        ConfirmAlert({
            title: 'ยืนยันการลบข้อมูล',
            text: 'ยืนยันการลบข้อมูลความเสี่ยง',
            icon: 'warning',
            showCancelButton: true,
            allowOutsideClick: false,
        }, async () => {
            response = await RiskDeleteRequest(token, id)
                if(response.status === 200){
                    SuccessAlert(response.message);
                }else if(response.message === 'Token Invalid'){
                    SessionExpired();
                }else{
                    FailAlert(response.message);
                }
        })
    }

    return(
        <Container className="p-3">
            <h5>รายงานความเสี่ยง</h5>
            <RiskEditForm handleEdit={handleEdit} handleChange={handleChange} isAdminOrReporter={isAdminOrReporter()} inputs={risk} />
            <RiskProcessForm handleProcess={handleEvaluation} handleChange={handleChange} isAdmin={evaluation()} inputs={risk} />
            <div className="d-grid mt-3">
                    <Button 
                        className="btn-danger" 
                        disabled={isAdminOrReporter() || (risk.old_status === 'ดำเนินการแล้วเสร็จ')}
                        onClick={handleDelete}>
                        ลบข้อมูลความเสี่ยง
                    </Button>
                </div>
        </Container>
    );
};

export default RiskEditor;