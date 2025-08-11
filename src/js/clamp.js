export default function clamp(lower, number, upper) {
    return Math.min(Math.max(number, lower), upper);
}
