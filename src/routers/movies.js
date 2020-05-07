const express=require('express')
const Movie=require('../models/movie')
const router=new express.Router()
const auth=require('../middlewares/auth')

router.get('/movies/intheatre',async (req,res)=>{
    try{
        const movies=await Movie.find({inTheatre:1})
         if(!movies)
         {
             return res.status(404).send("Movie not found")
         }
    }
    catch(e){
        return res.status(501).send(e)
    }
})