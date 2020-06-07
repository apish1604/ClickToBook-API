const mongoose=require('mongoose')
const validator=require('validator')
const connect=require('../db/mongoose')
const User=require('./user')
const showTime=require('./showTime')
const Schema=mongoose.Schema

const slotSchema=new Schema({
    startTime:String,
    endTime:String
})

const theatreSchema=new Schema({
    name:{
        type:String,
        required:true,
        //unique:true
    },
    brandName:{
        type:String,
        //required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    location:{
        country:{
            type:String,
            trim:true
        },
        state:{
            type:String
        },
        city:{
            type:String
        },
        street:{
            type:String
        },
        zipCode:{
            type:String
        }
    },
    seatInfo:{
        type:Map,    //key=seatType
        of:Number //no. of seats of that type
        //required:true
    },
    slotInfo:{
        type:[slotSchema],
        required:true
    },
    status:{
        type:String,
        enum:["approved","pending"],
        default:"pending"
    },
    leaseInfo:{
        startDate:{
            type:Date,
            default:"2000-01-01"
        },
        lastDate:{
            type:Date,
            default:"2000-02-02"
        }
    }
    
})
theatreSchema.index({name:"text"})


const Theatre=mongoose.model('Theatre',theatreSchema)

// Theatre.on('index', function(error) {
//     console.log(error);
//   });
module.exports=Theatre
