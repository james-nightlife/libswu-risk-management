import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SearchRisksForm from '../forms/SearchRisksForm';
import RisksTable from '../table/RisksTable';
import RisksDashboard from '../dashboard/RisksDashboard';
import Pagination from '../components/Pagination';

const Home = () => {
    // ชื่อหน้า
    document.title = "ระบบรวบรวมรายงานความเสี่ยง สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ";

    /* ตารางรายงานความเสี่ยง */
    const [risks, setRisks] = useState([]);
    const [raw, setRaw] = useState([]);

    const fetchData = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/risk/record`, {
            method: "GET",
        })
        .then(async (res) => {
            const data = await res.json();
            if(data.length > 0){
                setRaw(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } 
        }).catch(
        );
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

    const handleFind = async (e) => {
        e.preventDefault();
        const result = raw.filter(obj => {
            const locationFilter = obj.location === inputs.location || !inputs.location;
            const statusFilter = inputs.status !== 'รอดำเนินการ' ? 
              (obj.status === inputs.status || !inputs.status) :
              (obj.status === inputs.status || !inputs.status || !obj.status);
            const firstDateFilter = new Date(obj.createdAt).getTime() >= new Date(inputs.firstdate).getTime() || !inputs.firstdate;
            const lastDateFilter = new Date(obj.createdAt).getTime() <= new Date(`${inputs.enddate} 23:59:59`).getTime() || !inputs.enddate;
            const keywordFilter = !inputs.keyword ||
              (obj.detail.toLowerCase().includes(inputs.keyword.toLowerCase()) ||
              obj.reporter.toLowerCase().includes(inputs.keyword.toLowerCase()));
          
            return locationFilter && statusFilter && firstDateFilter && lastDateFilter && keywordFilter;
          });
        setRisks(result);
    }
    
    return(
        <Container className='p-3'>
            <RisksDashboard raw={raw} />
            <SearchRisksForm handleFind={handleFind} handleChange={handleChange} inputs={inputs} />
            <RisksTable currentItems={currentItems} riskEditorRoute={riskEditorRoute} itemOffset={itemOffset} />
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </Container>
    );
}
export default Home;
