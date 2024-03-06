import { Button, Card, Container, Form } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";
import { RiskProcessInputControl } from "../functions/RiskProcessInputControl";
import { useEffect, useState } from "react";

const RiskProcessForm = ({handleProcess, inputs, handleChange, setInputs}) => {
    const [processInput, setProcessInput] = useState(true);
    const [statusInput, setStatusInput] = useState(true);
    const [submitProcessButton, setSubmitProcessButton] = useState(true);

    useEffect(() => {
        console.log('RiskProcessForm : inputs.risk_comment is changed')
        console.log(inputs)
        setProcessInput(RiskProcessInputControl())
        setStatusInput(RiskProcessInputControl() || !inputs.risk_comment)
        setSubmitProcessButton(RiskProcessInputControl() || !inputs.risk_comment)
    }, [inputs.old_risk_status])

    useEffect(() => {
        console.log('RiskProcessForm : inputs.risk_comment is changed')
        console.log(inputs)
        setProcessInput(RiskProcessInputControl())
        setStatusInput(RiskProcessInputControl() || !inputs.risk_comment)
        setSubmitProcessButton(RiskProcessInputControl() || !inputs.risk_comment)
        setInputs((
            inputs.risk_comment ? 
            inputs : 
            inputs.old_risk_status && inputs.old_risk_status.status ? {
                ...inputs, 
                risk_new_status: inputs.old_risk_status.status,
            } : inputs
        ))
    }, [inputs.risk_comment])

    return(
        <Container className="p-3 border rounded">
            <h2 className="text-center">
                การดำเนินการเกี่ยวกับความเสี่ยง
            </h2>
            {
                inputs.risk_status && inputs.risk_status.length > 0 ? (
                    <Form onSubmit={handleProcess}>
                        { 
                            /** TIMELINES */
                            inputs.risk_status && inputs.risk_status.map((data, idx) => {
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
                                        key={`process-${idx}`} >
                                        <Card.Header>ระยะที่ {idx+1} : {data.status}</Card.Header>
                                        <Card.Body className="p-3">
                                            <Card.Title>{data.comment}</Card.Title>
                                            <Card.Text>ดำเนินการโดย {data.user} เมื่อวันที่ {DateToDatetime(data.date)} </Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            }).reverse()
                        }

                        {/** COMMENT INPUT */}
                        <Form.Group>
                            <Form.Label className="pt-3">การดำเนินการ</Form.Label>
                            <Form.Control 
                                name="risk_comment" 
                                type="text" 
                                as="textarea"
                                disabled={processInput || (inputs.old_risk_status.status === 'ดำเนินการแล้วเสร็จ')}
                                onChange={handleChange}
                                value={inputs.risk_comment || '' } />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="pt-3">สถานะการดำเนินการ</Form.Label>
                            <Form.Select 
                                name="risk_new_status" 
                                disabled={statusInput || (inputs.old_risk_status.status === 'ดำเนินการแล้วเสร็จ')}
                                onChange={handleChange}
                                value={inputs.risk_status || '' }>
                                    {(inputs.old_risk_status.status === 'รอดำเนินการ' || !inputs.old_risk_status.status) &&
                                        (<option>รอดำเนินการ</option>) 
                                    }
                                    <option>อยู่ระหว่างการดำเนินการ</option>
                                    <option>ดำเนินการแล้วเสร็จ</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="pt-3">วันที่เริ่มดำเนินการ</Form.Label>
                            <Form.Control 
                                name="risk_initialized_date" 
                                type="text" 
                                disabled 
                                value={DateToDatetime(inputs.riskinitialized_date) || ''} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="pt-3">วันที่ดำเนินการแล้วเสร็จ</Form.Label>
                            <Form.Control 
                                name="risk_finalized_date" 
                                type="text" 
                                disabled 
                                value={DateToDatetime(inputs.risk_finalized_date) || '' } />
                        </Form.Group>

                        <div className="d-grid mt-3">
                            <Button 
                                type="submit" 
                                disabled={submitProcessButton || (inputs.old_risk_status.status === 'ดำเนินการแล้วเสร็จ')}>
                                พิจารณาการดำเนินการ
                            </Button>
                        </div>
                    </Form>    
                ) : (
                    <>
                        ไม่เป็นความเสี่ยง
                    </>
                )
            }            
        </Container>     
    )
}

export default RiskProcessForm;