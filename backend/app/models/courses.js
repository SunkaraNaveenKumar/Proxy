const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const turl = require("turl");
const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title required"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Course image Url  is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    // lectures: {
    //   type: [{}],
    // },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "admins",
      required: [true, "admin id is required"],
    },
    users: [{ userId: { type: Schema.Types.ObjectId, ref: "users" },username:{type:String},email:{type:String} }],
  },
  { timestamps: true }
);

CourseSchema.pre("save",async function(next){
  try {
    const shortendUrl = await turl.shorten(this.imageUrl);
    this.imageUrl = shortendUrl
    next()
  }catch(err){
    next(err)
  }
})

const courses = mongoose.model("courses", CourseSchema);

module.exports = courses;
