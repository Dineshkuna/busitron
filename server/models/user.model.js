import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    email : {
        type : String,
        required : true,

    },
    password : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required: true,
    },
    role : {
        type : String,
        enum : ['user','admin','superadmin'],
        default : 'user'
    }
})

export default mongoose.model('User', userSchema);