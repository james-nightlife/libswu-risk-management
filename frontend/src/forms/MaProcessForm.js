import { Button, Card, Container, Form } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";
import { useEffect, useState } from "react";
import { MaProcessInputControl } from "../functions/MaProcessInputControl";

const MaProcessForm = ({handleProcess, inputs, handleChange, setInputs}) => {
    const [processInput, setProcessInput] = useState(true);
    const [statusInput, setStatusInput] = useState(true);
    const [submitProcessButton, setSubmitProcessButton] = useState(true);

    useEffect(() => {
        console.log('MaProcessForm : ma_comment is changed')
        console.log(inputs.ma_comment)
        setProcessInput(MaProcessInputControl(inputs.sub_type))
        setStatusInput(MaProcessInputControl(inputs.sub_type) || !inputs.ma_comment)
        setSubmitProcessButton(MaProcessInputControl(inputs.sub_type) || !inputs.ma_comment)
        setInputs((
            inputs.ma_comment ? 
            inputs : 
            inputs.old_ma_status && inputs.old_ma_status.status ? {
                ...inputs, 
                ma_status: inputs.old_ma_status.status,
            } : inputs
        ))
    }, [inputs.ma_comment])


    return(
        <Container className="p-3 border rounded">
            <h2 className="text-center">
                การดำเนินการซ่อมบำรุง
            </h2>
            {
                inputs.ma_status && inputs.ma_status.length > 0 ? (
                    <Form onSubmit={handleProcess}>
                        { 
                            /** TIMELINE */
                            inputs.ma_status && inputs.ma_status.map((data, idx) => {
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
                                name="ma_comment" 
                                type="text" 
                                as="textarea"
                                disabled={
                                    processInput || 
                                    (inputs.old_ma_status.status === 'ดำเนินการแล้วเสร็จ')
                                }
                                onChange={handleChange}
                                value={inputs.ma_comment || ''} />
                        </Form.Group>

                        {/** STATUS INPUT  */}
                        <Form.Group>
                            <Form.Label className="pt-3">สถานะการดำเนินการ</Form.Label>
                            <Form.Select 
                                name="ma_status" 
                                disabled={statusInput || (inputs.old_ma_status.status === 'ดำเนินการแล้วเสร็จ')}
                                onChange={handleChange}
                                value={inputs.old_ma_status.status || ''}>
                                    {(inputs.old_ma_status === 'รอดำเนินการ' || !inputs.old_ma_status) &&
                                        (<option>รอดำเนินการ</option>) 
                                    }
                                    <option>อยู่ระหว่างการดำเนินการ</option>
                                    <option>ดำเนินการแล้วเสร็จ</option>
                            </Form.Select>
                        </Form.Group>

                        {/** INITIALIZED DATE  */}        
                        <Form.Group>
                            <Form.Label className="pt-3">วันที่เริ่มดำเนินการ</Form.Label>
                            <Form.Control 
                                name="ma_initialized_date" 
                                type="text" 
                                disabled 
                                value={DateToDatetime(inputs.ma_initialized_date) || ''} />
                        </Form.Group>

                        {/** FINALIZED DATE  */}
                        <Form.Group>
                            <Form.Label className="pt-3">วันที่ดำเนินการแล้วเสร็จ</Form.Label>
                            <Form.Control 
                                name="ma_finalized_date" 
                                type="text" 
                                disabled 
                                value={DateToDatetime(inputs.ma_finalized_date) || '' } />
                        </Form.Group>

                        {/** SUBMIT BUTTON  */}
                        <div className="d-grid mt-3">
                            <Button 
                                type="submit" 
                                disabled={submitProcessButton || (inputs.old_ma_status.status === 'ดำเนินการแล้วเสร็จ')}>
                                พิจารณาการดำเนินการ
                            </Button>
                        </div>
                    </Form>    
                ) : (
                    <>
                        <>ไม่เป็นรายงานแจ้งซ่อม</>
                    </>
                )
            }            
        </Container>     
    )
}

export default MaProcessForm;