const { Form, Row, Col, Button } = require("react-bootstrap")

const SearchRisksForm = ({handleFind, handleChange, inputs}) => {
    return(
        <Form onSubmit={handleFind}>
                <Row>
                    <Col xl={9} className="mt-3">
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="keyword"
                                onChange={handleChange}
                                value={inputs.keyword || ''} />
                        </Form.Group>
                    </Col>
                    <Col xl={3} className="mt-3">
                        <div className="d-grid">
                            <Button type="submit">
                                ค้นหา
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row >    
                    <Col xl={3} className="mt-3">
                        <Form.Group>
                            <Form.Label>วันเริ่มต้น</Form.Label>
                            <Form.Control
                                type="date"
                                name="firstdate"
                                onChange={handleChange}
                                value={inputs.firstdate || ''} />
                        </Form.Group>
                    </Col>
                    <Col xl={3} className="mt-3">
                        <Form.Group>
                            <Form.Label>วันสิ้นสุด</Form.Label>
                            <Form.Control
                                type="date"
                                name="enddate"
                                onChange={handleChange}
                                value={inputs.enddate || ''} />
                        </Form.Group>
                    </Col>
                    <Col xl={3} className="mt-3">
                        <Form.Group>
                        <Form.Label>สถานที่แจ้ง</Form.Label>
                            <Form.Select
                                name="location"
                                onChange={handleChange}
                                value={inputs.location || ''} >
                                    <option value={''}>สถานที่แจ้ง</option>
                                    <option>ประสานมิตร</option>
                                    <option>องครักษ์</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xl={3} className="mt-3">
                        <Form.Group>
                            <Form.Label>สถานะ</Form.Label>
                            <Form.Select
                                name="status"
                                onChange={handleChange}
                                value={inputs.status || ''} >
                                    <option value={''}>สถานะ</option>
                                    <option>รอดำเนินการ</option>
                                    <option>อยู่ระหว่างการดำเนินการ</option>
                                    <option>ดำเนินการแล้วเสร็จ</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>  
            </Form>
    )
}

export default SearchRisksForm;