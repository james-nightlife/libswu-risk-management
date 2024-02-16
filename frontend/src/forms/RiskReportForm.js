import { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";

const RiskReportForm = ({handleSubmit, inputs, handleChange, setInputs}) => {
    const [locationInput, setLocationInput] = useState(true);
    const [floorsInput, setFloorsInput] = useState(true);
    const [placesInput, setPlacesInput] = useState(true);
    const [levelInput, setLevelInput] = useState(true);
    const [imageInput, setImageInput] = useState(true);
    const [submitButton, setSubmitButton] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    
    useEffect(() => {
        setLocationInput(inputs.detail ? false : true)
        setFloorsInput(inputs.detail ? floorsInput : true)
        setPlacesInput(inputs.detail ? placesInput : true)
        setLevelInput(inputs.detail ? levelInput : true)
        setImageInput(inputs.detail ? imageInput : true)
        setSubmitButton(inputs.detail ? submitButton : true)
        setInputs(inputs.detail ? inputs : {detail: inputs.detail})
    }, [inputs.detail])

    useEffect(() => {
        setFloorsInput((inputs.location && inputs.location !== '0') ? false : true)
        setPlacesInput((inputs.location && inputs.location !== '0') ? placesInput : true)
        setLevelInput((inputs.location && inputs.location !== '0') ? levelInput : true)
        setImageInput((inputs.location && inputs.location !== '0') ? imageInput : true)
        setSubmitButton((inputs.location && inputs.location !== '0') ? submitButton : true)
        setInputs((inputs.location && inputs.location !== '0') ? inputs : {
            detail: inputs.detail,
            location: inputs.location
        })
    }, [inputs.location])

    useEffect(() => {
        setPlacesInput((inputs.floors && inputs.floors !== '0') ? false : true)
        setLevelInput((inputs.floors && inputs.floors !== '0') ? levelInput : true)
        setImageInput((inputs.floors && inputs.floors !== '0') ? imageInput : true)
        setSubmitButton((inputs.floors && inputs.floors !== '0') ? submitButton : true)
        setInputs((inputs.floors && inputs.floors !== '0') ? inputs : {
            detail: inputs.detail,
            location: inputs.location,
            floors: inputs.floors,
        })
    }, [inputs.floors])

    useEffect(() => {
        setLevelInput((inputs.places && inputs.places !== '0') ? false : true)
        setImageInput((inputs.places && inputs.places !== '0') ? imageInput : true)
        setSubmitButton((inputs.places && inputs.places !== '0') ? submitButton : true)
        setInputs((inputs.places && inputs.places !== '0') ? inputs : {
            detail: inputs.detail,
            location: inputs.location,
            floors: inputs.floors,
            places: inputs.places,
        })
    }, [inputs.places])

    useEffect(() => {
        setImageInput((inputs.level && inputs.level !== '0') ? false : true)
        setSubmitButton((inputs.level && inputs.level !== '0') ? false : true)
        setInputs((inputs.level && inputs.level !== '0') ? inputs : {
            detail: inputs.detail,
            location: inputs.location,
            floors: inputs.floors,
            places: inputs.places,
            level: inputs.level,
        })
    }, [inputs.level])

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
                <Form.Group className="mt-3">
                    <Form.Label>
                        รายละเอียดความเสี่ยง<div id="form-asterisk" className="p">*</div>
                    </Form.Label>
                    <Form.Control 
                    name="detail" 
                    type="text" 
                    as="textarea"
                    value={inputs.detail || ''}
                    onChange={handleChange} />
                </Form.Group>

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