import mongoose, {Schema} from "mongoose";

const runSchema = new Schema({
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
      // run start location or meeting point
    startlocation:{
        type: String,
        required: true
    },
    //optional end location.
    endlocation:{
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



export const Run = mongoose.model("Run",runSchema)