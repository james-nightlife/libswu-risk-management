const DateToDatetime = (data, locale='th-th') => {
    if(data){
        const date = new Date(data);
        if(locale === 'csv'){
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes())
            const second = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds())
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        }else{
            return(date.toLocaleString(locale));
        }    
    }else{
        return('');
    }
}

export {DateToDatetime};