export const generateInvoiceData = (order) => {
    return {
        invoiceNumber: `INV-${Date.now()}`,
        orderId: order._id || order.id,
        date: new Date(order.createdAt || Date.now()).toLocaleDateString(),
        customer: order.address?.firstName ? `${order.address.firstName} ${order.address.lastName}` : "Customer",
        items: order.items || [],
        amount: order.amount,
        status: order.status || "Paid"
    };
};
