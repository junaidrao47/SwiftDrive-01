exports.validateEmail = (email) => {
    const regex = /^[\w-.]+@[\w-]+\.[a-z]{2,7}$/i;
    return regex.test(email);
};

exports.validatePassword = (password) => {
    return password.length >= 6;
};