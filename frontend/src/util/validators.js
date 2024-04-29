export function lenRequirement(password) {
    return password.length >= 8
}

export function letterRequirement(password) {
    var letterRegex = /[a-zA-Z]/; // At least one letter
    return letterRegex.test(password)
}

export function numberRequirement(password) {
    var numberRegex = /[0-9]/;
    return numberRegex.test(password)
}

export function specialCharRequirement(password) {
    var specialCharRegex = /[^a-zA-Z0-9]/; // At least one special character (not alphanumeric)
    return specialCharRegex.test(password)
}