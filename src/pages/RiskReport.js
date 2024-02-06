import { useState } from "react";
import { Container } from "react-bootstrap";
import RiskReportForm from "../forms/RiskReportForm";
import { RiskReportRequest } from "../requests/RiskReportRequest";
import { ConfirmAlert } from "../alert/ConfirmAlert";
import { SessionExpired } from "../functions/SessionExpired";
import { SuccessAlert } from "../alert/SuccessAlert";
import { FailAlert } from "../alert/FailAlert";

const RiskReport = () => {
    // TITLE
    document.title = "รายงานความเสี่ยง";

    // FORM
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = (e.target.type === 'file' && e.target.files.length !== 0 ? URL.createObjectURL(e.target.files[0]) : e.target.value);
        setInputs(values => ({...values, [name]: value}));
    }

    // SUBMIT BUTTON
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(
            inputs.detail &&
            inputs.building &&
            inputs.building !== '0' &&
            inputs.floor &&
            inputs.floor !== '0' &&
            inputs.room
        ){
            ConfirmAlert({
                title: 'ยืนยันการรายงาน',
                text: 'ยืนยันการรายงานความเสี่ยง',
            }, async () => {
                const response = await RiskReportRequest({
                    reporter: username,
                    detail: inputs.detail, 
                    building: inputs.building,
                    floor: inputs.floor,
                    room: inputs.room,
                    image: inputs.image,

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
            <h1>รายงานความเสี่ยง</h1>
            <RiskReportForm handleChange={handleChange} handleSubmit={handleSubmit} inputs={inputs} />
        </Container>
    )
}
export default RiskReport;