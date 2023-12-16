import "react-multi-carousel/lib/styles.css";

import '../App.css';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { dateToDateTime } from '../components/Simple';


const Home = () => {
    const [risks, setRisks] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch('http://127.0.0.1:9000/risks', {
            method: "GET",
        }).then((data) => (data.json()))
        .then((data) => {
            setRisks(data.data)
        }).catch();
    }

    return(
        <Container className='p-5'>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>รายละเอียด</th>
                        <th>ผู้แจ้ง</th>
                        <th>วันที่รายงาน</th>
                    </tr>
                </thead>
                <tbody>
                    {risks.map((data, idx) => (
                        <tr key={idx}>
                            <td>{data.id}</td>
                            <td>{data.detail}</td>
                            <td>{data.reporter}</td>
                            <td>{dateToDateTime(data.report_date)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
export default Home;
