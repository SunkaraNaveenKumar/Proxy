const users = require("../models/users");
const mongoose = require("mongoose");
const { findByIdAndUpdate } = require("./admins");
const Schema = mongoose.Schema;
const userProfileSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name Required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Inavlid UserId"],
    },
    address: {
      type: String,
      required: [true, "Current Address Required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number Required"],
    },
    adharImages: {
      type: [{}],
      
    },
    panImages: {
      type: [{}],
   
    },
    isSaved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userProfileSchema.statics.addProfile = async function (req, res) {
  const userProfiles = this;
  // console.log("userProfiles",userProfiles)
  try {
    const profile = await userProfiles.findById(req.user.profileId);
    // console.log("profile",profile)

    if (profile) {
      throw new Error("Account details already exist in the database");
    } else {
        const body = req.body 
        // console.log('files',req.files)
        body.userId = req.user._id
        body.adharImages= req.files["adhar"]
        body.panImages = req.files["pan"]
      const addNewProfile = await new userProfiles(body).save();
      // console.log("addNewProfile", addNewProfile);
      if (addNewProfile) {
        const updateUser = await users.findByIdAndUpdate(
          req.user._id,
          { profileId: addNewProfile._id },
          { new: true, runValidators: true }
        );
        // console.log("updateUser", updateUser);
        return Promise.resolve({
          updatedUser: updateUser,
          userProfile: addNewProfile,
        });
      } else {
        throw new Error("Failed to create a new profile");
      }
    }
  } catch (err) {
    return Promise.reject({errors:err.message});
  }
};
const userProfiles = mongoose.model("userProfiles", userProfileSchema);

module.exports = userProfiles;
