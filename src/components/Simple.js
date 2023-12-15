const dateToDateTime = (data) => {
    const date = new Date(data)
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const min = date.getMinutes();
    return `${day}/${month}/${year} ${hour}.${min}`
}

const findUser = (data) => {

}


module.exports = {dateToDateTime, findUser}