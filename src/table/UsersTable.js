import { Button, Table } from "react-bootstrap";
import { DateToDatetime } from "../functions/DateToDatetime";

const UsersTable = ({currentItems, handleEditButton, itemOffset}) => {
    return(
        <Table className="mt-3" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>สิทธิ์ใช้งาน</th>
                        <th>วันที่สร้างผู้ใช้</th>
                        <th>วันที่ลงชื่อเข้าใช้ล่าสุด</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map((data, idx) => (
                        <tr key={idx+itemOffset+1}>
                            <td>{idx+itemOffset+1}</td>
                            <td>{data.username}</td>
                            <td>{data.role}</td>
                            <td>{DateToDatetime(data.createdAt)}</td>
                            <td>{DateToDatetime(data.updatedAt)}</td>
                            <td className="align-middle">
                                <Button onClick={e => handleEditButton(e, data._id)}>แก้ไข</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </Table>
    )
}

export default UsersTable;