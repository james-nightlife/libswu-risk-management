import "react-multi-carousel/lib/styles.css";

//import '../App.css';
import '../index.css';
import { Button, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { dateToDateTime } from '../components/Simple';
import ReactPaginate from "react-paginate";


const Home = () => {
    // const user = JSON.parse(sessionStorage.getItem('user'))
    const [risks, setRisks] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch('http://127.0.0.1:9000/risks', {
            method: "GET",
        }).then((data) => (data.json()))
        .then(async (data) => {
            await setRisks(data.data.sort((a, b) => b.id - a.id))
        }).catch();
    }

    // Pagination
    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = risks.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(risks.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % risks.length;
        setItemOffset(newOffset);
    };

    const riskEditorRoute = (e, id) => {
        e.preventDefault()
        localStorage.setItem('risk_id', id);
        window.location.href = "/risk-editor";
    }

    return(
        <Container className='px-5 py-3'>
            <Table responsive>
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
