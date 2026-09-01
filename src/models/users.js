const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String
  },

  age: {
    type: Number,
    min: 18,
    max: 100
  },

  email: {
    type: String,
    required: true,
    unique: true,

    validate: function(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }

      return true;
    }
  },

  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum:{
      values : ["male","female","others"],
      message : `{VALUE} is not a valid gender`,
    },
  },
  about :{
    type : String,
  },
  skills :{
    type : [String],
  },
});

userSchema.methods.getJwt= function(){
  const user = this
  const token =  jwt.sign({_id : user._id}, "DEV$tinder",{"expiresIn" : "1d"})
  return token

}

userSchema.methods.validatePassword= async function(userPassword){

    return await bcrypt.compare(userPassword, this.password);
}

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;