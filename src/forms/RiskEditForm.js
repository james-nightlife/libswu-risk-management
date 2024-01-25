import { Button, Form } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";

const RiskEditForm = ({handleEdit, handleChange, inputs, isAdminOrReporter }) => {
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
                    <Form.Label>สถานที่แจ้งความเสี่ยง</Form.Label>
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