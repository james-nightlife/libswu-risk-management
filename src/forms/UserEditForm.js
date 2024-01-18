import { Button, Form } from "react-bootstrap";

const UserEditForm = (handleSubmit, handleChange, inputs, roleDropdown) => {
    <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>บัวศรีไอดี</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="username"  
                        onChange={handleChange} 
                        value={inputs.username}
                        disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <Form.Control 
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={inputs.password} />
                </Form.Group>
                {/*
                <Form.Group>
                    <Form.Label>เลขประจำตัวบุคลากร / นิสิต</Form.Label>
                    <Form.Control
                        type="text"
                        name="uni_id"
                        onChange={handleChange}
                        value={input.uni_id} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ชื่อ - สกุล</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={input.name} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ส่วนงาน</Form.Label>
                    <Form.Select 
                        name="faculty" 
                        onChange={handleChange}
                        value={input.faculty}>
                        <option value='0'>-- ส่วนงาน --</option>
                        <option>คณะศึกษาศาสตร์</option>
                        <option>คณะมนุษยศาสตร์</option>
                        <option>คณะสังคมศาสตร์</option>
                        <option>คณะวิทยาศาสตร์</option>
                        <option>คณะพลศึกษา</option>
                        <option>คณะแพทยศาสตร์</option>
                        <option>คณะทันตแพทยศาสตร์</option>
                        <option>คณะเภสัชศาสตร์</option>
                        <option>คณะกายภาพบำบัด</option>
                        <option>คณะพยาบาลศาสตร์</option>
                        <option>คณะวิศวกรรมศาสตร์</option>
                        <option>คณะศิลปกรรมศาสตร์</option>
                        <option>วิทยาลัยนานาชาติเพื่อศึกษาความยั่งยืน</option>
                        <option>วิทยาลัยนวัตกรรมสื่อสารสังคม</option>
                        <option>คณะเศรษฐศาสตร์</option>
                        <option>คณะเทคโนโลยีและนวัตกรรมผลิตภัณฑ์การเกษตร</option>
                        <option>วิทยาลัยโพธิวิชชาลัย</option>
                        <option>คณะวัฒนธรรมสิ่งแวดล้อมและการท่องเที่ยวเชิงนิเวศ</option>
                        <option>วิทยาลัยอุตสาหกรรมสร้างสรรค์</option>
                        <option>คณะบริหารธุรกิจเพื่อสังคม</option>
                        <option>บัณฑิตวิทยาลัย</option>
                        <option>สำนักหอสมุดกลาง</option>
                        <option>สำนักคอมพิวเตอร์</option>
                        <option>สำนักสื่อและเทคโนโลยีการศึกษา</option>
                        <option>สำนักนวัตกรรมการเรียนรู้</option>
                        <option>สำนักทดสอบทางการศึกษาและจิตวิทยา</option>
                        <option>สถาบันวัฒนธรรมและศิลปะ</option>
                        <option>สถาบันวิจัย พัฒนา และสาธิตการศึกษา</option>
                        <option>สถาบันวิจัยพฤติกรรมศาสตร์</option>
                        <option>สถาบันยุทธศาสตร์ทางปัญญาและวิจัย</option>
                        <option>สำนักงานอธิการบดี</option>
                        <option>สำนักงานสภามหาวิทยาลัย</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>สถานะ</Form.Label>
                    <Form.Select
                        name="status"
                        onChange={handleChange}
                        value={input.status}>
                        <option value='0'>-- สถานะ --</option>
                        <option>บุคลากร</option>
                        <option>นิสิต</option>
                    </Form.Select>
                </Form.Group>
    */}
                <Form.Group>
                    <Form.Label>สถานะการใช้งาน</Form.Label>
                    <Form.Select
                        name="role"
                        onChange={handleChange}
                        value={inputs.role}
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
}

export default UserEditForm;