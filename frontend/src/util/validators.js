export function lenRequirement(password) {
    return password.length >= 8
}

export function letterRequirement(password) {
    const letterRegex = /[a-zA-Z]/; // At least one letter
    return letterRegex.test(password)
}

export function numberRequirement(password) {
    const numberRegex = /[0-9]/;
    return numberRegex.test(password)
}

export function specialCharRequirement(password) {
    const specialCharRegex = /[^a-zA-Z0-9]/; // At least one special character (not alphanumeric)
    return specialCharRegex.test(password)
}

export function emailValidator(email) {
    const emailValidationRegex = /^\S+@\S+\.\S+$/;
    return emailValidationRegex.test(email)
}