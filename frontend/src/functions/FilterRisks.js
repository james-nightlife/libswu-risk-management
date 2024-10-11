const FilterRisks = (raw, inputs) => {
    return raw.filter(obj => {
        const subtypeFilter = (
          obj.sub_type === inputs.subtype || !inputs.subtype
        )

        const locationFilter = (
          obj.location === inputs.location || !inputs.location
        );

        const statusFilter = (
          (inputs.status !== 'รอดำเนินการ') ? 
          (((obj.risk_status.length > 0 && obj.risk_status[obj.risk_status.length - 1].status === inputs.status) || !inputs.status)) :
          (((obj.risk_status.length > 0 && obj.risk_status[obj.risk_status.length - 1].status === inputs.status) || !inputs.status))
        );

        const maStatusFilter = (
          (inputs.ma_status !== 'รอดำเนินการ') ? (
            ((obj.ma_status.length > 0 && obj.ma_status[obj.ma_status.length - 1].status === inputs.ma_status) || !inputs.ma_status)
          ) :
          ( 
            ((obj.ma_status.length > 0 && obj.ma_status[obj.ma_status.length - 1].status === inputs.ma_status) || !inputs.ma_status)
          )
        );

        const firstDateFilter = (
          new Date(obj.createdAt).getTime() >= new Date(inputs.firstdate).getTime() || !inputs.firstdate
        );

        const lastDateFilter = (
          new Date(obj.createdAt).getTime() <= new Date(`${inputs.enddate} 23:59:59`).getTime() || !inputs.enddate
        );

        const keywordFilter = (
          !inputs.keyword || (
            obj.detail.toLowerCase().includes(inputs.keyword.toLowerCase()) ||
            obj.reporter.toLowerCase().includes(inputs.keyword.toLowerCase())
            )
        );

        return(
            subtypeFilter &&
            locationFilter && 
            statusFilter && 
            maStatusFilter &&
            firstDateFilter && 
            lastDateFilter && 
            keywordFilter
        );
    });
}

export {FilterRisks};