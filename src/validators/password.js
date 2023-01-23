exports.hasNumber = (value) =>{
    return (/\d/.test(value))? true:false;
}

exports.hasLowerCase = (value) =>{
    return (/[a-z]/.test(value)) ? true : false;
}

exports.hasUpparCase = (value) =>{
    return (/[A-Z]/.test(value)) ? true : false;
}

exports.hasSpecial = (value) =>{
    return (/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(value)) ? true : false;
}