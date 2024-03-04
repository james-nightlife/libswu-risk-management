const MaProcessInputControl = async (subtype) => {
    const role = sessionStorage.getItem('role');
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