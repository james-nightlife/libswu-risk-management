import {Button, Container, Table } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";
import Pagination from "../components/Pagination";
import { CSVLink } from "react-csv";

const RisksTable = ({currentItems, riskEditorRoute, itemOffset, handlePageClick, pageCount, clean}) => {
    return(
        <Container className="border rounded p-3">
            <Table responsive>
                <thead>
                    <tr>
                        <th>ที่</th>
                        <th>รายละเอียด</th>
                        <th>สถานที่แจ้ง</th>
                        <th>ผู้แจ้ง</th>
                        <th>วันที่รายงาน</th>
                        <th>สถานะการดำเนินการ</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map((data, idx) => {
                        if(data.status === 'รอดำเนินการ' || !data.status){
                            data.color = 'danger';
                        }else if(data.status === 'อยู่ระหว่างการดำเนินการ'){
                            data.color = 'warning';
                        }else if(data.status === 'ดำเนินการแล้วเสร็จ'){
                            data.color = 'success';
                        }

                        return(               
                        <tr key={idx+itemOffset+1}>  
                            <td className="align-middle">{idx+itemOffset+1}</td>
                            <td className="align-middle">{data.detail}</td>
                            <td className="align-middle">{data.location}</td>
                            <td className="align-middle">{data.reporter}</td>
                            <td className="align-middle">{DateToDatetime(data.createdAt)}</td>
                            <td className="align-middle">
                                <div className="d-grid">
                                    <Button variant={data.color}>{data.status || 'รอดำเนินการ'}</Button>
                                </div>          
                            </td>
                            <td className="align-middle">
                                <Button onClick={e => riskEditorRoute(e, data._id)}>เรียกดู</Button>
                            </td>
                        </tr> 
                    )})}
                </tbody>
            </Table>
            <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount} />
            <div className="d-grid">
                <CSVLink 
                    data={clean}
                    filename='Risks_LibSWU.csv' 
                    className='btn btn-primary'>
                        บันทึกรายงานเป็นไฟล์ CSV
                </CSVLink> 
            </div>
            
        </Container>
    )
}

export default RisksTable;