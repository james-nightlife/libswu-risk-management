import "react-multi-carousel/lib/styles.css";

//import '../App.css';
import '../index.css';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { dateToDateTime } from '../components/Simple';
import ReactPaginate from "react-paginate";


const Search = () => {
    // const user = JSON.parse(sessionStorage.getItem('user'))

    /* ตารางรายงานความเสี่ยง */
    const [risks, setRisks] = useState([]);

    const fetchData = async () => {
        await fetch('http://127.0.0.1:9000/risks', {
            method: "GET",
        }).then((data) => (data.json()))
        .then(async (data) => {
            await setRisks(data.data.sort((a, b) => b.id - a.id))
        }).catch();
    }
    
    useEffect(() => {
        fetchData();
    }, []);


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
    const [inputs, setInputs] = useState(JSON.parse(localStorage.getItem('search-query')));

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleFind = async (e) => {
        e.preventDefault();
        localStorage.setItem('search-query', JSON.stringify(inputs));
        window.location.href = "/search"
    }

    return(
        <Container className='px-5 py-3'>
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
                            <Form.Label>วันเริ่มต้น</Form.Label>
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
export default Search;
