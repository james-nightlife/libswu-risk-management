import { Container, Form, FormLabel } from "react-bootstrap";

const RiskReport = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return(
        <Container className="p-5">
            <Form>
                <FormLabel>บัวศรีไอดี</FormLabel>
                <Form.Control type="text" value={user.username} disabled />
                <FormLabel>ชื่อ</FormLabel>
                <Form.Control type="text" value={user.name} disabled />
                <FormLabel>รหัสบุคลากร / นิสิต</FormLabel>
                <Form.Control type="text" value={user.uni_id} disabled />
                <FormLabel>ส่วนงาน</FormLabel>
                <Form.Control type="text" value={user.faculty} disabled />
                <FormLabel>รายละเอียดความเสี่ยง</FormLabel>
                <Form.Control as="textarea"  />
            </Form>
        </Container>
    )
}
export default RiskReport;