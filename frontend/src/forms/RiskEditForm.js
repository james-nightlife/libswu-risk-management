import { Button, Form, Image } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";

const RiskEditForm = ({handleEdit, handleChange, inputs, isAdminOrReporter, imageUrl }) => {
    return(
        <Form onSubmit={handleEdit}>
                <Form.Group>
                    <Form.Label className="pt-3">รายละเอียดความเสี่ยง</Form.Label>
                    <Form.Control 
                        name="detail" 
                        type="text" 
                        as="textarea"
                        onChange={handleChange}
                        disabled={isAdminOrReporter || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}
                        value={inputs.detail || ''} />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>อาคาร</Form.Label>
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
                    <Form.Label>ชั้น</Form.Label>
                    <Form.Select 
                        name="floors" 
                        value={inputs.floors || ''}
                        onChange={handleChange}
                        disabled={isAdminOrReporter || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')} >
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
                        onChange={handleChange}
                        disabled={isAdminOrReporter || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')} />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>ระดับความเสี่ยง</Form.Label>
                    <Form.Select 
                        name="level" 
                        value={inputs.level || ''}
                        onChange={handleChange}
                        disabled={isAdminOrReporter || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}
                        >
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
                            inputs.newimage ? 
                            (
                                <Image 
                                    className="mt-3" 
                                    src={imageUrl}
                                    fluid />
                            ) :
                            inputs.image ?
                            (
                                <Image 
                                    className="mt-3" 
                                    src={`${process.env.REACT_APP_UPLOAD_SERVER}/uploads/${inputs.image}`}
                                    fluid />
                            ) :
                            (
                                <>
                                </>
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
    );
}

export default RiskEditForm;