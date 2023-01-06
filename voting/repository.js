const Poll = require("./model")

exports.poll = async()=>{
  const poll = await Poll.find({})
  return poll
}

exports.addPoll = async (payload)=>{
  const addedPoll = await Poll.create(payload)
  return addedPoll
}

exports.findPoll = async (poll)=>{
  const foundPoll = await Poll.findOne({name:poll})
  return foundPoll
}
exports.deletePoll = async (poll)=>{
  const delPoll = await Poll.findOneAndDelete({name:poll})
  return delPoll
}