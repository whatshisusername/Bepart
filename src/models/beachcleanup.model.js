import mongoose, {Schema} from "mongoose";

const beachcleanupSchema = new Schema({
   title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date:{
        type:String,
        required:true,
    },
    starttime: {
        type: String,
        required: true
    },
    endtime: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    instagram:{
        type: String,
    },
    twitter:{
        type: String,
  
    },
    whatsapp:{
        type: String,
       
    },

    thumbnail: {
                    type: String, //cloudinary url
                    required: true
                },

    participants: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "User"
                    }
                ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
                },
                
}, {timestamps: true})



export const BeachCleanup = mongoose.model("BeachCleanup",beachcleanupSchema)