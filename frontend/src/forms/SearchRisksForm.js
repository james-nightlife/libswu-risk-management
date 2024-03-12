const { Form, Row, Col, Button, Container } = require("react-bootstrap")

const SearchRisksForm = ({handleChange, inputs, handleClear}) => {

    return(
        <Container className="border rounded p-3">
            <h1 className="m-0 text-center">ค้นหารายงานความเสี่ยง</h1>
            <Form>
                <Row>

                    {/** KEYWORD */}
                    <Col xl={11} className="mt-3">
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="keyword"
                                onChange={handleChange}
                                placeholder="ค้นหาคำสำคัญ เช่น รายละเอียด ผู้แจ้ง เป็นต้น"
                                value={inputs.keyword || ''} />
                        </Form.Group>
                    </Col>

                    {/** CLEAR BUTTON */}
                    <Col xl={1} className="mt-3">
                        <div className="d-grid">
                            <Button 
                                className="btn-danger"
                                onClick={handleClear}>
                                ล้าง
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>

                    {/** SUBTYPE */}
                    <Col xl={3} className="mt-3">
                        <Form.Group>
                            <Form.Label>ประเภทของปัญหา</Form.Label>
                            <Form.Select
                                name="subtype"
                                onChange={handleChange}
                                value={inputs.subtype || ''} >
                                    <option value={''}>ประเภทของปัญหา</option>
                                    <option>คอมพิวเตอร์และอุปกรณ์</option>
                                    <option>ไฟฟ้า</option>
                                    <option>ประปา</option>
                                    <option>ลิฟต์</option>
                                    <option>เครื่องปรับอากาศ</option>
                                    <option>โต๊ะ เก้าอี้</option>
                                    <option>อาคารสถานที่</option>
                                    <option>อื่นๆ</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/** LOCATION */}
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

                    {/** START DATE */}
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

                    {/** END DATE */}
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
                </Row>
                <Row>
                    {/** RISK STATUS */}
                    <Col xl={6} className="mt-3">
                        <Form.Group>
                            <Form.Label>สถานะความเสี่ยง</Form.Label>
                            <Form.Select
                                name="status"
                                onChange={handleChange}
                                value={inputs.status || ''} >
                                    <option value={''}>สถานะความเสี่ยง</option>
                                    <option>รอดำเนินการ</option>
                                    <option>อยู่ระหว่างการดำเนินการ</option>
                                    <option>ดำเนินการแล้วเสร็จ</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/** MAINTENANCE STATUS */}
                    <Col xl={6} className="mt-3">
                        <Form.Group>
                            <Form.Label>สถานะแจ้งซ่อม</Form.Label>
                            <Form.Select
                                name="ma_status"
                                onChange={handleChange}
                                value={inputs.ma_status || ''} >
                                    <option value={''}>สถานะแจ้งซ่อม</option>
                                    <option>รอดำเนินการ</option>
                                    <option>อยู่ระหว่างการดำเนินการ</option>
                                    <option>ดำเนินการแล้วเสร็จ</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>  
            </Form>
        </Container>    
    )
}

export default SearchRisksForm;