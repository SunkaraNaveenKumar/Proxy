const mongoose = require("mongoose")

const Schema = mongoose.Schema 

const lectureSchema = new Schema({
    title:{
        type:String,
        required:[true, "Lecture title is required"]
    },
    assetType:{
        type:String,
        enum:['video', 'pdf'],
        required:[true, "Asset type is required"]
    },
    assetUrl:{
        type:String,
        required:[true, "Asset url is required"]
    },
    folderTitle:{
        type:String,
        required:[true, "Folder title is required"]
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"courses",
        required:[true,"course id is required"]
    },
    adminId:{
        type:Schema.Types.ObjectId,
        ref:'admins',
        required:[true,"admin Id is required"]
    }
},{timestamps:true})

const lectures = mongoose.model("lectures",lectureSchema)
module.exports = lectures