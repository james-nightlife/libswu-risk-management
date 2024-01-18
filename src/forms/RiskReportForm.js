import { Button, Form } from "react-bootstrap";

const RiskReportForm = ({handleSubmit, inputs, handleChange}) => {
    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-3">
                    <Form.Label>รายละเอียดความเสี่ยง</Form.Label>
                    <Form.Control 
                    name="detail" 
                    type="text" 
                    as="textarea"
                    value={'' || inputs.detail}
                    onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>สถานที่แจ้งความเสี่ยง</Form.Label>
                    <Form.Select 
                        name="location" 
                        value={'' || inputs.location}
                        onChange={handleChange}>
                        <option value='0'>-- สถานที่ --</option>
                        <option>ประสานมิตร</option>
                        <option>องครักษ์</option>
                    </Form.Select>
                </Form.Group>
                <div className="d-grid mt-3">
                    <Button type="submit">
                        บันทึก
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default RiskReportForm;