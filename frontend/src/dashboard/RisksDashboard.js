import { Col, Container, Row, Table } from "react-bootstrap";

const RisksDashboard = ({raw}) => {
    return(
        <Container className="p-3 border rounded">
            <h1 className='text-center'>จำนวนรายงานทั้งหมด {raw.length} เรื่อง</h1>
            <Row>
                <Col xl={3} className="mt-3">
                    <Table>
                        <thead>
                            <tr>
                                <th>ประเภท</th>
                                <th>จำนวน (เรื่อง)</th>
                            </tr>                  
                        </thead>
                        <tbody>
                            <tr>
                                <td>รายงานความเสี่ยง</td>
                                <td>{raw.filter((obj) => obj.type.includes('รายงานความเสี่ยง')).length}</td>
                            </tr>
                            <tr>
                                <td>รายงานแจ้งซ่อม</td>
                                <td>{raw.filter((obj) => obj.type.includes('รายงานแจ้งซ่อม')).length}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col xl={3} className="mt-3">
                    <Table>
                        <thead>
                            <tr>
                                <th>สถานที่</th>
                                <th>จำนวน (เรื่อง)</th>
                            </tr>                  
                        </thead>
                        <tbody>
                            <tr>
                                <td>ประสานมิตร</td>
                                <td>{raw.filter((obj) => obj.location === 'ประสานมิตร').length}</td>
                            </tr>
                            <tr>
                                <td>องครักษ์</td>
                                <td>{raw.filter((obj) => obj.location === 'องครักษ์').length}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col xl={3} className="mt-3">
                    <Table>
                        <thead>
                            <tr>
                                <th>สถานะความเสี่ยง</th>
                                <th>จำนวน (เรื่อง)</th>
                            </tr>                  
                        </thead>
                        <tbody>
                            <tr>
                                <td>รอดำเนินการ</td>
                                <td>{raw.filter((obj) => obj.risk_status.length > 0 && obj.risk_status[obj.risk_status.length - 1].status === 'รอดำเนินการ').length}</td>
                            </tr>
                            <tr>
                                <td>อยู่ระหว่างการดำเนินการ</td>
                                <td>{raw.filter((obj) => obj.risk_status.length > 0 && obj.risk_status[obj.risk_status.length - 1].status === 'อยู่ระหว่างการดำเนินการ').length}</td>
                            </tr>
                            <tr>
                                <td>ดำเนินการแล้วเสร็จ</td>
                                <td>{raw.filter((obj) => obj.risk_status.length > 0 && obj.risk_status[obj.risk_status.length - 1].status === 'ดำเนินการแล้วเสร็จ').length}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col xl={3} className="mt-3">
                    <Table>
                        <thead>
                            <tr>
                                <th>สถานะแจ้งซ่อม</th>
                                <th>จำนวน (เรื่อง)</th>
                            </tr>                  
                        </thead>
                        <tbody>
                            <tr>
                                <td>รอดำเนินการ</td>
                                <td>{raw.filter((obj) => obj.ma_status.length > 0 && obj.ma_status[obj.ma_status.length - 1].status === 'รอดำเนินการ').length}</td>
                            </tr>
                            <tr>
                                <td>อยู่ระหว่างการดำเนินการ</td>
                                <td>{raw.filter((obj) => obj.ma_status.length > 0 && obj.ma_status[obj.ma_status.length - 1].status === 'อยู่ระหว่างการดำเนินการ').length}</td>
                            </tr>
                            <tr>
                                <td>ดำเนินการแล้วเสร็จ</td>
                                <td>{raw.filter((obj) => obj.ma_status.length > 0 && obj.ma_status[obj.ma_status.length - 1].status === 'ดำเนินการแล้วเสร็จ').length}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col xl={12} className="mt-3">
                    <Table>
                        <thead>
                            <tr>
                                <th>ประเภท</th>
                                <th>จำนวน (เรื่อง)</th>
                            </tr>                  
                        </thead>
                        <tbody>
                            <tr>
                                <td>คอมพิวเตอร์และอุปกรณ์</td>
                                <td>{raw.filter((obj) => obj.sub_type === 'คอมพิวเตอร์และอุปกรณ์').length}</td>
                            </tr>
                            <tr>
                                <td>ไฟฟ้า</td>
                                <td>{raw.filter((obj) => obj.sub_type === 'ไฟฟ้า').length}</td>
                            </tr>
                            <tr>
                                <td>ประปา</td>
                                <td>{raw.filter((obj) => obj.sub_type === 'ประปา').length}</td>
                            </tr>
                            <tr>
                                <td>ลิฟต์</td>
                                <td>{raw.filter((obj) => obj.sub_type === 'ลิฟต์').length}</td>
                            </tr>
                            <tr>
                                <td>เครื่องปรับอากาศ</td>
                                <td>{raw.filter((obj) => obj.sub_type === 'เครื่องปรับอากาศ').length}</td>
                            </tr>
                            <tr>
                                <td>โต๊ะ เก้าอี้</td>
                                <td>{raw.filter((obj) => obj.sub_type === 'โต๊ะ เก้าอี้').length}</td>
                            </tr>
                            <tr>
                                <td>อาคารสถานที่</td>
                                <td>{raw.filter((obj) => obj.sub_type === 'อาคารสถานที่').length}</td>
                            </tr>
                            <tr>
                                <td>อื่นๆ</td>
                                <td>{raw.filter((obj) => obj.sub_type === 'อื่นๆ').length}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>     
    );
}

export default RisksDashboard;