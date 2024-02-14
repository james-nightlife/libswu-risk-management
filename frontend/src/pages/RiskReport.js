import { useEffect, useState } from "react";
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
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if(inputs.image){
            const url = URL.createObjectURL(inputs.image)
            setImageUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [inputs.image])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = ((e.target.type === 'file' && e.target.files.length !== 0) ? 
                            e.target.files[0] : e.target.value);
        setInputs(values => ({...values, [name]: value}));
    }

    // SUBMIT BUTTON
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(
            inputs.detail &&
            inputs.location &&
            inputs.location !== '0' &&
            inputs.floors &&
            inputs.floors !== '0' &&
            inputs.places &&
            inputs.level &&
            inputs.level !== '0'
        ){
            ConfirmAlert({
                title: 'ยืนยันการรายงาน',
                text: 'ยืนยันการรายงานความเสี่ยง',
            }, async () => {
                let filename;
                if(inputs.image){
                    const formData = new FormData();
                    formData.append('file', inputs.image);
                    filename = await UploadImageRequest({
                        image: inputs.image
                    })
                }
                const response = await RiskReportRequest({
                    reporter: username,
                    detail: inputs.detail, 
                    location: inputs.location,
                    floors: inputs.floors,
                    places: inputs.places,
                    level: inputs.level,
                    image: filename,
                    feedback: [
                        {
                            date: new Date(),
                            status: 'รอดำเนินการ',
                            comment: 'รายงานความเสี่ยงเข้าระบบฯ แล้ว',
                            user: username,
                        },
                    ],
                    status: 'รอดำเนินการ',

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
                imageUrl={imageUrl} />
        </Container>
    )
}
export default RiskReport;