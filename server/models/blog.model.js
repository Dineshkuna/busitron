import mongoose from 'mongoose';



const BlogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    topic : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String
        }
        
        
    }

     
})

export default mongoose.model('Blog', BlogSchema);