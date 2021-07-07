//to round the number to 2 decimal places
export default function toFix(value) {
    value = parseFloat(value);
    return value.toFixed(2) + " ₴";
}