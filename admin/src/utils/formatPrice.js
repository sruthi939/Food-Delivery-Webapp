export const formatPrice = (price) => {
    const num = typeof price === 'number' ? price : parseFloat(price) || 0;
    return `$${num.toFixed(2)}`;
};
