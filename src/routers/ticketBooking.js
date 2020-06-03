const express=require('express')
const mongoose=require('mongoose')

const router=new express.Router()
const auth=require('../middlewares/auth')

router.get('/ticketbooking/:showtimeid',async (req,res)=>{
    const _show=req.params.showtimeid
    const _user=req.body.user

})