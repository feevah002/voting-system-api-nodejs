const mongoose = require("mongoose")

const candidateSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },  
  votes:{
    type:Number,
    default:0
  },
  percentage:{
    type:Number,
    default:0
  },
});

const PollSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  candidates:[candidateSchema],
})

module.exports= mongoose.model("Poll", PollSchema)