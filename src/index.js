const express=require('express')
require('./db/mongoose')
const app=express()

const Movie=require('./models/movie')

const router=new express.Router
const homeRouter=require('./routers/home')
const movieCRUDRouter=require('./routers/movieCRUD')
const theatreCRUDRouter=require('./routers/theatreCRUD')
const showTimeCRUDRouter=require('./routers/showTimeCRUD')
const basicFunctionalityRouter=require('./routers/basicFunctionality')
const userCRUDRouter=require('./routers/userCRUD')
const theatreRouter=require('./routers/theatre')
const movieRouter=require('./routers/movies')
const ticketBookingRouter=require('./routers/ticketBooking')
const experimentRouter=require('./routers/experiment')

const port=process.env.PORT || 3000

app.use(express.json())

app.use(homeRouter)
app.use(movieCRUDRouter)
app.use(theatreCRUDRouter)
app.use(showTimeCRUDRouter)
app.use(basicFunctionalityRouter)
app.use(userCRUDRouter)
app.use(theatreRouter)
app.use(movieRouter)
app.use(ticketBookingRouter)
app.use(experimentRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
