const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;
const { emailValidator, passwordvalidator } = require('../helpers/validators')
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validate: [emailValidator, "Invalid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    validate: [passwordvalidator, "password must have atleast One Capital Number,One small number, Symbol, number and length should be atleast 10 charecters"]
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  role: {
    type: String,
    default: "user"
  },
  profileId: {
    type: Schema.Types.ObjectId,
    ref: 'userProfiles'
  },
  courses: {
    type: [Schema.Types.ObjectId],

  }
}, { timestamps: true });
const hashPassword = async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
}
userSchema.pre("save", hashPassword);
userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.password) {
      // console.log(this)
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this._update.password, salt);
      this._update.password = hash;
    }
    next();
  } catch (err) {
    return next(err);
  }
});




const users = mongoose.model(
  "users",
  userSchema
);
module.exports = users