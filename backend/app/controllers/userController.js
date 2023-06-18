const { tokenGeneration } = require("../helpers/tokenGeneration");
const users = require("../models/users");
const userProfiles = require("../models/userProfiles");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// const sendGridTransport = require("nodemailer-sendgrid-transport");
const userController = {};
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const courses = require("../models/courses");
const fetchFeilds = require("../helpers/fetchFeilds");
const lectures = require("../models/lectures");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; 
/////////////////////////////////
// const transporter = nodemailer.createTransport(
//   sendGridTransport({
//     auth: {
//       api_key:"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",
//     },
//   })
// );
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});
/////////////////////////////////////////// To register the user
userController.register = async (req, res) => {
  const { body } = req;
  try {
    // const user = await new users(body).save();
    const user = await new users(body).save();
    res.status(200).json({ isRegistered: true });
  } catch (err) {
    if (err["keyValue"]) {
      const errMessage = Object.keys(err["keyValue"]).includes("email");
      res.json({
        errors: errMessage
          ? "This email already exists"
          : "This username alredy exists",
      });
    } else {
      res.json(err);
    }
  }
};
///////////////////////////////////////////////// To Login the user
userController.login = async (req, res) => {
  const { body } = req;
  // console.log(process.env)
  try {
    const user = await users.findOne({ email: body.email });
    if (!user) {
      res.json({ errors: "Invalid Email or Password" });
    } else {
      const isValidPassword = await bcrypt.compare(
        body.password,
        user.password
      );
      if (isValidPassword) {
        const expiresIn = "1d";
        const token = tokenGeneration(user, req, expiresIn);
        res.json({ token: `Bearer ${token}` });
      } else {
        res.json({ errors: "Invalid Email or Password" });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

//////////////////////////////////////////////// to get the list of users
// userController.getAllUsers = (req, res) => {
//   users
//     .find()
//     .then((list) => {
//       res.status(200).json(list);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// };
//////////////////////////////// get all courses
userController.getAllCourses = async (req, res) => {
  try {
    const allCourses = await courses.find().sort({ createdAt: "descending" });
    res.json(
      fetchFeilds(allCourses, [
        "title",
        "description",
        "imageUrl",
        "price",
        "_id",
        "createdAt",
      ])
    );
  } catch (err) {
    res.json(err);
  }
};
/////////////////////////////////////////////////////// send forgot password link
userController.sendForgotPasswordLink = async (req, res) => {
  const { body } = req;
  let hostUrl = req.get("Referer")
    ? req.get("Referer")
    : process.env.CLIENT_URL;
  const nodeEnv = process.env.NODE_ENV;
  // if(nodeEnv === "development"){
  //    hostUrl = req.get("Referer");
  // }else if(nodeEnv === "production"){
  //   hostUrl =req.get('host')
  // }
  try {
    const user = await users.findOne({ email: body.email });
    if (!user) {
      res.json({ errors: "No Registere User with this email Please register" });
    } else {
      const expiresIn = "2m";
      const token = tokenGeneration(user, req, expiresIn);
      const link = `${hostUrl}user/resetpassword/${token}`;
      // console.log("link", link);
      transporter.sendMail(
        {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: "Password Reset Link",
          html: `<div>
            <h1>PLease click the link below to change the password</h1>
            <button  style={{backgroundColor:aqua, color:red , padding:10px, borderRadius:20px}}><a href="${link}">Change password</a></button>
          </div>`,
        },
        function (error, info) {
          if (error) {
            res.json({ errors: "no email sent , something went wrong" });
          } else {
            res.json({ message: "email sent successfully" });
          }
        }
      );
    }
  } catch (err) {
    res.json({ errors: "something went Wrong" });
  }
};
/////////////////////////////////////////////////////////change password
userController.changePassword = async (req, res) => {
  const { token } = req.params;
  // console.log("token",token)
  const { newPassword } = req.body;
  // console.log("newPassword",newPassword)
  try {
    const tokenInfo = jwt.verify(token, process.env.SECRETE_KEY);
    // console.log("tokenInfo", tokenInfo);
    const user = await users.findOneAndUpdate(
      { _id: tokenInfo._id },
      { password: newPassword },
      { runValidators: true }
    );
    if (!user) {
      res.json({ errors: "Invalid Token" });
    } else {
      // console.log(user);
      res.json({ isSuccess: "Password Changed Successfully" });
    }
  } catch (err) {
    // console.log(err);
    res.json(err);
  }
};

userController.addUserProfile = async (req, res) => {
  const body = req.body;
  console.log("body", body);
  try {
    const { updatedUser, userProfile } = await userProfiles.addProfile(req);
    res.json(userProfile);
  } catch (err) {
    res.json(err);
  }
};

userController.getUserAccount = async (req, res) => {
  const user = req.user;
  // console.log(user)
  try {
    const userAccount = await userProfiles.findOne({
      _id: user.profileId,
      userId: user._id,
    });
    res.json(
      _.pick(userAccount, [
        "fullName",
        "address",
        "phoneNumber",
        "adharImages",
        "panImages",
        "isSaved",
        "",
      ])
    );
  } catch (err) {
    res.json({ errors: "No user Profile Found" });
  }
};

userController.getMyCourses = async (req, res) => {
  const _id = req.user?._id;
  // console.log("user", courses);
  try {
    const findUser = await users.findById(_id);
    if (findUser) {
      const myCourses = await courses.find({ _id: { $in: findUser.courses } });
      res.json(myCourses);
    } else {
      res.status(404).json({ errors: "User Record not found" });
    }
  } catch (err) {
    res.json(err);
  }
};

userController.getLectures = async (req, res) => {
  const { user } = req;
  // console.log("user",user);
  const { courseId:id } = req.params;
  try {
    const isEnrolledToCourse = await users.findOne({_id:user.id})
    const findLectures = await lectures.aggregate([
      { $match: { courseId: new ObjectId(id) } },
      {
        $project: {
          _id: 1,
          title: 1,
          assetType: 1,
          folderTitle:1,
          assetUrl: {
            $cond: {
              if: { $in: ["$courseId", user?.courses] },
              then: "$assetUrl",
              else: "",
            },
          },
        },
      },
    ]);
    console.log("userLectures", findLectures);
    res.json(findLectures);
  } catch (err) {
    console.log("usererr",err)
    res.json(err);
  }
};
module.exports = userController;
