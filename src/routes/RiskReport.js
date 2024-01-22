import { useState } from "react";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import RiskReportForm from "../forms/RiskReportForm";
import { RiskReportRequest } from "../requests/RiskReportRequest";
import { SignOut } from "../functions/SignOut";

const RiskReport = () => {
    document.title = "รายงานความเสี่ยง";
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
    
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(
            inputs.detail &&
            inputs.location &&
            inputs.location !== '0'
        ){
            Swal.fire({
                title: 'ยืนยันการรายงาน',
                text: 'ยืนยันการรายงานความเสี่ยง',
                icon: 'warning',
                showCancelButton: true,
                allowOutsideClick: false,
            }).then(async (confirm) => {
                if(confirm.isConfirmed){
                    const response = await RiskReportRequest({
                        reporter: username,
                        detail: inputs.detail, 
                        location: inputs.location
                    }, token);
                    if(response.status === 200){
                        Swal.fire({
                            title: 'สำเร็จ',
                            text: response.message,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000,
                            allowOutsideClick: false,
                        }).then(() => {
                            window.location.href = '/';
                        });
                    }else if(response.message === 'Token Invalid'){
                        Swal.fire({
                            title: 'เซสชันหมดอายุ',
                            text: 'กรุณาลงชื่อเข้าใช้อีกครั้ง',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 2000,
                            allowOutsideClick: false
                        }).then(() => {
                            SignOut();     
                        });
                    }
                    else{
                        Swal.fire({
                            title: 'ล้มเหลว',
                            text: response.message,
                            icon: 'error',
                            allowOutsideClick: false,
                        });
                    }
                }
            })     
        }else{
            Swal.fire({
                title: 'ล้มเหลว',
                text: 'โปรดระบุรายละเอียดความเสี่ยง',
                icon: 'error',
                allowOutsideClick: false,
            });
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