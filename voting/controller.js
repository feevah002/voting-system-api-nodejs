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
    // needs the poll and the option you want to delete
    const inputPoll = req.body.poll
    const inputOptions = req.body.option
    const poll = await findPoll(inputPoll)
    // if option needed to be deleted is more than one
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
      // if option needed to be deleted is one(a string)
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

exports.addVote = async (req,res)=>{
  try{
    let msg =[]
    // collects user votes and user's name
    const userVotes = req.body
    const voter = req.body.voter

    
    const data = await poll()

    // this returns an array of array with the key in the first element of each array and the value in the second element of each array 
    const keys = Object.entries(userVotes)
    console.log(keys)
    // looping through
    keys.map(async option=>{
      
      const poll = await findPoll(option[0])
    
    //  checking if the poll exists
      if(poll){
         // checking if user has already voted
        const voted = poll.voted.find(opt => opt.name === voter)
        // if user hasn't voted
      if(!voted){
        // option is going to be each key after looping through the users input 
        const votedFor = option[1]
      
        // finding what the user voted for in the poll
        const found = poll.candidates.find(opt => opt.name === votedFor)
        
        // if the option is present in the poll, then increase vote by one and re-calculate the percentage and total votes
        if(found){
          found.votes+=1
          poll.candidates.map(opt => {
            poll.totalVotes = poll.candidates.map(opt=> opt.votes).reduce((total, num)=>total+num)
            
            opt.percentage = (opt.votes/poll.totalVotes)*100
            opt.percentage = opt.percentage.toFixed(2)
          }) 
          // you can also create a seperate model for voters if the whole poll is connected
          poll.voted.push({name:voter})
          poll.save()
          msg.push(`hey ${voter}, your vote for ${option[0]} has been counted, thank you`)
        } else{
          msg.push(`${option[1]}  doesn't exist`) 
        }
      }
    } else if (!poll && option[0] !== "voter"){
        msg.push(`${option[0]}  doesn't exist`) 
    }
      
    })  
    res.status(200).json({
      status:true,
      message:msg,
      data:data,
    })
  }catch(err){
    res.status(500).json({
      status:false,
      err:err.message,
    })
  }
}