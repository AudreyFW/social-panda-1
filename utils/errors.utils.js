module.exports.signUpErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

  if (err.message.includes("username"))
    errors.username = "Username is incorrect or already taken";

  if (err.message.includes("email")) errors.email = "Email is incorrect";

  if (err.message.includes("password"))
    errors.password = "Password must be at leat 6 characters";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
    errors.username = "Username is already taken";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email is already in use";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) {
    errors.email = "Email is unknown ";
  }
  if (err.message.includes("password")) {
    errors.password = "Password does not match";
  }
  return errors;
};


module.exports.uploadErrors=(err)=>{
  let errors= { format: '', maxSize: ''};

  if(err.message.includes('invalid file')){
    errors.format = 'invalid format'
  }

  if(err.message.includes('no files were upload')){
    errors.format='no files upload'
  }

  if(err.message.includes('max size')){
    errors.maxSize = "File exceeds 500k";
  }
  return errors;
}