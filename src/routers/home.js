const express=require('express')
const Movie=require('../models/movie')
const router=new express.Router()
//Trending Movies
router.get('/',async(req,res)=>{
    try
    {
        const movie=await Movie.find({rating:{$gt:0},inTheatre:true},{title:1,rating:1,poster:1,releaseDate:1}).sort({rating:-1}).limit(10)
        if(!movie)
            return res.status(404).send()
        return res.send(movie)
    }
    catch(e)
    {
        res.status(500).send(e)
    }   
})
//
module.exports=router