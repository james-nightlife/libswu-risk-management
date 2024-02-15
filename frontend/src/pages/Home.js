
import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { ExportRisksToCSV } from '../functions/ExportsRiskToCSV';
import { FilterRisks } from '../functions/FilterRisks';

import SearchRisksForm from '../forms/SearchRisksForm';
import RisksTable from '../table/RisksTable';
import RisksDashboard from '../dashboard/RisksDashboard';
import RiskReportButton from '../button/RiskReportButton';

const Home = () => {
    // TITLE
    document.title = "ระบบรวบรวมรายงานความเสี่ยงภายในอาคารสำนักหอสมุดกลางและห้องสมุดองครักษ์ มหาวิทยาลัยศรีนครินทรวิโรฒ";

    // FETCH RISKS
    const [raw, setRaw] = useState([]);
    const [risks, setRisks] = useState([]);
    const [clean, setClean] = useState([]);

    const fetchData = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/risk/record`, {
            method: "GET",
        })
        .then(async (res) => {
            const data = await res.json();
            if(data.length > 0){
                setRaw(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } 
        }).catch();
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(raw.length > 0){
            setRisks(raw); 
            setClean(ExportRisksToCSV(raw))
        }   
    }, [raw])

    // ROUTE TO EDITOR
    const riskEditorRoute = (e, id) => {
        e.preventDefault()
        localStorage.setItem('risk_id', id);
        window.location.href = "/risk-editor";
    }

    // PAGINATION
    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = risks.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(risks.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % risks.length;
        setItemOffset(newOffset);
    };

    // SEARCH FORM
    const [inputs, setInputs] = useState({});
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleFind = async (e) => {
        e.preventDefault();
        const result = FilterRisks(raw, inputs)
        setRisks(result);
    }

    const handleClear = async (e) => {
        e.preventDefault();
        setInputs({})
    }
    
    return(
        <Container className='p-3'>
            <RiskReportButton />
            <hr />
            <SearchRisksForm 
                handleFind={handleFind} 
                handleChange={handleChange} 
                inputs={inputs}
                handleClear={handleClear} />
            <hr />
            { raw === null ? (
                <p>Loading...</p>
            ) : raw.length > 0 && (
                <>
                    <RisksTable 
                        currentItems={currentItems}
                        riskEditorRoute={riskEditorRoute}
                        itemOffset={itemOffset}
                        handlePageClick={handlePageClick}
                        pageCount={pageCount}
                        clean={clean} />
                    <hr />
                </>
            )}
            <RisksDashboard 
                raw={raw} />
            <hr />
        </Container>
    );
}
export default Home;
