const express = require("express")
const app = express()
const mongoose = require("mongoose")

main().catch(err => {
  if(err){
    console.log(err)
  }
})

async function main (){
  await mongoose.connect("mongodb://localhost:27017/poll")
}

app.use(express.urlencoded({extended:true}))
app.use(require("./voting/route"))


const port = 3000

app.listen(process.env.PORT||port, (err)=>{
  if(err){console.log(err)}
  console.log(`server is connected at ${port}`)
})