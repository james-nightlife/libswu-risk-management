import { useEffect, useState } from "react";
import { RiskEditInputControl } from "../functions/RiskEditInputControl";
import { Button, Container } from "react-bootstrap";

const RiskDeleteButton = ({inputs, handleDelete}) => {
    const [deleteRiskButton, setDeleteRiskButton] = useState(true);
    useEffect(() => {
        if(inputs){
            setDeleteRiskButton(RiskEditInputControl(inputs));
        }
    }, [inputs])

    return(
        <Container className="border rounded p-3">
                <div className="d-grid">
                    <Button 
                        className="btn-danger" 
                        disabled={deleteRiskButton || 
                            (inputs.old_risk_status === 'ดำเนินการแล้วเสร็จ') || 
                            (inputs.old_ma_status === 'ดำเนินการแล้วเสร็จ')
                        }
                        onClick={handleDelete}>
                        ลบรายงาน
                    </Button>
                </div>
        </Container>
    );
};

export default RiskDeleteButton;