const mongoose=require('mongoose')
const validator=require('validator')
const connect=require('../db/mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const Theatre=require('./theatre')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        //required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Invalid Email!')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true
    },
    userType:{
        type:String,
        enum:['customer','vendor','admin'],
        default:'customer'
    },
    phoneNumber:{
        type:String,
        trim:true,
        validate(value)
        {
            if(!validator.isMobilePhone(value,'en-IN'))
            {
                throw new Error('Invalid Mobile Number')
            }
        }
    },
    address:{
        country:{
            type:String
        },
        state:{
            type:String
        },
        city:{
            type:String
        },
         street:{
             type:String
         }
    },
    tokens:[{}]
})

userSchema.virtual('theatres',{
ref:'Theatre',
localField:'_id',
foreignField:'owner'
})

userSchema.methods.toJSON= function(){
    const user=this;
    const userObject=user.toObject() 
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    //Generate token
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    console.log(token)
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("Unable to login")
    }
    const isMatch=await bcrypt.compare(password,user.password)
    
    if(!isMatch){
        throw new Error('Password Mismatch')
    }
    return user;
}
userSchema.pre('save',async function(next){
    const user=this;
    console.log("starting")
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next();
})

const User=mongoose.model('User',userSchema)
module.exports=User
