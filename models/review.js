import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
        default: Date.now()
    },
    profilePicture:{
        type:String,
        required:true,
        default:"https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg?semt=ais_hybrid"
    },
    isApproved:{
        type:Boolean,
        required:true,
        default:false
    }
})

const Review = mongoose.model("Review",reviewSchema);

export default Review;