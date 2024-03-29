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
                        <th>สถานะความเสี่ยง</th>
                        <th>สถานะแจ้งซ่อม</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map((data, idx) => {
                        data.risk_color = (
                            data.risk_status && 
                            data.risk_status.length > 0 && 
                            data.risk_status[data.risk_status.length - 1].status === 'รอดำเนินการ' ? 'danger' :
                            data.risk_status && 
                            data.risk_status.length > 0 && 
                            data.risk_status[data.risk_status.length - 1].status === 'อยู่ระหว่างการดำเนินการ' ? 'warning' :
                            data.risk_status && 
                            data.risk_status.length > 0 && 
                            data.risk_status[data.risk_status.length - 1].status === 'ดำเนินการแล้วเสร็จ' ? 'success' :
                            'dark'
                        )
                        data.ma_color = (
                            data.ma_status && 
                            data.ma_status.length > 0 && 
                            data.ma_status[data.ma_status.length - 1].status === 'รอดำเนินการ' ? 'danger' :
                            data.ma_status && 
                            data.ma_status.length > 0 && 
                            data.ma_status[data.ma_status.length - 1].status === 'อยู่ระหว่างการดำเนินการ' ? 'warning' :
                            data.ma_status && 
                            data.ma_status.length > 0 && 
                            data.ma_status[data.ma_status.length - 1].status === 'ดำเนินการแล้วเสร็จ' ? 'success' :
                            'dark'
                        )

                        return(               
                        <tr key={idx+itemOffset+1}>  
                            <td className="align-middle fit">{idx+itemOffset+1}</td>
                            <td className="align-middle">{data.detail}</td>
                            <td className="align-middle fit">{data.location}</td>
                            <td className="align-middle fit">{data.reporter}</td>
                            <td className="align-middle fit">{DateToDatetime(data.createdAt)}</td>
                            <td className="align-middle fit">
                                <div className="d-grid">
                                    <Button variant={data.risk_color}>
                                        {
                                            data.risk_status && data.risk_status.length > 0 ?
                                            data.risk_status[data.risk_status.length - 1].status :
                                            'ไม่เป็นความเสี่ยง'
                                        }
                                        </Button>
                                </div>          
                            </td>
                            <td className="align-middle fit">
                                <div className="d-grid">
                                    <Button variant={data.ma_color}>
                                        {
                                            data.ma_status && data.ma_status.length > 0 ?
                                            data.ma_status[data.ma_status.length - 1].status :
                                            'ไม่แจ้งซ่อม'
                                        }
                                    </Button>
                                </div>          
                            </td>
                            <td className="align-middle fit">
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