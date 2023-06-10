const { tokenGeneration } = require("../helpers/tokenGeneration");
const admins = require("../models/admins");
const courses = require("../models/courses");
const _ = require("lodash");
const turl = require("turl");
const users = require("../models/users");
const fetchFeilds = require("../helpers/fetchFeilds");
const userProfiles = require("../models/userProfiles");
const lectures = require("../models/lectures");
const adminController = {};

adminController.login = async (req, res) => {
  const { body } = req;
  console.log("body", body);
  try {
    const admin = await admins.findOne({ email: body.email });
    if (!admin) {
      res.json({ errors: "Invalid Email or password" });
    } else {
      let expiresIn = "1d";
      if (body.password === admin.password) {
        const token = tokenGeneration(admin, req, expiresIn);
        res.json({ token: `Bearer ${token}` });
      } else {
        res.json({ errors: "Invalid Email or password" });
      }
    }
  } catch (err) {
    res.json(err);
  }
};
adminController.addCourse = async (req, res) => {
  const { body, admin } = req;
  const { imageUrl } = body;
  //   console.log(imageUrl);
  // console.log(admin._id);
  try {
    body.adminId = admin._id;
    const course = await new courses(body).save();
    // console.log("body", body);
    // console.log("admin",admin)
    // console.log("course", course);
    res.json(course);
  } catch (err) {
    // console.log("err",err)
    if (err.message === "400 Bad Request") {
      res.status(500).json({
        errors: {
          imageUrl: {
            message:
              "Please provide a valid Image URL or  It cannot not be empty or error with turl shortner",
          },
        },
      });
    } else if (err.name === "ValidationError") {
      res.status(400).json({ errors: err.errors });
    } else {
      res.status(500).json({
        errors:
          "An error occurred while adding the course, Internal Server Issue",
      });
    }
  }
};
adminController.getMyCourses = async (req, res) => {
  const { admin } = req;
  //   console.log("admin", admin);
  try {
    const id = admin._id;
    const allCourses = await courses
      .find({ adminId: id })
      .sort({ createdAt: "descending" });
    // console.log("allCourses", allCourses);
    // const newArr = [];
    // allCourses.forEach((ele) => {
    //   newArr.push(
    //     _.pick(ele, [])
    //   );
    // });
    // console.log("allCourses", allCourses);
    res.json(
      fetchFeilds(allCourses, [
        "title",
        "description",
        "imageUrl",
        "price",
        "adminId",
        "_id",
        "createdAt",
      ])
    );
  } catch (err) {
    res.json(err);
  }
};
//////////////////////////// get all users
adminController.getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find().sort({ createdAt: "descending" });
    res.json(
      fetchFeilds(allUsers, [
        "username",
        "email",
        "role",
        "createdAt",
        "_id",
        "profileId",
      ])
    );
  } catch (err) {
    res.json(err);
  }
};
/////////////////////////////////// add lecture
adminController.addLecture = async (req, res) => {
  const { courseId } = req.params;
  console.log(courseId);
  const { body, admin } = req;
  body.courseId = courseId;
  body.adminId = admin._id;
  console.log(body);
  try {
    const addLectureData = await new lectures(body).save();
    res.json(addLectureData);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ errors: err.errors });
    } else {
      res.status(500).json({
        errors:
          "An error occurred while adding the lecture, Internal Server Issue",
      });
    }
  }
};
///////////////////////////////// delete user
adminController.deleteUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const DeletedUser = await users.findByIdAndDelete(userId);
    res.json(DeletedUser);
  } catch (err) {
    res.json(err);
  }
};
///////////////////////////////////// delete user profile info
adminController.deleteUserProfile = async (req, res) => {
  const { userId: id } = req.params;
  try {
    const deleteProfileIdInUser = await users.findByIdAndUpdate(
      id,
      { $unset: { profileId: 1 } },
      { new: true }
    );
    const deletedUserProfile = await userProfiles.findOneAndDelete({
      userId: id,
    });
    res.json(deletedUserProfile);
  } catch (err) {
    res.json(err);
  }
};
////////////////////////////////////////////// delete course
adminController.deleteCourse = async (req, res) => {
  const { courseId: id } = req.params;
  const { admin } = req;
  console.log("user", req.user);
  console.log("admin", admin);
  try {
    const deletedCourse = await courses.findOneAndDelete({
      _id: id,
      adminId: admin?._id,
    });
    const deletedLectures = await lectures.deleteMany({
      courseId: id,
      adminId: admin._id,
    });
    // console.log("deletedCourse", deletedCourse);
    if (!deletedCourse) {
      res.status(404).json("This course not found in your records");
    } else {
      console.log("deletedLectures", deletedLectures);
      res.json(_.pick(deletedCourse, ["_id", "adminId"]));
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
adminController.getLectures = async (req, res) => {
  const { courseId: id } = req.params;
  // const {admin} = req
  try {
    const lecturesData = await lectures.find({ courseId: id });
    res.json(lecturesData);
  } catch (err) {
    res.json(err);
  }
};
adminController.getUserEnrolledCourses = async (req, res) => {
  const { admin } = req
  const { userId } = req.params
  console.log(admin,userId);
  try {
    const user = await users.findById(userId)
    if (user) {
      const userEnrolledCourses = await courses.aggregate([
        { $match: { adminId: admin._id } },
        // {
        //   $lookup: {
        //     from: "users",
        //     localField: "courses",
        //     foreignField: "_id",
        //     as: "enrolledStudents",
        //   },
        // },
        ///////////////////////////////////////
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            imageUrl: 1,
            price: 1,
            createdAt: 1,
            enrolled: {
              $cond: {
                if: { $in: ["$_id", user.courses] },
                then: true,
                else: false,
              },
            },
            // users:0
          },
        },
        // { $sort: { createdAt: -1 } },
      ]);

      // console.log("studentEnrolledCourses", studentEnrolledCourses)
      res.json(userEnrolledCourses)
    } else {
      res.status(401).json("Cannot find user in the database")
    }

  } catch (err) {
    res.json(err)
  }
}

adminController.enrollStudentToCourse = async (req, res) => {
  const { userId, courseId } = req.query
  try {
    //  console.log(userId,courseId)
    const alreadyEnrolled = await users.findOne({ _id:userId,courses: { $in: [courseId] } })
    // console.log(alreadyEnrolled)
    if (alreadyEnrolled) {
      res.json({ message: "Already Enrolled" })
    } else {
      const enrolled = await users.findByIdAndUpdate(userId, { $push: { courses: courseId } })
      if (enrolled) {
        res.json({ message: "successfully enrolled to the course" })
      } else {
        res.status(404).json({ errors: "something went wrong with enrolling the user" })
      }
    }

  } catch (err) {
    res.json(err)
  }
}
adminController.unEnrollStudentToCourse = async (req, res) => {
  const { userId, courseId } = req.query
  try {
    const alreadyEnrolled = await users.findOne({_id:userId, courses: { $in: [courseId] } })
    if (alreadyEnrolled) {
      const unEnroll = await users.findByIdAndUpdate(userId, { $pull: { courses: courseId } })
      if (unEnroll) {
        res.json({ message: "successfully unenrolled to the course" })
      } else {
        res.status(404).json({ errors: "something went wrong with unenrolling the user" })
      }
    } else {
      res.status(404).json({ message: "Already UnEnrolled" })
    }

  }
  catch (err) {
    res.json(err)
  }
}
module.exports = adminController;
