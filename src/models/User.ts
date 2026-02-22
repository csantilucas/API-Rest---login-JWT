import mongoose from "mongoose";
const {Schema} = mongoose

export const userSchema = new Schema({
    name:{type:String, required:true, minlength:3, maxlength:50},
    email:{type:String, required:true, unique:true, minlength:6, maxlength:50},
    password:{type:String, required:true, minlength:5},
    admin:{type:Boolean, default:false},
    creatAt:{type:Date, default: Date.now}
})