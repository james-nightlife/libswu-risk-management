import { Button } from "react-bootstrap"

const EvalButton = ({user, id}) => {
    const handleButton = (id) => {
        localStorage.setItem('risk_id', id);
        window.location.href = '/risk-evaluation';
    }

    if(user.role === 'admin'){
        return(
            <td>
                <Button onClick={() => handleButton(id)}>ประเมินความเสี่ยง</Button>
            </td>
        )
    }else{
        return(
            <>
            </>
        );
    }
}

export default EvalButton;