import { Button, Table } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";

const UsersTable = ({currentItems, handleEditButton, itemOffset}) => {
    return(
        <Table className="mt-3" responsive>
                <thead>
                    <tr>
                        <th>ที่</th>
                        <th>ชื่อผู้ใช้</th>
                        <th>สิทธิ์ใช้งาน</th>
                        <th>วันที่สร้างผู้ใช้</th>
                        <th>วันที่ลงชื่อเข้าใช้ล่าสุด</th>
                        <th className="fit">ที่มาของการลงชื่อเข้าใช้</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map((data, idx) => (
                        <tr key={idx+itemOffset+1}>
                            <td className="fit">{idx+itemOffset+1}</td>
                            <td>{data.username} <br/>{data.fullname !== '' && `(${data.fullname})`}</td>
                            <td className="fit">
                                <ul>
                                    {data.role.map((data) => (
                                    <li>
                                        {data}
                                    </li>
                                    ))} 
                                </ul>
                                </td>
                            <td className="fit">{DateToDatetime(data.createdAt)}</td>
                            <td className="fit">{DateToDatetime(data.updatedAt)}</td>
                            <td>{data.app}</td>
                            <td className="align-middle fit">
                                <Button onClick={e => handleEditButton(e, data._id)}>แก้ไข</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </Table>
    )
}

export default UsersTable;