const express=require('express')
const Movie=require('../models/movie')
const router=new express.Router()
const auth=require('../middlewares/authAdmin')
//Get movie info
router.get('/getmovies',auth,async(req,res)=>{
    try
    {
        const movies=await Movie.find({},{title:1,poster:1}).sort({releaseDate:-1})
        if(!movies.length)
        {
            return res.status(404).send()
        }
        return res.send(movies)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

//Add movie Info
router.post('/addmovie',auth,async(req,res)=>{
    try
    {
        const movie=new Movie(req.body);
        await movie.save();
        res.status(201).send(user);
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})

//Update Movie
router.patch('/getmovies/:id',auth,async(req,res)=>{
    const _id=req.params.id;
    console.log(_id)
    try
    {
       const movie=await Movie.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
       if(!movie)
       {
           return res.status(404).send()
       }
       console.log(movie)
       return res.status(202).send(movie)
    }catch(e)
    {
        res.status(400).send(e)
    }
})

//Delete Movie(One can't remove movies if it is shown in theatres)
router.delete('/deletemovie/:id',auth,async(req,res)=>{
    const id1=req.params.id
    
    try
    {
        
        const movie=await Movie.findById(id1)
        if(!movie)
        {
            return res.status(404).send()
        }
        console.log('hi')
        movie=Movie.findOneAndDelete({_id:req.params.id,inTheatre:true})
        if(!movie)
        {
            res.send("This movie is available in theatres.So you can't delete this")
        }
        return res.send(movie)
    }catch(e)
    {
        res.status(400).send(e)    
    }
})

module.exports=router