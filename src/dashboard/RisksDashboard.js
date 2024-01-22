import { Col, Container, Row, Table } from "react-bootstrap";

const RisksDashboard = ({raw}) => {
    return(
        <Container>
            <h1 className='text-center' >จำนวนรายงานความเสี่ยงทั้งหมด {raw.length} เรื่อง</h1>
               <Row>
                    <Col xl={6} className="mt-3">
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
                    <Col xl={6} className="mt-3">
                        <Table>
                            <thead>
                                <tr>
                                    <th>สถานะ</th>
                                    <th>จำนวน (เรื่อง)</th>
                                </tr>                  
                            </thead>
                            <tbody>
                                <tr>
                                    <td>รอดำเนินการ</td>
                                    <td>{raw.filter((obj) => obj.status === 'รอดำเนินการ' || !obj.status).length}</td>
                                </tr>
                                <tr>
                                    <td>อยู่ระหว่างการดำเนินการ</td>
                                    <td>{raw.filter((obj) => obj.status === 'อยู่ระหว่างการดำเนินการ').length}</td>
                                </tr>
                                <tr>
                                    <td>ดำเนินการแล้วเสร็จ</td>
                                    <td>{raw.filter((obj) => obj.status === 'ดำเนินการแล้วเสร็จ').length}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
        </Container>     
    );
}

export default RisksDashboard;