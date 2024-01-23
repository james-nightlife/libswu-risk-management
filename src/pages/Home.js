import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SearchRisksForm from '../forms/SearchRisksForm';
import RisksTable from '../table/RisksTable';
import RisksDashboard from '../dashboard/RisksDashboard';
import Pagination from '../components/Pagination';
import { CSVLink } from 'react-csv';
import { ExportRisksToCSV } from '../functions/ExportsRiskToCSV';
import { FilterRisks } from '../functions/FilterRisks';

const Home = () => {
    // TITLE
    document.title = "ระบบรวบรวมรายงานความเสี่ยง สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ";

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
    
    return(
        <Container className='p-3'>
            <RisksDashboard 
                raw={raw} />
            <SearchRisksForm 
                handleFind={handleFind} 
                handleChange={handleChange} 
                inputs={inputs} />
            <CSVLink 
                data={clean}
                filename='Risks_LibSWU.csv' 
                className='btn btn-primary mt-3'>
                    บันทึกเป็น CSV
            </CSVLink>
            { raw === null ? (
                <p>Loading...</p>
            ) : raw.length === 0 ? (
                <>
                </>
            ) : (
                <>
                    <RisksTable 
                        currentItems={currentItems}
                        riskEditorRoute={riskEditorRoute}
                        itemOffset={itemOffset} />
                    <Pagination 
                        handlePageClick={handlePageClick}
                        pageCount={pageCount} /> 
                </>
            )}
        </Container>
    );
}
export default Home;
