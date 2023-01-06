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
// let posts =[{
//   president:{
//     jane:0,
//     diva:0,
//   },
//   vicePresident:{
//     john:0,
//     doe:0,
//   },
// }]
// app.get("/poll", (req,res)=>{
  
//   const data = poll
//   res.status(200).json({
//     status:true,
//     data:data
//   })
// })
// app.post("/poll", (req,res)=>{
//   try{
//     const userVotes = req.body
//     const votes = Object.entries(userVotes).map(key=> 
//       posts.map(post=>
//           post[key[0]][key[1]]++
//         )
//     )
//     res.status(200).json({
//       posts
//     })
//   } catch(err){
//     res.status(500).json({
//       err:err.message
//     })
//   }

// })

const port = 3000

app.listen(process.env.PORT||port, (err)=>{
  if(err){console.log(err)}
  console.log(`server is connected at ${port}`)
})