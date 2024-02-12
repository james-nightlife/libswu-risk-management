import { Button, Card, Container, Form } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";

const RiskProcessForm = ({handleProcess, isAdmin, inputs, handleChange}) => {
    return(
        <Form onSubmit={handleProcess}>
                <h5 className="pt-3">การพิจารณาการดำเนินการเกี่ยวกับความเสี่ยง (เรียงจากล่าสุดไปเริ่มต้น)</h5>
                { 
                    inputs.feedback && inputs.feedback.map((data, idx) => {
                        return(
                            <Card 
                                className="mt-3"
                                bg={
                                    data.status === 'ดำเนินการแล้วเสร็จ' ?
                                    'success' : 
                                    data.status === 'อยู่ระหว่างการดำเนินการ' ?
                                    'warning' :
                                    'danger'
                                    } 
                                text='white' 
                                key={`process-${idx}`}>
                                <Card.Header>ระยะที่ {idx+1} : {data.status}</Card.Header>
                                <Card.Body className="p-3">
                                    <Card.Title>{data.comment}</Card.Title>
                                    <Card.Text>ดำเนินการโดย {data.user} เมื่อวันที่ {DateToDatetime(data.date)} </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }).reverse()
                }
                <Form.Group>
                    <Form.Label className="pt-3">การดำเนินการ</Form.Label>
                    <Form.Control 
                        name="comment" 
                        type="text" 
                        as="textarea"
                        disabled={isAdmin || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}
                        onChange={handleChange}
                        value={inputs.comment || '' } />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="pt-3">สถานะการดำเนินการ</Form.Label>
                    <Form.Select 
                        name="status" 
                        disabled={isAdmin || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}
                        onChange={handleChange}
                        value={inputs.status || '' }>
                            {(inputs.old_status === 'รอดำเนินการ' || !inputs.old_status) &&
                                (<option>รอดำเนินการ</option>) 
                            }
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
                        value={DateToDatetime(inputs.initialized_date) || ''} />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="pt-3">วันที่ดำเนินการแล้วเสร็จ</Form.Label>
                    <Form.Control 
                        name="finalized_date" 
                        type="text" 
                        disabled 
                        value={DateToDatetime(inputs.finalized_date) || '' } />
                </Form.Group>

                <div className="d-grid mt-3">
                    <Button 
                        type="submit" 
                        disabled={isAdmin || (inputs.old_status === 'ดำเนินการแล้วเสร็จ')}>
                        พิจารณาการดำเนินการ
                    </Button>
                </div>
            </Form>
    )
}

export default RiskProcessForm;