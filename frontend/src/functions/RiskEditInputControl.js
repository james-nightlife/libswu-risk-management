const RiskEditInputControl = (risk) => {
    const role = sessionStorage.getItem('role');
    const username = sessionStorage.getItem('username');
    if(
        username === risk.reporter ||
        role.includes('admin')||
        role.includes('committee')
    ){
        return(false)
    }else{
        return(true)
    }
}

export {RiskEditInputControl};