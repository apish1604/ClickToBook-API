const express=require('express')
const mongoose=require('mongoose')
const Movie=require('../models/movie')
const Theatre=require('../models/theatre')
const ShowTime=require('../models/showTime')
const router=new express.Router()
const auth=require('../middlewares/auth')
//Costmer already choosen movie
//GET Theatre ?day >page
//LOOKUP NOT WORKING
router.get('/shows/:movieid',async (req,res)=>
{
    const today=new Date(req.query.d)
    const _movie=mongoose.Types.ObjectId(req.params.movieid)
    filter={
        _movie,
        day:today
    }
    options={
        limit:10,
        skip:1,
        sort:{'_theatre.name':1}
    }
    console.log(_movie,today)
    const showTime=await ShowTime.aggregate([
        { 
            $match: {  _movie:_movie, day:today}
         },
        {
            $group:
            {
                _id: "$_theatre", 
                  showtimes:{$push:{slot: "$_slot"}},
            } 
        },
        {
            $lookup:{
                from:"Theatre",
                localField:"_id",
                foreignField:"_id",
                as: 'theatre'
            }
        }
    ])
    return res.send(showTime)
    
})
module.exports=router