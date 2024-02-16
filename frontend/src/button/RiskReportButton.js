import { Button, Container } from "react-bootstrap";

const RiskReportButton = () => {
    return(
        <Container className='p-3 border rounded'>
            <div className="d-grid">
                <Button href="/report">
                    <h2 className="m-0 p-1">
                        คลิกที่นี่เพื่อรายงานความเสี่ยง
                    </h2>
                </Button>
            </div> 
        </Container>
    );
};

export default RiskReportButton;