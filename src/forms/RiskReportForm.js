import { Button, Form, Image } from "react-bootstrap";

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
                    <Form.Label>อาคาร</Form.Label>
                    <Form.Select 
                        name="building" 
                        value={'' || inputs.building}
                        onChange={handleChange}>
                        <option value='0'>-- อาคาร --</option>
                        <option>ประสานมิตร</option>
                        <option>องครักษ์</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>ชั้น</Form.Label>
                    <Form.Select 
                        name="floor" 
                        value={'' || inputs.floor}
                        onChange={handleChange}>
                        <option value='0'>-- ชั้น --</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        (inputs.building === 'ประสานมิตร' ?
                             <option>7</option>
                             <option>8</option>
                        )
                    </Form.Select>
                </Form.Group>




                <Form.Group className="mt-3">
                    <Form.Label>ไฟล์ภาพประกอบ</Form.Label>
                    <Form.Control
                        name="image"
                        type="file"
                        onChange={handleChange} />
                        <Image 
                            className="mt-3" 
                            src={'' || inputs.image}
                            fluid />
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