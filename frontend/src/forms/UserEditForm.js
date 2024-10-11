import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const UserEditForm = ({handleSubmit, handleChange, inputs, setInputs}) => {
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
    const [ongkharakChecked, setOngkharakChecked] = useState(false);

    const [visitorChecked, setVisitorChecked] = useState(false);

    
    useEffect(() => {
        //console.log('inputs is changed.');
        if(inputs.role){
            setTypeInput(inputs.role)
            setAdminChecked(inputs.role.includes('admin'));
            setCommitteeChecked(inputs.role.includes('committee'));
            setITChecked(inputs.role.includes('คอมพิวเตอร์และอุปกรณ์'));
            setElectricityChecked(inputs.role.includes('ไฟฟ้า'));
            setPlumblingChecked(inputs.role.includes('ประปา'));
            setElevatorChecked(inputs.role.includes('ลิฟท์'));
            setACChecked(inputs.role.includes('เครื่องปรับอากาศ'));
            setTableChairChecked(inputs.role.includes('โต๊ะ เก้าอี้'));
            setBuildingChecked(inputs.role.includes('อาคารสถานที่'));
            setOthersChecked(inputs.role.includes('อื่นๆ'));
            setPrasarnmitChecked(inputs.role.includes('ประสานมิตร'));
            setOngkharakChecked(inputs.role.includes('องครักษ์'));
            setVisitorChecked(inputs.role.includes('visitor'));
        }
    }, [inputs.oldrole]);

    // HANDLE CHECKBOXES
    const handleAdminChecked = async () => {
        setAdminChecked(!adminChecked);
    };
    const handleCommitteeChecked = async () => {
        setCommitteeChecked(!committeeChecked);
    };
    const handleITChecked = async () => {
        
        setITChecked(!itChecked);
    };
    const handleElectricityChecked = async () => {
        setElectricityChecked(!electricityChecked);
    };
    const handlePlumblingChecked = async () => {
        setPlumblingChecked(!plumblingChecked);
    };
    const handleElevatorChecked = async () => {
        setElevatorChecked(!elevatorChecked);
    };
    const handleACChecked = async () => {
        setACChecked(!acChecked);
    };
    const handleTableChairChecked = async () => {
        setTableChairChecked(!tableChairChecked);
    };
    const handleBuildingChecked = async () => {
        setBuildingChecked(!buildingChecked);
    };
    const handleOthersChecked = async () => {
        setOthersChecked(!othersChecked);
    };
    const handlePrasarnmitChecked = async () => {
        setPrasarnmitChecked(!prasarnmitChecked);
    };
    const handleongkharakChecked = async () => {
        setOngkharakChecked(!ongkharakChecked);
    };
    const handleVisitorChecked = async () => {
        setVisitorChecked(!visitorChecked);
    };

    useEffect(() => {
        //console.log('adminChecked is changed.');
        setTypeInputEffect('admin', adminChecked)
    }, [adminChecked])
  
    useEffect(() => {
        //console.log('committeeChecked is changed.');
        setTypeInputEffect('committee', committeeChecked)
    }, [committeeChecked])

    useEffect(() => {
        //console.log('itChecked is changed.');
        setTypeInputEffect('คอมพิวเตอร์และอุปกรณ์', itChecked)
    }, [itChecked])

    useEffect(() => {
        //console.log('electricityChecked is changed.');
        setTypeInputEffect('ไฟฟ้า', electricityChecked)
    }, [electricityChecked])
    
    useEffect(() => {
        //console.log('plumblingChecked is changed.');
        setTypeInputEffect('ประปา', plumblingChecked)
    }, [plumblingChecked])

    useEffect(() => {
        //console.log('elevatorChecked is changed.');
        setTypeInputEffect('ลิฟท์', elevatorChecked)
    }, [elevatorChecked])

    useEffect(() => {
        //console.log('acChecked is changed.');
        setTypeInputEffect('เครื่องปรับอากาศ', acChecked)
    }, [acChecked])

    useEffect(() => {
        //console.log('tableChairChecked is changed.');
        setTypeInputEffect('โต๊ะ เก้าอี้', tableChairChecked)
    }, [tableChairChecked])

    useEffect(() => {
        //console.log('electricityChecked is changed.');
        setTypeInputEffect('อาคารสถานที่', buildingChecked)
    }, [buildingChecked])

    useEffect(() => {
        //console.log('othersChecked is changed.');
        setTypeInputEffect('อื่นๆ', othersChecked)
    }, [othersChecked])

    useEffect(() => {
        //console.log('prasarnmitChecked is changed.');
        setTypeInputEffect('ประสานมิตร', prasarnmitChecked)
    }, [prasarnmitChecked])

    useEffect(() => {
        //console.log('ongkharakChecked is changed.');
        setTypeInputEffect('องครักษ์', ongkharakChecked)
    }, [ongkharakChecked])

    useEffect(() => {
        //console.log('visitorChecked is changed.');
        setTypeInputEffect('visitor', visitorChecked)
    }, [visitorChecked])

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

    useEffect(() => {
        //console.log('typeInput is changed.');
        console.log(typeInput);
        setInputs(values => ({...values, role: typeInput}));
    }, [typeInput])

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
                        onChange={handleITChecked}
                        label="ช่างซ่อมคอมพิวเตอร์และอุปกรณ์" />
                    <Form.Check
                        type="checkbox"
                        checked={electricityChecked}
                        onChange={handleElectricityChecked}
                        label="ช่างซ่อมไฟฟ้า" />
                    <Form.Check
                        type="checkbox"
                        checked={plumblingChecked}
                        onChange={handlePlumblingChecked}
                        label="ช่างซ่อมประปา" />
                    <Form.Check
                        type="checkbox"
                        checked={elevatorChecked}
                        onChange={handleElevatorChecked}
                        label="ช่างซ่อมลิฟท์" />
                    <Form.Check
                        type="checkbox"
                        checked={acChecked}
                        onChange={handleACChecked}
                        label="ช่างซ่อมเครื่องปรับอากาศ" />
                    <Form.Check
                        type="checkbox"
                        checked={tableChairChecked}
                        onChange={handleTableChairChecked}
                        label="ช่างซ่อมโต๊ะ เก้าอี้" />
                    <Form.Check
                        type="checkbox"
                        checked={buildingChecked}
                        onChange={handleBuildingChecked}
                        label="ช่างซ่อมอาคารสถานที่" />
                    <Form.Check
                        type="checkbox"
                        checked={othersChecked}
                        onChange={handleOthersChecked}
                        label="ช่างซ่อมอื่นๆ" />
                    <Form.Check
                        type="checkbox"
                        checked={prasarnmitChecked}
                        onChange={handlePrasarnmitChecked}
                        label="ประสานมิตร" />
                    <Form.Check
                        type="checkbox"
                        checked={ongkharakChecked}
                        onChange={handleongkharakChecked}
                        label="องครักษ์" />
                    <Form.Check
                        type="checkbox"
                        checked={visitorChecked}
                        onChange={handleVisitorChecked}
                        label="ผู้ใช้ทั่วไป" />
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