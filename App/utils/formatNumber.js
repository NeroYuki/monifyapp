import { fetchSetting } from "../logic/Screen-AppearanceSetting"

var format = 'VND'

export async function initFormat() {
    let res = await fetchSetting()
    if (res) {
        if (res.loaitien.includes('VND')) format = 'VND'
        else if (res.loaitien.includes('USD')) format = 'USD'
    }
}

export function currencyFormat(num) {
    if (format === 'VND')
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'
    else
        return '$ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

export function percentageFormat(num) {
    return num.toFixed(1)
}