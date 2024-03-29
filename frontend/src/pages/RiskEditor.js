import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import RiskEditForm from "../forms/RiskEditForm";
import RiskProcessForm from "../forms/RiskProcessForm";
import { RiskUpdateRequest } from "../requests/RiskUpdateRequest";
import { RiskDeleteRequest } from "../requests/RiskDeleteRequest";
import { SessionExpired } from "../functions/SessionExpired";
import { ConfirmAlert } from "../alert/ConfirmAlert";
import { SuccessAlert } from "../alert/SuccessAlert";
import { FailAlert } from "../alert/FailAlert";
import { UploadImageRequest } from "../requests/UploadImageRequest";
import RiskDeleteButton from "../button/RiskDeleteButton";
import MaProcessForm from "../forms/MaProcessForm";

const RiskEditor = () => {
    /** TITLE */
    document.title = "จัดการรายงานความเสี่ยง";

    /** FETCH RISK */
    const id = localStorage.getItem('risk_id');
    const [risk, setRisk] = useState({});
    
    const fetchRiskData = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/risk/record/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const data = await res.json()
            setRisk({
                ...data,
                old_risk_status: data.risk_status && data.risk_status.length > 0 ? data.risk_status[data.risk_status.length - 1].status : 'รอดำเนินการ',
                old_ma_status: data.ma_status && data.ma_status.length > 0 ? data.ma_status[data.ma_status.length - 1].status : 'รอดำเนินการ',
                new_risk_status: data.risk_status && data.risk_status.length > 0 ? data.risk_status[data.risk_status.length - 1].status : 'รอดำเนินการ',
                new_ma_status: data.ma_status && data.ma_status.length > 0 ? data.ma_status[data.ma_status.length - 1].status : 'รอดำเนินการ',
            });
        }).catch((error) => {
            console.error('Error fetching risk data:', error);
        });
    }

    useEffect(() => {
        //console.log('RiskEditor : id is changed')
        //console.log(`id = ${id}`)
        if(id){
            fetchRiskData();
        }else{
            window.location.href = "/";
        }
    }, [id]);

    // ON-CHANGE
    const handleChange = (e) => {
        const name = e.target.name;
        const value = (
            (e.target.type === 'file' && e.target.files.length !== 0) ? 
            e.target.files[0] : 
            e.target.value
        );
        setRisk(values => ({...values, [name]: value}));
    }

    // TOKEN
    const token = sessionStorage.getItem('token');

    // EDIT RISK
    const handleEdit = async (e) => {
        e.preventDefault();
        if(
            (risk.detail &&
            risk.location && risk.location !== '0' &&
            risk.floors && risk.floors !== '0' &&
            risk.places) || 
            (risk.type.includes('รายงานความเสี่ยง') && risk.level && risk.level !== '0')
        ){
            ConfirmAlert({
                title: 'ยืนยันการแก้ไข',
                html: `ยืนยันการแก้ไขรายงานความเสี่ยง <br>
                    รายละเอียด : ${risk.detail} <br>
                    สถานที่แจ้ง : ${risk.location} ชั้น ${risk.floors} ${risk.places}<br>
                    ระดับความเสี่ยง : ${risk.level || 'ไม่เป็นความเสี่ยง'}`,
            }, async () => {
                let filename;
                if(risk.newimage){
                    const formData = new FormData();
                    formData.append('file', risk.newimage);
                    filename = await UploadImageRequest({
                        image: risk.newimage
                    })
                }
                const response = await RiskUpdateRequest({
                    detail: risk.detail,
                    location: risk.location,
                    floors: risk.floors,
                    places: risk.places,
                    level: risk.level,
                    image: (filename || risk.image)
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
            FailAlert('โปรดระบุรายละเอียดความเสี่ยง');
        }    
    }

    /** HANDLE RISK PROCESS */
    const handleEvaluation = async (e) => {
        e.preventDefault();
        if(
            risk.risk_comment &&
            risk.new_risk_status
        ){
            
            ConfirmAlert({
                title: 'ยืนยันการพิจารณา',
                html: `ยืนยันการพิจารณาการดำเนินการเกี่ยวกับความเสี่ยง<br>
                        การดำเนินการ : ${risk.risk_comment}<br>
                        สถานะเดิม : ${risk.old_risk_status}<br>
                        สถานะใหม่ : ${risk.new_risk_status}<br>`,
            }, async () => {
                let initialized_date;
                let finalized_date;
                if(risk.new_risk_status === 'อยู่ระหว่างการดำเนินการ'){
                    initialized_date = (risk.old_risk_status === 'รอดำเนินการ' ? new Date() : risk.risk_initialized_date)
                    finalized_date = risk.risk_finalized_date
                }else if(risk.new_risk_status === 'ดำเนินการแล้วเสร็จ'){
                    initialized_date = (risk.old_risk_status === 'รอดำเนินการ' ? new Date() : risk.risk_initialized_date)
                    finalized_date = new Date();
                }
                const response = await RiskUpdateRequest({
                    risk_status: [
                        ...risk.risk_status,
                        {
                            date: new Date(),
                            status: risk.new_risk_status,
                            comment: risk.risk_comment,
                            user: sessionStorage.getItem('username')
                        },
                    ],
                    risk_initialized_date: initialized_date,
                    risk_finalized_date: finalized_date,        
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
            FailAlert('โปรดระบุการดำเนินการเกี่ยวกับความเสี่ยง');
        }        
    }

    /** HANDLE RISK PROCESS */
    const handleMaintenance = async (e) => {
        e.preventDefault();
        if(
            risk.ma_comment &&
            risk.new_ma_status
        ){
            
            ConfirmAlert({
                title: 'ยืนยันการดำเนินการ',
                html: `ยืนยันการดำเนินการซ่อมบำรุง<br>
                        การดำเนินการ : ${risk.ma_comment}<br>
                        สถานะเดิม : ${risk.old_ma_status}<br>
                        สถานะใหม่ : ${risk.new_ma_status}<br>`,
            }, async () => {
                let initialized_date;
                let finalized_date;
                if(risk.new_ma_status === 'อยู่ระหว่างการดำเนินการ'){
                    initialized_date = (risk.old_ma_status === 'รอดำเนินการ' ? new Date() : risk.ma_initialized_date)
                    finalized_date = risk.ma_finalized_date
                }else if(risk.new_ma_status === 'ดำเนินการแล้วเสร็จ'){
                    initialized_date = (risk.old_ma_status === 'รอดำเนินการ' ? new Date() : risk.ma_initialized_date)
                    finalized_date = new Date();
                }
                const response = await RiskUpdateRequest({
                    ma_status: [
                        ...risk.ma_status,
                        {
                            date: new Date(),
                            status: risk.new_ma_status,
                            comment: risk.ma_comment,
                            user: sessionStorage.getItem('username')
                        },
                    ],
                    ma_initialized_date: initialized_date,
                    ma_finalized_date: finalized_date,        
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
            FailAlert('โปรดระบุการดำเนินการเกี่ยวกับความเสี่ยง');
        }        
    }

    // DELETE
    const handleDelete = async (e) => {
        let response;
        e.preventDefault();
        ConfirmAlert({
            title: 'ยืนยันการลบ',
            text: 'ยืนยันการลบรายงานความเสี่ยง',
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
            <RiskEditForm 
                handleEdit={handleEdit} 
                handleChange={handleChange} 
                inputs={risk} />
            <hr />
            <RiskProcessForm 
                handleProcess={handleEvaluation} 
                handleChange={handleChange} 
                inputs={risk}
                setInputs={setRisk} />
            <hr />
            <MaProcessForm
                handleProcess={handleMaintenance} 
                handleChange={handleChange} 
                inputs={risk}
                setInputs={setRisk}
                />
            <hr />
            <RiskDeleteButton 
                inputs={risk}
                handleDelete={handleDelete} />
        </Container>
    );
};

export default RiskEditor;