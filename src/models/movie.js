const mongoose=require('mongoose')
const validator=require('validator')
const connect=require('../db/mongoose')
const User=require('./user')
const {ObjectId}=mongoose.Schema.Types
const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    genres:{
        type:[String]
        //default:undefined
        //required:true
    },
    country:{
        type:[String]
    },
    language:{
        type:[String]
    },
    synopsis:{
        type:String,
        default:''
    },
    runtime:{
        type:String
    },
    releaseDate:{
        type:Date
    },
    director:{
        type:[String]
    },
    actors:{
        type:[String]
    },
    comments:[{
        body:String,
        date:{
            type:Date,
            //`Date.now()` returns the current unix timestamp as a number
            default:Date.now
        },
        postedBy:{
            type:ObjectId,
            ref:User
        }
    }],
    ratings:[{
        rate:{
            type:Number,
            enum:[0,1,2,3,4,5,6,7,8,9,10],
            default:0
        },
        ratedBy:{
            type:ObjectId,
            ref:User,
            unique:true
        }
    }],
    //make them virtual
    rating:{
        type:Number,
        min:0,
        max:10
    },
    votes:{
        type:Number,
        default:0
    },
    poster:{
        type:String,
        default:"N/A"
    },
    lastDate:{
        type:Date
    },
    inTheatre:{
        type:Boolean,
        default:false
    }
})
const Movie=mongoose.model('Movie',movieSchema)
module.exports=Movie