import { Button, Form } from "react-bootstrap";

const UserEditForm = ({handleSubmit, handleChange, inputs, roleDropdown}) => {
    return(
        <Form onSubmit={handleSubmit}>
            <h1>จัดการบัญชีผู้ใช้</h1>
            <Form.Group>
                <Form.Label>บัวศรีไอดี</Form.Label>
                <Form.Control 
                    type="text" 
                    name="username"  
                    onChange={handleChange} 
                    value={inputs.username || ''}
                    disabled />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>สถานะการใช้งาน</Form.Label>
                <Form.Select
                    name="role"
                    onChange={handleChange}
                    value={inputs.role || ''}
                    disabled={roleDropdown}
                >
                    <option value='0'>-- สถานะการใช้งาน --</option>
                    <option value='admin'>ผู้ดูแล</option>
                    <option value='committee'>กรรมการ</option>
                    <option value='visitor'>ผู้ใช้ทั่วไป</option>
                </Form.Select>
            </Form.Group>
            <div className="d-grid mt-3">
                <Button
                    type="submit">
                    บันทึก
                </Button>
            </div>
        </Form>
    );
}

export default UserEditForm;