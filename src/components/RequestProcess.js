/* รับ username และ password ส่งให้ api ตรวจสอบบัญชีผู้ใช้ */
async function loginUser(credentials){
    return fetch(`${process.env.REACT_APP_SERVER}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then((data) => (data.json()))
    .catch((data) => (({
        status: 404,
        message: `ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก`
    })))
}




// เพิ่มรายงานความเสี่ยง
async function submitRisk(input, token){
    return fetch(`${process.env.REACT_APP_SERVER}/risk/record/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'lib-token': token
        },
        body: JSON.stringify({
            ...input,
            report_date: new Date(),
            status: 'รอดำเนินการ'
        })
    }).then(async (data) =>  {
        const status = await data.status;
        const response = await data.json()
        if(status == 200){
            return ({...response,
                status: status,
                message: 'ดำเนินการรายงานความเสี่ยงเรียบร้อยแล้ว',
           })
        }else{
            return ({...response,
                status: status,
           })
        }
    })
    .catch((data) => ({
        status: 404,
        message: 'ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก'
    }))
}

// อัปเดตรายงานความเสี่ยง
async function updateRisk(input, id, token){
    return fetch(`${process.env.REACT_APP_SERVER}/risk/record/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'lib-token': token
        },
        body: JSON.stringify(input)
    }).then(async (data) =>  {
        const status = data.status;
        const response = await data.json()
        if(status == 200){
            return ({...response,
                status: status,
                message: 'ดำเนินการแก้ไขรายงานความเสี่ยงเรียบร้อยแล้ว',
           })
        }else{
            return ({...response,
                status: status,
           })
        }
    })
    /*
    .then(
        (data) => (data.json())
    )
    */
    .catch((data) => ({
        status: 'ok',
        message: 'ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก'
    }))
}

// ส่ง Request เพื่อแก้ไขข้อมูลความเสี่ยง
async function updateUser(input, id, token){
    console.log(input)
    return fetch(`${process.env.REACT_APP_SERVER}/user/record/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
            'lib-token': token,
        },
        body: JSON.stringify(input)
    }).then(async (data) =>  {
        const status = await data.status;
        const response = await data.json()
        return {...response,
             status: status
        }
    })
    /*.then((data) => {
        console.log(data);
        console.log(data.json())
    }) */
    .catch((data) => ({
        'status': 'ok',
        'message': 'ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก'
    }))
}

// ส่ง Request เพื่อประเมินความเสี่ยง
async function deleteRisk(token, id){
    return fetch(`${process.env.REACT_APP_SERVER}/risk/record/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'lib-token': token,
        },
    }).then(async (data) =>  {
        const status = await data.status;
        const response = await data.json()
        return {...response,
             status: status,
             message: 'ดำเนินการลบรายงานความเสี่ยงเรียบร้อยแล้ว',
        }
    })
    .catch((data) => ({
        status: 404,
        message: 'ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก'
    }))
}

module.exports = {submitRisk, 
    updateRisk, 
    updateUser,
    deleteRisk,
    loginUser
}