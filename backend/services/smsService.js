export const sendSMS = async (phoneNumber, message) => {
    console.log(`[SMS Service] Sending SMS to ${phoneNumber}: ${message}`);
    return true;
};
