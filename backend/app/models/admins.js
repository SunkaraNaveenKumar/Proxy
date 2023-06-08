const mongoose = require('mongoose') 
const {emailValidator,passwordvalidator} = require('../helpers/validators')
const Schema = mongoose.Schema 
const adminsSchema =new Schema({
    email:{
        type:String,
        required:true,
        validate: [emailValidator,"Invalid email"],
    },
    password:{
        type:String,
        required:true,
        validate:[passwordvalidator,"Invalid Password"]
    },
    username:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"admin"
    },
    // courses:[{courseId:{type:Schema.Types.ObjectId, ref:'courses'} }]
},{timestamps:true})

const admins = mongoose.model("admins",adminsSchema)

module.exports=admins