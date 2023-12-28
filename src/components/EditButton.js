import { Button } from "react-bootstrap"

const EditButton = ({currentUser, riskData}) => {
    const handleButton = (id) => {
        localStorage.setItem('risk_id', id);
        window.location.href = '/risk-editor';
    }

    if(currentUser.username === riskData.reporter){
        return(
                <Button onClick={() => handleButton(riskData.id)}>แก้ไขข้อมูล</Button>
        )
    }else{
        return(
            <>
            </>
        );
    }
}

export default EditButton;