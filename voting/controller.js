const {
  poll,
  addPoll,
  findPoll,
  deletePoll,
} = require("./repository")
const votingRepo= require("./model")

exports.poll = async (req,res)=>{
  try{
    const data = await poll()
    res.status(200).json({
      status:true,
      data: data
    })
  }catch(err){
    res.status(500).json({
      status:false,
      err:err.message
    })
  }
}

exports.addPoll = async (req, res)=>{
  try{
    const newPoll = req.body.poll
    const poll = await findPoll(newPoll)
    if(!poll){
      const data = await addPoll({name:newPoll})
      res.status(200).json({
        status:true,
        data:data
      })
      
    }else{
      res.status(200).json({
        status:true,
        message:`${newPoll} has already been added`
      })
    }
   
  }catch(err){
    res.status(500).json({
      status:false,
      err:err.message
    })
  }
}

exports.deletePoll = async (req, res)=>{
  try{

    const poll = req.body.poll
    const check = await findPoll(poll)
    if(check){
      const delPoll = deletePoll(poll)
      res.status(200).json({
        status:true,
        message:`${req.body.poll} has already been deleted successfully`
      })
    }else{
      res.status(200).json({
        status:false,
        message:`${req.body.poll} doesn't exist`
      })
    }
  }catch(err){
    res.status(500).json({
      status:false,
      err:err.message
    })
  }
 
}

exports.addPollOption = async (req,res)=>{
  try{
    let msg =[]
    const inputPoll = req.body.poll
    const inputOptions = req.body.option
    const poll = await findPoll(inputPoll)
    if(typeof(inputOptions) === "object"){
      inputOptions.map(option=>{
        const found = poll.candidates.find(opt => opt.name === option)
        if(!found){
          poll.candidates.push({name: option})
          
        } else{
          msg.push(`${option} has already been added`) 
        }
       
    })
      poll.save()
      res.status(200).json({
        status:true,
        message:msg,
        data:poll,
      })
    }
    else if(typeof(inputOptions) === "string"){
      const found = poll.candidates.find(opt => opt.name === inputOptions)
      if(!found){
        poll.candidates.push({name: inputOptions})
        poll.save()
      } else{
        msg.push(`${inputOptions} has already been added`) 
      }
     
      res.status(200).json({
        status:true,
        message:msg,
        data:poll,
      })
    }
  }catch(err){
    res.status(500).json({
      status:false,
      err:err.message,
    })
  }
}
exports.delPollOption = async (req,res)=>{
  try{
    let msg =[]
    const inputPoll = req.body.poll
    const inputOptions = req.body.option
    const poll = await findPoll(inputPoll)
    if(typeof(inputOptions) === "object"){
      inputOptions.map(option=>{
        const found = poll.candidates.find(opt => opt.name == option)
        if(found){
          let foundIndex = poll.candidates.indexOf(found)
          poll.candidates.splice(foundIndex, 1)
        } else{
          msg.push(`${option} isn't an option in ${inputPoll}`) 
        }
       
      })
      poll.save()
      res.status(200).json({
        status:true,
        message:msg,
        data:poll,
      })
    }
    else if(typeof(inputOptions) === "string"){
      const found = poll.candidates.find(opt => opt.name == inputOptions)
      if(found){
        let foundIndex = poll.candidates.indexOf(found)
        poll.candidates.splice(foundIndex, 1)
        poll.save()
      } else{
        msg.push(`${option} isn't an option in ${inputPoll}`) 
      }
     
      res.status(200).json({
        status:true,
        message:msg,
        data:poll,
      })
    }
  }catch(err){
    res.status(500).json({
      status:false,
      err:err.message,
    })
  }
}

