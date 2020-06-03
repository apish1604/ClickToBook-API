const express=require('express')

const Theatre=require('../models/theatre')
const User=require('../models/user')
const auth=require('../middlewares/auth')
const router=new express.Router()

router.get('/theatres',auth,async(req,res)=>{ 
 
    try
    {
        const user=req.user;
        //console.log(user.userType)
        //VENDOR
        
        if(user.userType==="vendor")
        {
            await user.populate('theatres').execPopulate()
            const theatres=user.theatres
            //const theatres=await Theatre.find({owner:id})
            if(!theatres)
            {
                return res.status(404).send("You haven't registered any theatre yet!")
            }
            const theatreStatus={
                unapproved:[],
                active:[],
                expired:[]
            }
            for (var i=0;i<theatres.length;i++)
            { 
                if(theatres[i].status==="pending")
                {
                    theatreStatus.unapproved.push(theatres[i])
                }
                else  
                {
                    const recent=new Date()
                    if(theatres[i].leaseInfo.lastDate.getTime()<recent.getTime())
                    {
                        theatreStatus.active.push(theatres[i])
                    }
                    else
                    {
                        theatreStatus.expired.push(theatres[i])
                    }
                }
            }
            return res.status(200).send(theatreStatus)
        }
        //ADMIN
        if(user.userType==="admin"){
            console.log("Admin is logged in")
            const recent=new Date()
            //depends upon query
            const theatres=await Theatre.find({status:"approved"})
            const expiredTheatres=await Theatre.find({'leaseInfo.lastDate':{$lt:recent},status:"approved"})
            const unapprovedTheatres=await Theatre.find({status:"pending"})
            return res.status(200).send({expiredTheatres,unapprovedTheatres,theatres})
        }
    }catch(e)
        {
        res.status(501).send(e)
        }
    })

//add theatre

router.post('/addtheatre',auth,async(req,res)=>{
    try
    {
        const theatre=await new Theatre(req.body)
        theatre.owner=req.user._id
        await theatre.save()
        res.status(201).send(theatre)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

//UpdateTheatre
router.put('/theatres/update/:id',auth,async ()=>{
        //[client is sending the only element of array which needs to be updated,add,delete,edit(pull,push,set)<- how i will get to know ]

    const _id=req.params.id
    const updates=req.body
    const allowedUpdates=['name','brandName','location','seatInfo','slotInfo','status','leaseInfo']

    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation)
    {
        return res.send('Invalid Update')
    }
    const theatre=await Theatre.findById(_id)
    updates.forEach(update => {
        if(update==='slotInfo')
        {
            theatre[update].concat(update)
        }
        else if(update==='seatInfo')
        {
            theatre[update].set()
        }
    });

})
 //Delete many theatre
 //PS:when client send wrong id ,instead of showing "you are not owner", it throws an error
 router.delete('/theatres',auth,async (req,res)=>{
     const _id=req.body.id
     console.log(_id)
     try{
         const theatre=await Theatre.deleteMany({_id:_id,owner:req.user._id})
        if(!theatre.n||!theatre.ok)
        {
            return res.status(404).send("You are not owner!");
        }
        return res.send(theatre)
     }catch(e)
     {
         return res.status(501).send()
     }
 })
 
module.exports=router
