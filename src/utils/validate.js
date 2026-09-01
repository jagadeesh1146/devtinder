const validateSignup = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First-name & last-name is required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  return true;
};


const validateProfileEditData=(req)=>{
  const editedFields = ["firstName" , "lastName", "about", "skills"]

  const isEdited = Object.keys(req.body).every((field)=>editedFields.includes(field)) 
  return isEdited


}

module.exports = {validateSignup , validateProfileEditData }