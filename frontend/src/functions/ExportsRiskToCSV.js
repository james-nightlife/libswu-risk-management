import { DateToDatetime } from "./DateToDatetime";

const ExportRisksToCSV = (data) => {
    const newdata = [];
    for(var i = 0; i < data.length; i++){
        newdata.push({
            id: data[i].id,
            detail: data[i].detail,
            type: data[i].sub_type,
            location: data[i].location,
            floors: data[i].floors,
            places: data[i].places,
            reporter: data[i].reporter,
            risk_status: ((data[i].risk_status && data[i].risk_status.length > 0) && data[i].risk_status[data[i].risk_status.length - 1].status),
            risk_comment: ((data[i].risk_status && data[i].risk_status.length > 0) && data[i].risk_status[data[i].risk_status.length - 1].comment),
            risk_user: ((data[i].risk_status && data[i].risk_status.length > 0) && data[i].risk_status[data[i].risk_status.length - 1].user),
            risk_update_date: ((data[i].risk_status && data[i].risk_status.length > 0) && DateToDatetime(data[i].risk_status[data[i].risk_status.length - 1].date)),
            risk_initialized_date: DateToDatetime(data[i].risk_initialized_date),
            risk_finalized_date: DateToDatetime(data[i].risk_finalized_date),
            ma_status: ((data[i].ma_status && data[i].ma_status.length > 0) && data[i].ma_status[data[i].ma_status.length - 1].status),
            ma_comment: ((data[i].ma_status && data[i].ma_status.length > 0) && data[i].ma_status[data[i].ma_status.length - 1].comment),
            ma_user: ((data[i].ma_status && data[i].ma_status.length > 0) && data[i].ma_status[data[i].ma_status.length - 1].user),
            ma_update_date: ((data[i].ma_status && data[i].ma_status.length > 0) && DateToDatetime(data[i].ma_status[data[i].ma_status.length - 1].date)),
            ma_initialized_date: DateToDatetime(data[i].ma_initialized_date),
            ma_finalized_date: DateToDatetime(data[i].ma_finalized_date),
            createdAt: DateToDatetime(data[i].createdAt),
        })
    }
    return newdata;
}

export {ExportRisksToCSV}