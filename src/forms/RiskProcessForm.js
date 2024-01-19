import { Button, Form } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";

const RiskProcessForm = ({handleProcess, isAdmin, inputs, handleChange}) => {
    return(
        <Form onSubmit={handleProcess}>
                <h5 className="pt-3">การพิจารณาความเสี่ยง</h5>
                <Form.Group>
                    <Form.Label className="pt-3">การดำเนินการ</Form.Label>
                    <Form.Control 
                        name="feedback" 
                        type="text" 
                        as="textarea"
                        disabled={isAdmin || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}
                        onChange={handleChange}
                        value={'' || inputs.feedback} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">สถานะการดำเนินการ</Form.Label>
                    <Form.Select 
                        name="status" 
                        disabled={isAdmin || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}
                        onChange={handleChange}
                        value={'' || inputs.status}>
                            {(inputs.status === 'รอดำเนินการ' || !inputs.status) ? <option>รอดำเนินการ</option> : '' }
                            <option>อยู่ระหว่างการดำเนินการ</option>
                            <option>ดำเนินการแล้วเสร็จ</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">วันที่เริ่มดำเนินการ</Form.Label>
                    <Form.Control 
                        name="initialized_date" 
                        type="text" 
                        disabled 
                        value={'' || DateToDatetime(inputs.initialized_date)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">วันที่ดำเนินการแล้วเสร็จ</Form.Label>
                    <Form.Control 
                        name="finalized_date" 
                        type="text" 
                        disabled 
                        value={'' || DateToDatetime(inputs.finalized_date)} />
                </Form.Group>
                <div className="d-grid mt-3">
                    <Button 
                        type="submit" 
                        disabled={isAdmin || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}>
                        ประเมินความเสี่ยง
                    </Button>
                </div>
            </Form>
    )
}

export default RiskProcessForm;