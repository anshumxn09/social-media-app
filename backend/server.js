if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path : "backend/config/.env"})
}
const express = require('express')
const app = express()
const connectionToDatabase = require('./config/database')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const postRouter = require('./Routes/postRoutes');
const userRouter = require('./Routes/userRoutes');
mongoose.set('strictQuery', false);
// middlewares
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/api/", userRouter);
app.use('/api/', postRouter);

app.get("/", (req, res) => {
    res.json({
        message : "god is great"
    })
})

const startMyApp = async () => {
    try {
        await connectionToDatabase();
        app.listen(process.env.PORT, ()=>{
            console.log('successfully running')
        }) 
    } catch (error) {
        console.log(error)
    }
}

startMyApp()