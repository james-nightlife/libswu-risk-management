import { useState } from "react";
import { Container } from "react-bootstrap";
import RiskReportForm from "../forms/RiskReportForm";
import { RiskReportRequest } from "../requests/RiskReportRequest";
import { ConfirmAlert } from "../alert/ConfirmAlert";
import { SessionExpired } from "../functions/SessionExpired";
import { SuccessAlert } from "../alert/SuccessAlert";
import { FailAlert } from "../alert/FailAlert";
import { UploadImageRequest } from "../requests/UploadImageRequest";


const RiskReport = () => {
    // TITLE
    document.title = "รายงานความเสี่ยง";

    // FORM
    const [inputs, setInputs] = useState({});

    const handleChange = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));

        if(e.target.type === 'file'  && e.target.files.length !== 0){
            setInputs(values => ({...values, imagefile: e.target.files[0]}))
        }
    }

    // SUBMIT BUTTON
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(
            (inputs.type &&
            inputs.subtype && inputs.subtype !== 0 &&
            inputs.detail &&
            inputs.location && inputs.location !== '0' &&
            inputs.floors && inputs.floors !== '0' &&
            inputs.places) || 
            (inputs.type.include('รายงานความเสี่ยง') && 
            inputs.level && 
            inputs.level !== '0')
        ){
            ConfirmAlert({
                title: 'ยืนยันการรายงาน',
                html: `ยืนยันการรายงานความเสี่ยง <br>
                    ประเภทการรายงาน : ${inputs.type} <br>
                    ประเภทความเสี่ยง : ${inputs.subtype} <br>
                    รายละเอียด : ${inputs.detail} <br>
                    สถานที่แจ้ง : ${inputs.location} ชั้น ${inputs.floors} ${inputs.places}<br>
                    ระดับความเสี่ยง : ${inputs.level || 'ไม่เป็นความเสี่ยง'}`,
            }, async () => {
                let filename;
                if(inputs.imagefile){
                    const formData = new FormData();
                    formData.append('file', inputs.imagefile);
                    filename = await UploadImageRequest({
                        image: inputs.imagefile
                    })
                }
                const response = await RiskReportRequest({
                    reporter: username,
                    type: inputs.type,
                    detail: inputs.detail, 
                    location: inputs.location,
                    floors: inputs.floors,
                    places: inputs.places,
                    level: inputs.level,
                    image: filename,
                    risk_status: (inputs.type.includes('รายงานความเสี่ยง') ?
                        [
                            {
                                date: new Date(),
                                status: 'รอดำเนินการ',
                                comment: 'รายงานความเสี่ยงเข้าระบบฯ แล้ว',
                                user: username,
                            },
                        ] : undefined),
                    ma_status: (inputs.type.includes('รายงานแจ้งซ่อม') ?
                    [
                        {
                            date: new Date(),
                            status: 'รอดำเนินการ',
                            comment: 'รายงานแจ้งซ่อมเข้าระบบฯ แล้ว',
                            user: username,
                        },
                    ] : undefined),
                }, token);
                if(response.status === 200){
                    SuccessAlert(response.message)
                }else if(response.message === 'Token Invalid'){
                    SessionExpired();
                }
                else{
                    FailAlert(response.message)
                }
            })   
        }else{
            FailAlert('โปรดระบุรายละเอียดความเสี่ยง');
        }
    }

    return(
        <Container className="p-3">
            <RiskReportForm 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                inputs={inputs} 
                setInputs={setInputs} />
        </Container>
    )
}
export default RiskReport;