export const calculateOrderTotal = (items, deliveryFee = 2, taxPercentage = 0.05, discountAmount = 0) => {
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * taxPercentage;
    const grandTotal = Math.max(0, subtotal + deliveryFee + tax - discountAmount);
    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        deliveryFee,
        tax: parseFloat(tax.toFixed(2)),
        discountAmount,
        grandTotal: parseFloat(grandTotal.toFixed(2))
    };
};
