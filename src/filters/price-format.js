//to formate prices over 1000 UAH; it will separate thousands from hundreds in this way "1 000"
export default function formattedPrice(value) {
    let parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}