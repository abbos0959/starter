const { json } = require("express")
const express=require("express")
const app=express()
const fs=require("fs")
const tour=fs.readFileSync(`${__dirname}/dev-data/data/tours.json`,"utf-8")
const tours=JSON.parse(tour)


app.get("/",(req,res)=>{
res.status(200).send(
    {
        status:"success",
        data:tours
    }

    )
})




const Port=8000
app.listen(Port,"127.0.0.1")