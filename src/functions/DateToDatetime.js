const DateToDatetime = (data) => {
    if(data){
        const date = new Date(data);
        return(date.toLocaleString('th-th'));
    }else{
        return('');
    }
}

export {DateToDatetime};