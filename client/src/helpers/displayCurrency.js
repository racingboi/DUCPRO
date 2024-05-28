const displayVNDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('vn',{
        style : "currency",
        currency : 'VND',
        minimumFractionDigits : 2
    })

    return formatter.format(num)
}

export default displayVNDCurrency