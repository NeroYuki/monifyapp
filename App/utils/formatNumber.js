
var format = 'VND'

export function initFormat() {
    
}

export function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'
};

export function percentageFormat(num) {
    return num.toFixed(1)
}