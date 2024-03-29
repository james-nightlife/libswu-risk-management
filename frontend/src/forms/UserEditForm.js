import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const UserEditForm = ({handleSubmit, handleChange, inputs, roleDropdown}) => {
    // INPUTS
    const [typeInput, setTypeInput] = useState([]);

    const [adminChecked, setAdminChecked] = useState(false);
    const [committeeChecked, setCommitteeChecked] = useState(false);

    const [itChecked, setITChecked] = useState(false);
    const [electricityChecked, setElectricityChecked] = useState(false);
    const [plumblingChecked, setPlumblingChecked] = useState(false);
    const [elevatorChecked, setElevatorChecked] = useState(false);
    const [acChecked, setACChecked] = useState(false);
    const [tableChairChecked, setTableChairChecked] = useState(false);
    const [buildingChecked, setBuildingChecked] = useState(false);
    const [othersChecked, setOthersChecked] = useState(false);

    const [prasarnmitChecked, setPrasarnmitChecked] = useState(false);
    const [ongkhalakChecked, setOngkhalakChecked] = useState(false);


    useEffect(() => {
        if(inputs.role){
            setTypeInput(inputs.role)
            setAdminChecked(inputs.role.includes('admin'));
            setCommitteeChecked(inputs.role.includes('committee'));
            setITChecked(inputs.role.includes('คอมพิวเตอร์และอุปกรณ์'))
            setElectricityChecked(inputs.role.includes('ไฟฟ้า'))
            setPlumblingChecked(inputs.role.includes('ประปา'))
            setElevatorChecked(inputs.role.includes('ลิฟท์'))
            setACChecked(inputs.role.includes('แอร์'))
            setTableChairChecked(inputs.role.includes('คอมพิวเตอร์และอุปกรณ์'))
            setBuildingChecked(inputs.role.includes('คอมพิวเตอร์และอุปกรณ์'))
            setOthersChecked(inputs.role.includes('คอมพิวเตอร์และอุปกรณ์'))
            setPrasarnmitChecked(inputs.role.includes('คอมพิวเตอร์และอุปกรณ์'))
            setOngkhalakChecked(inputs.role.includes('คอมพิวเตอร์และอุปกรณ์'))
        }
    }, [inputs])

    // HANDLE CHECKBOXES
    const handleAdminChecked = async () => {
        setAdminChecked(!adminChecked);
    }

    useEffect(() => {
        setTypeInputEffect('admin', adminChecked)
    }, [adminChecked])

    
    const handleCommitteeChecked = async () => {
        setCommitteeChecked(!committeeChecked);
    }
    
    useEffect(() => {
        setTypeInputEffect('committee', committeeChecked)
    }, [committeeChecked])

    const setTypeInputEffect = async (type, checked) => {
        const updateTypeInput = [...typeInput];
        if(checked && !updateTypeInput.includes(type)){
            updateTypeInput.push(type)
        }else if(!checked && updateTypeInput.includes(type)){
            const idx = updateTypeInput.indexOf(type)
            if(idx !== -1){
                const rm = updateTypeInput.splice(idx, 1)
            }
        }   
        setTypeInput(updateTypeInput)
    }


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

            {/* TYPE CHECKBOXES */}
            <Form.Group className="mt-3">
                    <Form.Label>
                        สถานะการใช้งาน
                    </Form.Label>
                    <Form.Check
                        type="checkbox"
                        checked={adminChecked}
                        onChange={handleAdminChecked}
                        label="ผู้ดูแลระบบ" />
                    <Form.Check
                        type="checkbox"
                        checked={committeeChecked}
                        onChange={handleCommitteeChecked}
                        label="คณะกรรมการ" />
                    <Form.Check
                        type="checkbox"
                        checked={itChecked}
                        label="ช่างซ่อมคอมพิวเตอร์และอุปกรณ์" />
                    <Form.Check
                        type="checkbox"
                        checked={electricityChecked}
                        label="ช่างซ่อมไฟฟ้า" />
                    <Form.Check
                        type="checkbox"
                        checked={plumblingChecked}
                        label="ช่างซ่อมประปา" />
                    <Form.Check
                        type="checkbox"
                        checked={elevatorChecked}
                        label="ช่างซ่อมลิฟท์" />
                    <Form.Check
                        type="checkbox"
                        checked={acChecked}
                        label="ช่างซ่อมเครื่องปรับอากาศ" />
                    <Form.Check
                        type="checkbox"
                        checked={tableChairChecked}
                        label="ช่างซ่อมโต๊ะ เก้าอี้" />
                    <Form.Check
                        type="checkbox"
                        checked={buildingChecked}
                        label="ช่างซ่อมอาคารสถานที่" />
                    <Form.Check
                        type="checkbox"
                        checked={othersChecked}
                        label="ช่างซ่อมอื่นๆ" />
                    <Form.Check
                        type="checkbox"
                        checked={prasarnmitChecked}
                        label="ประสานมิตร" />
                    <Form.Check
                        type="checkbox"
                        checked={ongkhalakChecked}
                        label="องครักษ์" />
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