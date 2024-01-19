import { Badge, Button, Table } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";

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
                            <td className="align-middle"><Button variant={data.color}>{data.status || 'รอดำเนินการ'}</Button></td>
                            <td className="align-middle">
                                <Button onClick={e => riskEditorRoute(e, data._id)}>แก้ไข/ประเมิน</Button>
                            </td>
                        </tr> 
                    )})}
                </tbody>
            </Table>
    )
}

export default RisksTable;