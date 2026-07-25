export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    return password && password.length >= 6;
};

export const validateRequired = (val) => {
    if (typeof val === 'string') return val.trim().length > 0;
    return val !== null && val !== undefined;
};
