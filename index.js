const express=require("express");
require('./config');
const StudentSchema=require("./Student");
const multer=require("multer")
const cors=require("cors")
const app=express();
app.use(
    cors()
)
app.use(express.json())

 const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+".jpg")
        }
    })
 }).single ("image");
app.post("/create",async(req,resp)=>{
    let data=new StudentSchema(req.body);
    let result =await data.save();
    console.log(result)
    resp.send(result);
})

app.get("/list",async(req,resp)=>{
    let data=await StudentSchema.find();
   
  
    resp.send(data);
})

app.delete("/del/:_id",async(req,resp)=>{
     
   console.log(req.params)
   let data=await StudentSchema.deleteOne(req.params);
    resp.send( data);
})

app.put("/update/:_id",async(req,resp)=>{
     
    console.log(req.params)
    let data=await StudentSchema.updateOne(
        req.params,
       { $set:req.body}
        
        );
     resp.send( data);
 })
 

app.listen(8888)