import { Button, Table } from "react-bootstrap";
import { dateToDateTime } from "../components/Simple";

const RisksTable = ({currentItems, riskEditorRoute, itemOffset}) => {
    return(
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
                        <tr key={idx+itemOffset+1}>  
                            <td className="align-middle">{idx+itemOffset+1}</td>
                            <td className="align-middle">{data.detail}</td>
                            <td className="align-middle">{data.location}</td>
                            <td className="align-middle">{data.reporter}</td>
                            <td className="align-middle">{dateToDateTime(data.report_date)}</td>
                            <td className="align-middle">{data.status}</td>
                            <td className="align-middle">
                                <Button onClick={e => riskEditorRoute(e, data._id)}>แก้ไข/ประเมิน</Button>
                            </td>
                        </tr> 
                    ))}
                </tbody>
            </Table>
    )
}

export default RisksTable;