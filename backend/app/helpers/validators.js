 const validator = require('validator');

 const emailValidator = (email)=>{
    return validator.isEmail(email)
 }

 const passwordvalidator = (password)=>{
    return (
        password.length >= 10 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
      );
 }


module.exports = {
    emailValidator,
    passwordvalidator
}