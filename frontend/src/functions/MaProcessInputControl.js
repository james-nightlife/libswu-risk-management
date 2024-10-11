const MaProcessInputControl = (subtype) => {
    const role = sessionStorage.getItem('role').split(',');
    if(
        role.includes('admin') ||
        role.includes(subtype)
    ){
        return(false)
    }else{
        return(true)
    }
}

export { MaProcessInputControl }