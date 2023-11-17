const postRoute=require('./routes/posts')
const express=require('express')
const multer=require('multer')
const app=express()
const path=require("path")
const cors=require('cors')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const dotenv=require('dotenv')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const commentRoute=require('./routes/comments')
console.log(mongoose.version);
const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://snithin816:snithin816@cluster0.okezris.mongodb.net/?retryWrites=true&w=majority")
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}
//middlewares

dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cookieParser())

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

//image upload
//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
       fn(null,req.body.img)
       // fn(null,"image1.jpg")
    }
})
const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
     console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


app.listen(5000,()=>{
    connectDB()
    console.log("app is running on port 5000")
})