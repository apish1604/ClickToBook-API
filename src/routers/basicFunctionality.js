const express=require('express')
const Movie=require('../models/movie')
const User=require("../models/user")
const router=new express.Router()

//Add Comment

router.put('/comment/:userid/:movieid',async(req,res)=>{
    const comment={
        body:req.body.comment,
        postedBy:req.params.userid
    }
    const movie=await Movie.findByIdAndUpdate(req.params.movieid,{$push:{comments:comment}},{new:true,runValidators:true})
                .populate("comments.postedBy","name")
    if(!movie)
    {
       console.log("Movie doesnot exist")
       return res.status(404).send()
    }
    console.log(movie.comments[0].postedBy.name)
    return res.status(201).send(movie)
})

//Remove Comment
router.put('/uncomment/:userid/:movieid',async(req,res)=>{
    const comment={
        body:req.body.comment,
        postedBy:req.params.userid,
        date:new Date(req.body.date)
    }
    console.log(comment.date)
    const movie=await Movie.findByIdAndUpdate(req.params.movieid,{$pull:{comments:comment}},{new:true,runValidators:true})
    if(!movie)
    {
       console.log("Movie doesnot exist")
       return res.status(404).send()
    }
    return res.status(201).send(movie)
})
//Add rating
router.put('/addrating/:userid/:movieid',async(req,res)=>{
    //final rating of movie is not updated yet
    const rating={
        rate:req.body.rate,
        ratedBy:req.params.userid
    }
    const movie=await Movie.findByIdAndUpdate(req.params.movieid,{$push:{ratings:rating}},{new:true,runValidators:true})
    if(!movie)
    {
       console.log("Movie doesnot exist")
       return res.status(404).send()
    }
    console.log(movie)
    return res.status(201).send(movie)
})
//Remove rating
router.put('/unrate/:userid/:movieid',async(req,res)=>{
    const rating={
        rate:req.body.rate,
        ratedBy:req.params.userid
    }
    const movie=await Movie.findByIdAndUpdate(req.params.movieid,{$pull:{ratings:rating}},{new:true,runValidators:true})
    if(!movie)
    {
       console.log("Movie doesnot exist")
       return res.status(404).send()
    }
    return res.status(201).send(movie)
})

module.exports=router