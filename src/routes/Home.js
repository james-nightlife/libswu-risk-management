import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SearchRisksForm from '../forms/SearchRisksForm';
import RisksTable from '../table/RisksTable';
import RisksDashboard from '../dashboard/RisksDashboard';
import Pagination from '../components/Pagination';


const Home = () => {
    document.title = "ระบบรวบรวมรายงานความเสี่ยง";

    /* ตารางรายงานความเสี่ยง */
    const [risks, setRisks] = useState([]);
    const [raw, setRaw] = useState([]);

    const fetchData = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/risk/record`, {
            method: "GET",
        }).then((data) => (data.json()))

        .then((data) => {
            if(data.length > 0){
                setRaw(data.sort((a, b) => new Date(b.report_date) - new Date(a.report_date)));
            }
            
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
            <RisksDashboard raw={raw} />
            <SearchRisksForm handleFind={handleFind} handleChange={handleChange} inputs={inputs} />
            <RisksTable currentItems={currentItems} riskEditorRoute={riskEditorRoute} itemOffset={itemOffset} />
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </Container>
    );
}
export default Home;
