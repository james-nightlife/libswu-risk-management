const dateToDateTime = (data) => {
    if(data){
        const date = new Date(data);
        return(date.toLocaleString('th-th'));
    }else{
        return('');
    }
    
    
}

const findUser = (data) => {

}


module.exports = {dateToDateTime, findUser}