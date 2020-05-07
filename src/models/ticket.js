const mongoose=require('mongoose')
const validator=require('validator')
const User=require('./user')
const Theatre=require('./theatre')
const Movie=require('./movie')
const ShowTime=require('./showTime')
const Schema=mongoose.Schema

const bookingSchema=new Schema({
    customer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    showTime:{
        type:Schema.Types.ObjectId,
        ref:'ShowTime'
    },
    seatno:Number,
    seatType:String,
    bookingDate:Date
})