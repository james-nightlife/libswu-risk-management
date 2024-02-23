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
                        <th className="fit">ที่</th>
                        <th className="fit">รายละเอียด</th>
                        <th className="fit">สถานที่แจ้ง</th>
                        <th className="fit">ผู้แจ้ง</th>
                        <th className="fit">วันที่รายงาน</th>
                        <th className="fit">สถานะการดำเนินการ</th>
                        <th className="fit">จัดการ</th>
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
                            <td className="align-middle fit">{idx+itemOffset+1}</td>
                            <td className="align-middle fit">{data.detail}</td>
                            <td className="align-middle fit">{data.location}</td>
                            <td className="align-middle fit">{data.reporter}</td>
                            <td className="align-middle fit">{DateToDatetime(data.createdAt)}</td>
                            <td className="align-middle fit">
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
                    id="home-exportbutton"
                    filename='Risks_LibSWU.csv' 
                    className='btn btn-primary'>
                            บันทึกรายงานเป็นไฟล์ CSV
                </CSVLink> 
            </div>
            
        </Container>
    )
}

export default RisksTable;