const RiskProcessInputControl = () => {
    const role = sessionStorage.getItem('role').split(',');
    if(
        role.includes('admin') ||
        role.includes('committee')
    ){
        return(false)
    }else{
        return(true)
    }
}

export {RiskProcessInputControl}