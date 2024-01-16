import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { dateToDateTime } from '../components/Simple';
import ReactPaginate from "react-paginate";


const Home = () => {
    // const user = JSON.parse(sessionStorage.getItem('user'))

    /* ตารางรายงานความเสี่ยง */
    const [risks, setRisks] = useState([]);
    const [raw, setRaw] = useState([]);

    const fetchData = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/risks`, {
            method: "GET",
        }).then((data) => (data.json()))
        .then(async (data) => {
            await setRaw(data.data.sort((a, b) => b.id - a.id));
        }).catch();
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setRisks(raw);
    }, [raw])


    const riskEditorRoute = (e, id) => {
        e.preventDefault()
        localStorage.setItem('risk_id', id);
        window.location.href = "/risk-editor";
    }

    /* Pagination */
    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = risks.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(risks.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % risks.length;
        setItemOffset(newOffset);
    };

    /* ช่องค้นหา */
    const [inputs, setInputs] = useState({});
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const filterLocation = () => {

    }

    const handleFind = async (e) => {
        e.preventDefault()
        console.log(inputs)
        var result = raw.filter(obj => {
            const locationFilter = (
                (obj.location === inputs.location) ||
                (inputs.location === '') ||
                (!inputs.location)
            );
            const statusFilter = (
                (obj.status === inputs.status) 
                || (inputs.status === '') 
                || (!inputs.status)
            );
            const firstDateFilter = (
                (new Date(obj.report_date).getTime() >= new Date(inputs.firstdate).getTime()) ||
                (inputs.firstdate === '') || 
                (!inputs.firstdate)
            );
            const lastDateFilter = (
                (new Date(obj.report_date).getTime() <= new Date(`${inputs.enddate} 23:59:59`).getTime()) ||
                (inputs.enddate === '') || 
                (!inputs.enddate)
            );
            var keywordFilter = true;
            if(inputs.keyword){
                keywordFilter = (
                    (obj.detail.toLowerCase().indexOf(inputs.keyword.toLowerCase()) !== -1) || 
                    (obj.reporter.toLowerCase().indexOf(inputs.keyword.toLowerCase()) !== -1) ||
                    (inputs.keyword === '') || 
                    !inputs.keyword);
            }
            if(locationFilter && 
                statusFilter && 
                firstDateFilter && 
                lastDateFilter && 
                keywordFilter){
                return true
            }else{
                return false
            }
        });
        setRisks(result);
    }
    
    return(
        <Container className='p-3'>
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
                                    <td>{raw.filter((obj) => obj.status === 'รอดำเนินการ').length}</td>
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
            <Table responsive className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>รายละเอียด</th>
                        <th>สถานที่แจ้ง</th>
                        <th>ผู้แจ้ง</th>
                        <th>วันที่รายงาน</th>
                        <th>สถานะการดำเนินการ</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map((data, idx) => (               
                        <tr key={idx}>  
                            <td className="align-middle">{data.id}</td>
                            <td className="align-middle">{data.detail}</td>
                            <td className="align-middle">{data.location}</td>
                            <td className="align-middle">{data.reporter}</td>
                            <td className="align-middle">{dateToDateTime(data.report_date)}</td>
                            <td className="align-middle">{data.status}</td>
                            <td className="align-middle"><Button onClick={e => riskEditorRoute(e, data.id)}>แก้ไข/ประเมิน</Button></td>
                        </tr> 
                    ))}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel='...'
                nextLabel='Next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel='< Previous'
                renderOnZeroPageCount={null}
            />
        </Container>
    );
}
export default Home;
