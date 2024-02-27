import { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";

const RiskReportForm = ({handleSubmit, inputs, handleChange, setInputs}) => {

    // INPUTS
    const [riskChecked, setRiskChecked] = useState(false);
    const [maChecked, setMaChecked] = useState(false);
    const [typeInput, setTypeInput] = useState([]);

    const [subTypeInput, setSubTypeInput] = useState(true);
    const [detailInput, setDetailInput] = useState(true)
    const [locationInput, setLocationInput] = useState(true);
    const [floorsInput, setFloorsInput] = useState(true);
    const [placesInput, setPlacesInput] = useState(true);
    const [levelInput, setLevelInput] = useState(true);
    const [imageInput, setImageInput] = useState(true);
    const [submitButton, setSubmitButton] = useState(true);
    const [imageUrl, setImageUrl] = useState('');

    

    // HANDLE CHECKBOXES
    const handleRiskChecked = async () => {
        setRiskChecked(!riskChecked);
    }

    const handleMaChecked = async () => {
        setMaChecked(!maChecked);
    }

    useEffect(() => {
        setTypeInputEffect('risk', riskChecked)
    }, [riskChecked])

    useEffect(() => {
        setTypeInputEffect('ma', maChecked)
    }, [maChecked])

    useEffect(() => {
        setInputs(values => ({...values, type: typeInput}));
    }, [typeInput])

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

    /* HANDLE TYPE INPUT */
    useEffect(() => {
        setSubTypeInput((inputs.type && inputs.type.length > 0) ? false : true)
        setDetailInput((inputs.type && inputs.type.length > 0) ? detailInput : true)
        setLocationInput((inputs.type && inputs.type.length > 0) ? locationInput : true)
        setFloorsInput((inputs.type && inputs.type.length > 0) ? floorsInput : true)
        setPlacesInput((inputs.type && inputs.type.length > 0) ? placesInput : true)
        setLevelInput((inputs.type && inputs.type.length > 0) ? inputs.type.includes('risk') ? inputs.places ? false : true : true : true)
        setImageInput((inputs.type && inputs.type.length > 0) ? inputs.type.includes('risk') ? inputs.level ? false : true : inputs.places ? false : true : true)
        setSubmitButton((inputs.type && inputs.type.length > 0) ? inputs.type.includes('risk') ? inputs.level ? false : true : inputs.places ? false : true : true)
        setInputs((inputs.type && inputs.type.length > 0) ? (!inputs.type.includes('risk')) ? {
            type: inputs.type,
            subtype: inputs.subtype,
            detail: inputs.detail,
            location: inputs.location,
            floors: inputs.floors,
            places: inputs.places,
        } : inputs :  {
            type: inputs.type,
        })
    }, [inputs.type])

    /* HANDLE SUB-TYPE INPUT */
    useEffect(() => {
        setDetailInput((inputs.subtype && inputs.subtype !== '0') ? false : true)
        setLocationInput((inputs.subtype && inputs.subtype !== '0') ? locationInput : true)
        setFloorsInput((inputs.subtype && inputs.subtype !== '0') ? floorsInput : true)
        setPlacesInput((inputs.subtype && inputs.subtype !== '0') ? placesInput : true)
        setLevelInput((inputs.subtype && inputs.subtype !== '0') ? levelInput : true)
        setImageInput((inputs.subtype && inputs.subtype !== '0') ? imageInput : true)
        setSubmitButton((inputs.subtype && inputs.subtype !== '0') ? submitButton : true)
        setInputs((inputs.subtype && inputs.subtype !== '0') ? inputs : {
            type: inputs.type,
            subtype: inputs.subtype
        })
    }, [inputs.subtype])

    /* HANDLE DETAIL INPUT */
    useEffect(() => {
        setLocationInput(inputs.detail ? false : true)
        setFloorsInput(inputs.detail ? floorsInput : true)
        setPlacesInput(inputs.detail ? placesInput : true)
        setLevelInput(inputs.detail ? levelInput : true)
        setImageInput(inputs.detail ? imageInput : true)
        setSubmitButton(inputs.detail ? submitButton : true)
        setInputs(inputs.detail ? inputs : {
            type: inputs.type,
            subtype: inputs.subtype,
            detail: inputs.detail
        })
    }, [inputs.detail])

    /* HANDLE LOCATION INPUT */
    useEffect(() => {
        setFloorsInput((inputs.location && inputs.location !== '0') ? false : true)
        setPlacesInput((inputs.location && inputs.location !== '0') ? placesInput : true)
        setLevelInput((inputs.location && inputs.location !== '0') ? levelInput : true)
        setImageInput((inputs.location && inputs.location !== '0') ? imageInput : true)
        setSubmitButton((inputs.location && inputs.location !== '0') ? submitButton : true)
        setInputs((inputs.location && inputs.location !== '0') ? inputs : {
            type: inputs.type,
            subtype: inputs.subtype,
            detail: inputs.detail,
            location: inputs.location
        })
    }, [inputs.location])

    /* HANDLE FLOORS INPUT */
    useEffect(() => {
        setPlacesInput((inputs.floors && inputs.floors !== '0') ? false : true)
        setLevelInput((inputs.floors && inputs.floors !== '0') ? levelInput : true)
        setImageInput((inputs.floors && inputs.floors !== '0') ? imageInput : true)
        setSubmitButton((inputs.floors && inputs.floors !== '0') ? submitButton : true)
        setInputs((inputs.floors && inputs.floors !== '0') ? inputs : {
            type: inputs.type,
            subtype: inputs.subtype,
            detail: inputs.detail,
            location: inputs.location,
            floors: inputs.floors,
        })
    }, [inputs.floors])

    /* HANDLE PLACES INPUT */
    useEffect(() => {
        setLevelInput((inputs.places && inputs.places !== '0') ? (inputs.type.includes('risk')) ? false : true : true)
        setImageInput((inputs.places && inputs.places !== '0') ? (inputs.type.includes('risk')) ? imageInput : false : true)
        setSubmitButton((inputs.places && inputs.places !== '0') ? ((inputs.type.includes('risk'))) ? submitButton : false : true)
        setInputs((inputs.places && inputs.places !== '0') ? inputs : {
            type: inputs.type,
            subtype: inputs.subtype,
            detail: inputs.detail,
            location: inputs.location,
            floors: inputs.floors,
            places: inputs.places,
        })
    }, [inputs.places])

    /* HANDLE LEVEL INPUT */
    useEffect(() => {
        setImageInput((inputs.level && inputs.level !== '0') ? false : true)
        setSubmitButton((inputs.level && inputs.level !== '0') ? false : true)
        setInputs((inputs.level && inputs.level !== '0') ? inputs : {
            type: inputs.type,
            subtype: inputs.subtype,
            detail: inputs.detail,
            location: inputs.location,
            floors: inputs.floors,
            places: inputs.places,
            level: inputs.level,
        })
    }, [inputs.level])


    /* HANDLE PREVIEW IMAGE */
    useEffect(() => {
        if(inputs.imagefile){
            const url = URL.createObjectURL(inputs.imagefile)
            setImageUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [inputs.imagefile])

    return(
        <Container className="p-3 border rounded">
            <h1 className="m-0 text-center">รายงานความเสี่ยง</h1>
            <div className="text-end">
                <div id="form-asterisk" className="p">*</div> = จำเป็นต้องกรอกข้อมูล
            </div>
            <Form onSubmit={handleSubmit}>
                
                {/* TYPE CHECKBOXES */}
                <Form.Group className="mt-3">
                    <Form.Label>
                        ประเภทการรายงาน<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Check
                        type="checkbox"
                        checked={riskChecked}
                        onChange={handleRiskChecked}
                        label="รายงานความเสี่ยง" />
                    <Form.Check
                        type="checkbox"
                        onChange={handleMaChecked}
                        checked={maChecked}
                        label="รายงานแจ้งซ่อม" />
                </Form.Group>

                {/* SUB-TYPE INPUT */}
                <Form.Group className="mt-3">
                    <Form.Label>
                        ประเภทของความเสี่ยง<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Select
                        name="subtype"
                        value={inputs.subtype || ''} 
                        onChange={handleChange}
                        disabled={subTypeInput} >
                        <option value={0}>-- ประเภท --</option>
                        <option>คอมพิวเตอร์/อุปกรณ์</option>
                        <option>ไฟฟ้า</option>
                        <option>ประปา</option>
                        <option>ลิฟท์</option>
                        <option>เครื่องปรับอากาศ</option>
                        <option>โต๊ะ เก้าอี้</option>
                        <option>อาคารสถานที่</option>
                        <option>อื่น ๆ</option>
                    </Form.Select>
                </Form.Group>

                {/* DETAIL INPUT */}
                <Form.Group className="mt-3">
                    <Form.Label>
                        รายละเอียดความเสี่ยง<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Control 
                    name="detail" 
                    type="text" 
                    as="textarea"
                    value={inputs.detail || ''}
                    disabled={detailInput}
                    onChange={handleChange} />
                </Form.Group>

                {/* LOCATION INPUT */}
                <Form.Group className="mt-3">
                    <Form.Label>
                        อาคาร<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Select 
                        name="location" 
                        value={inputs.location || '' }
                        onChange={handleChange}
                        disabled={locationInput}>
                        <option value={0}>-- อาคาร --</option>
                        <option>ประสานมิตร</option>
                        <option>องครักษ์</option>
                    </Form.Select>
                </Form.Group>

                {/* FLOORS INPUT */}
                <Form.Group className="mt-3">
                    <Form.Label>
                        ชั้น<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Select 
                        name="floors" 
                        value={inputs.floors || ''}
                        onChange={handleChange}
                        disabled={floorsInput}>
                        <option value='0'>-- ชั้น --</option>
                        {
                            (inputs.location && inputs.location !== '0') && (
                                <>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                </>
                        )}
                    </Form.Select>
                </Form.Group>

                {/* PLACES INPUT */}
                <Form.Group className="mt-3">
                    <Form.Label>
                        ห้อง / จุดที่พบความเสี่ยง<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Control 
                        name="places" 
                        type='text'
                        value={inputs.places || ''}
                        onChange={handleChange}
                        disabled={placesInput} />
                </Form.Group>

                {/* LEVEL INPUT */}
                <Form.Group className="mt-3">
                    <Form.Label>
                        ระดับความเสี่ยง<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Select 
                        name="level" 
                        value={inputs.level || ''}
                        onChange={handleChange}
                        disabled={levelInput}>
                        <option value='0'>-- ระดับ --</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Select>
                </Form.Group>

                {/* IMAGE INPUT */}
                <Form.Group className="mt-3">
                    <Form.Label>ไฟล์ภาพประกอบ (ถ้ามี)</Form.Label>
                    <Form.Control
                        name="image"
                        type="file"
                        value={inputs.image || ''}
                        onChange={handleChange}
                        accept="image/*"
                        disabled={imageInput} />
                        {
                            /* PREVIEW */
                            inputs.image && (
                                <Container className="text-center mt-3 p-3">
                                    <Image 
                                        id="preview"
                                        src={imageUrl}
                                        height={'800px'}
                                        fluid />
                                </Container>
                        )}
                </Form.Group>

                {/* SUBMIT BUTTON */}
                <div className="d-grid mt-3">
                    <Button 
                        type="submit"
                        disabled={submitButton}>
                        บันทึก
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default RiskReportForm;