import { Button, Form, Image } from "react-bootstrap";

const RiskReportForm = ({handleSubmit, inputs, handleChange, imageUrl}) => {
    return(
        <>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mt-3">
                    <Form.Label>รายละเอียดความเสี่ยง</Form.Label>
                    <Form.Control 
                    name="detail" 
                    type="text" 
                    as="textarea"
                    value={inputs.detail || ''}
                    onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>อาคาร</Form.Label>
                    <Form.Select 
                        name="location" 
                        value={inputs.location || '' }
                        onChange={handleChange}>
                        <option value='0'>-- อาคาร --</option>
                        <option>ประสานมิตร</option>
                        <option>องครักษ์</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>ชั้น</Form.Label>
                    <Form.Select 
                        name="floors" 
                        value={inputs.floors || ''}
                        onChange={handleChange}>
                        <option value='0'>-- ชั้น --</option>
                        {(inputs.location && inputs.location !== '0') ? (
                            <>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                            </>
                        ) : (
                            <>
                            </>
                        )
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>ห้อง / จุดที่พบความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="places" 
                        type='text'
                        value={inputs.places || ''}
                        onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>ระดับความเสี่ยง</Form.Label>
                    <Form.Select 
                        name="level" 
                        value={inputs.level || ''}
                        onChange={handleChange}>
                        <option value='0'>-- ระดับ --</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>ไฟล์ภาพประกอบ (ถ้ามี)</Form.Label>
                    <p>*อยู่ระหว่างการทดสอบ</p>
                    <Form.Control
                        name="image"
                        type="file"
                        onChange={handleChange}
                        accept="image/*" />
                        {inputs.image && 
                        <Image 
                            className="mt-3" 
                            src={imageUrl}
                            fluid />
                        }
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