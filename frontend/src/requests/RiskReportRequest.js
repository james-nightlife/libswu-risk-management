const RiskReportRequest = async (username, input, token) => {
    console.log(input)
    if(input.imagefile){
        const formData = new FormData();
        formData.append('file', input.imagefile);
        try{
            const uploadImageReq = await fetch(`${process.env.REACT_APP_UPLOAD_SERVER}/risk/upload`, {
                method: 'POST', 
                body: formData
            })
            
            if(uploadImageReq.status === 200){
                const uploadImageRes = await uploadImageReq.json();
                input.filename = uploadImageRes.filename
            }else{
                throw new Error('UploadImageError');
            }
        }catch(e){
            return({
                    status: 404,
                    message: 'เกิดเหตุขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
            })
        }
    }

    try{
        const insertReq = await fetch(`${process.env.REACT_APP_SERVER}/risk/record/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'lib-token': token,
            },
            body: JSON.stringify({
                reporter: username,
                type: input.type,
                sub_type: input.subtype,
                detail: input.detail, 
                location: input.location,
                floors: input.floors,
                places: input.places,
                level: input.level,
                image: input.filename,
                risk_status: (input.type.includes('รายงานความเสี่ยง') ?
                    [
                        {
                            date: new Date(),
                            status: 'รอดำเนินการ',
                            comment: 'รายงานความเสี่ยงเข้าระบบฯ แล้ว',
                            user: username,
                        },
                    ] : undefined),
                ma_status: (input.type.includes('รายงานแจ้งซ่อม') ?
                [
                    {
                        date: new Date(),
                        status: 'รอดำเนินการ',
                        comment: 'รายงานแจ้งซ่อมเข้าระบบฯ แล้ว',
                        user: username,
                    },
                ] : undefined),
            }),
        });

        const insertRes = await insertReq.json();
        if(insertReq.status === 200){

        }else if(insertRes.message === 'Token Invalid'){
            return({...insertRes,
                status: insertReq.status,
            });
        }else{
            throw new Error('InsertRiskDBError');
        }

    }catch(e){
        return({
                status: 404,
                message: 'เกิดเหตุขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
        })
    }

    if(input.type.includes('รายงานแจ้งซ่อม')){
        try{
            const insertMAReq = await fetch(`${process.env.REACT_APP_SERVER}/risk/record/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'lib-token': token,
                },
                body: JSON.stringify({
                    fac_id: (
                        input.location === 'ประสานมิตร' ? 1 : 
                        input.location === 'องครักษ์' && 2
                    ),
                    type_id: (
                        input.subtype === 'คอมพิวเตอร์และอุปกรณ์' ? 0 :
                        input.subtype === 'ไฟฟ้า' ? 1 :
                        input.subtype === 'ประปา' ? 2 :
                        input.subtype === 'ลิฟท์' ? 3 :
                        input.subtype === 'เครื่องปรับอากาศ' ? 4 :
                        input.subtype === 'โต๊ะ เก้าอี' ? 5 :
                        input.subtype === 'อาคารสถานที' ? 6 :
                        input.subtype === 'อื่นๆ' && 7 
    
                    ),
                    type: input.subtype,
                    tel: "",
                    repairtime: "0000-00-00",
                    fac: input.location,
                    flo: `${input.places} ชั้น ${input.floors}`,
                    detriment: `${input.detail}`,
                    uname: username,
                    fname: username,
                    today: "2024-03-21",
                    todaytime: "10:20:00",
                })
            });
    
            const insertMARes = await insertMAReq.json();
            if(insertMAReq.status === 200){
                return({...insertMARes,
                    status: insertMAReq.status,
                    message: 'ดำเนินการรายงานความเสี่ยงเรียบร้อยแล้ว',
                })
            }else if(insertMAReq.message === 'Token Invalid'){
                return({...insertMARes,
                    status: insertMAReq.status,
                });
            }else{
                throw new Error('InsertMADBError');
            }
    
        }catch(e){
            return({
                status: 404,
                message: 'เกิดเหตุขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
            })
        }
    }else{
        return({
            status: 200,
            message: 'ดำเนินการรายงานความเสี่ยงเรียบร้อยแล้ว',
        })
    }
    







    /*

    return fetch(`${process.env.REACT_APP_SERVER}/risk/record/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'lib-token': token,
        },
        body: JSON.stringify({
            input
        }),
    }).then(async (res) => {
        const status = res.status;
        const data = await res.json();
        if(status === 200){
            return ({...data,
                status: status,
                message: 'ดำเนินการรายงานความเสี่ยงเรียบร้อยแล้ว',
           });
        }else if(data.message === 'Token Invalid'){
            return ({...data,
                status: status,
           });
        }else{
            return ({...data,
                status: status,
                message: 'เกิดเหตุขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
           });
        }
    })
    .catch((data) => ({
        status: 404,
        message: 'เกิดเหตุขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
    }));
    */
}

export {RiskReportRequest};