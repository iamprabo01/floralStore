import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        required:true,
        default:"customer"
    },

    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    phoneNumber:{
        type:String,
        required:true
    },

    profilePicture:{
        type:String,
        required:true,
        default:"https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg?semt=ais_hybrid"
    }
});

const User = mongoose.model("User",userSchema);

export default User;