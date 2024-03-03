import { Button, Container, Form, Image } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";
import { RiskEditInputControl } from "../functions/RiskEditInputControl";
import { useEffect, useState } from "react";

const RiskEditForm = ({handleEdit, handleChange, inputs}) => {
    // INPUTS
    const [riskChecked, setRiskChecked] = useState(false);
    const [maChecked, setMaChecked] = useState(false);

    // CONTROLLED INPUT
    const [isAdminOrReporter, setIsAdminOrReporter] = useState(true);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => { 
        if(inputs){
            setIsAdminOrReporter(RiskEditInputControl(inputs));
        }
        if(inputs.type){
            setRiskChecked(inputs.type.includes('รายงานความเสี่ยง'));
            setMaChecked(inputs.type.includes('รายงานแจ้งซ่อม'));
        }
    }, [inputs])

    useEffect(() => {
        if(inputs.newimage){
            const url = URL.createObjectURL(inputs.newimage)
            setImageUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [inputs.newimage])

    return(
        <Container className="p-3 border rounded">
            <h1 className="text-center">รายงานความเสี่ยง</h1>

            <div className="text-end">
                <div id="form-asterisk" className="p">*</div> = จำเป็นต้องกรอกข้อมูล
            </div>

            <Form onSubmit={handleEdit}>

                {/* TYPE CHECKBOXES */}
                <Form.Group className="mt-3">
                    <Form.Label>
                        ประเภทการรายงาน<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Check
                        type="checkbox"
                        checked={riskChecked}
                        disabled
                        label="รายงานความเสี่ยง" />
                    <Form.Check
                        type="checkbox"
                        disabled
                        checked={maChecked}
                        label="รายงานแจ้งซ่อม" />
                </Form.Group>

                <Form.Group className="pt-3">
                    <Form.Label>
                        รายละเอียดความเสี่ยง<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Control 
                        name="detail" 
                        type="text" 
                        as="textarea"
                        onChange={handleChange}
                        disabled={isAdminOrReporter || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}
                        value={inputs.detail || ''} />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>
                        อาคาร<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Select 
                        name="location" 
                        value={inputs.location || '0'}
                        onChange={handleChange}
                        disabled={isAdminOrReporter || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}>
                        <option value='0'>-- สถานที่ --</option>
                        <option>ประสานมิตร</option>
                        <option>องครักษ์</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>
                        ชั้น<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Select 
                        name="floors" 
                        value={inputs.floors || ''}
                        onChange={handleChange}
                        disabled={isAdminOrReporter || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')} >
                        <option value='0'>-- ชั้น --</option>
                        {(inputs.location && inputs.location !== '0') && (
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
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>
                        ห้อง / จุดที่พบความเสี่ยง<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Control 
                        name="places" 
                        type='text'
                        value={inputs.places || ''}
                        onChange={handleChange}
                        disabled={isAdminOrReporter || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')} />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>
                        ระดับความเสี่ยง<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Select 
                        name="level" 
                        value={inputs.level || ''}
                        onChange={handleChange}
                        disabled={
                            isAdminOrReporter || 
                            (
                                inputs.risk_status && inputs.risk_status.length > 0 &&
                                inputs.risk_status[inputs.risk_status.length - 1].status === 'ดำเนินการแล้วเสร็จ'
                            ) ||
                            (
                                inputs.type &&
                                !inputs.type.includes('รายงานความเสี่ยง')
                            )
                        } >
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
                    <Form.Control
                        name="newimage"
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                        disabled={isAdminOrReporter || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')} />
                        {
                            inputs.newimage ?(
                                <Container className="text-center mt-3 p-3">
                                    <Image 
                                        id="preview"
                                        className="mt-3" 
                                        src={imageUrl}
                                        fluid />
                                </Container>
                            ) :
                            inputs.image && (
                                <Container className="text-center mt-3 p-3">
                                    <a 
                                        href={`${process.env.REACT_APP_UPLOAD_SERVER}/uploads/${inputs.image}`}
                                        target="_blank"
                                        rel="noreferrer">
                                    <Image 
                                        id="preview"
                                        className="mt-3" 
                                        src={`${process.env.REACT_APP_UPLOAD_SERVER}/uploads/${inputs.image}`}
                                        fluid
                                        />
                                    </a>
                                </Container>  
                            ) 
                        }
                </Form.Group>

                <Form.Group>
                    <Form.Label className="pt-3">ผู้รายงานความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="reporter" 
                        type="text" 
                        disabled 
                        value={inputs.reporter || ''} />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="pt-3">วันที่รายงานความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="report_date" 
                        type="text" 
                        disabled 
                        value={DateToDatetime(inputs.createdAt) || ''} />
                </Form.Group>

                <div className="d-grid mt-3">
                    <Button 
                        type="submit" 
                        disabled={isAdminOrReporter || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}>
                        แก้ไขรายงาน
                    </Button>
                </div>
            </Form>
        </Container>
        
    );
}

export default RiskEditForm;