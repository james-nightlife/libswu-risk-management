import { Button, Container } from "react-bootstrap";

const RiskReportButton = () => {
    return(
        <Container className='p-3 border rounded'>
            <div className="d-grid">
                <Button 
                    id="home-reportbutton"
                    href="/report">                   
                    คลิกที่นี่เพื่อรายงานความเสี่ยง
                </Button>
            </div> 
        </Container>
    );
};

export default RiskReportButton;