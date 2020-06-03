const express=require('express')
const Movie=require('../models/movie')
const router=new express.Router()
//Trending Movies
console.log("in home file")
router.get('/trending',async(req,res)=>{ 
    try
    {
        const filter={
            rating:{$gt:8}
        }
        const projection={
            title:1,
            rating:1,
            poster:1,
            releaseDate:1
        }
        const movie=await Movie.find(filter,projection).sort({rating:-1}).limit(10)
        if(!movie.length)
            return res.status(404).send()
        return res.send(movie)
    }
    catch(e)
    {
        res.status(501).send(e)
    }   
})
//Genre
router.get('/genre',async(req,res)=>{
    const genre=req.body.genre.toLowerCase()
    try{
        const filter={
            genres:genre
        }
        const projection={
            title:1,
            rating:1,
            poster:1,
            releaseDate:1
        }
        const movies=await Movie.find(filter,projection)
        console.log(movies.length)
        if(!movies.length)
        {
            return res.status(404).send()
        }
        return res.send(movies)

    }catch(e)
    {
        return res.status(501).send(e)
    }
})
//Language
router.get('/language',async(req,res)=>{
    const language=req.body.language.toLowerCase()
    try{
        const filter={
            language
        }
        const projection={
            title:1,
            rating:1,
            poster:1,
            releaseDate:1
        }
        const movies=await Movie.find(filter,projection)
        if(!movies.length)
        {
            return res.status(404).send()
        }
        return res.send(movies)

    }catch(e)
    {
        return res.status(501).send(e)
    }
})

//Latest
router.get('/latest',async (req,res)=>{
    const today=new Date()
    const filter={
        releaseDate:{$lt:today}
    }
    const projection={
        title:1,
        rating:1,
        poster:1,
        releaseDate:1
    }
    try{
        const movies=await Movie.find(filter,projection).sort({releaseDate:-1})
        if(!movies.length)
        {
            return res.status(404).send()
        }
        return res.send(movies)
    }catch(e)
    {
        return res.status(501).send(e)
    }
})
module.exports=router