const router = require("express").Router()
const{
  poll,
  addPoll,
  deletePoll,
  addPollOption,
  delPollOption
}= require("./controller")

router.get("/poll", poll)
router.post("/poll", addPoll)
router.delete("/poll", deletePoll)

router.put("/poll/option", addPollOption)
router.delete("/poll/option", delPollOption)
// router.post("/poll", dellPoll)
module.exports = router