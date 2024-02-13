const UploadImageRequest = async (inputs) => {
    const formData = new FormData();
    formData.append('file', inputs.image);
    return fetch(`${process.env.REACT_APP_UPLOAD_SERVER}/risk/upload`, {
        method: 'POST', 
        body: formData
    }).then(async (res) => {
        const status = res.status;
        const data = await res.json();
        if(status === 200){
            return (data.filename)
        }
    })
}

export {UploadImageRequest}