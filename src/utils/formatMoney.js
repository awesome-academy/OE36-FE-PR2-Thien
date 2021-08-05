export default function formatMoney(price) {
    return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}