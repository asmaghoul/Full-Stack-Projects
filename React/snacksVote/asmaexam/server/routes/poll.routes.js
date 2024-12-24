const PollController = require("../controllers/poll.controller");

module.exports = (app) => {
  app.get("/api/poll", PollController.FindAllPoll);
  app.get("/api/poll/:pollId", PollController.FindOneSinglePoll);
  app.post("/api/poll", PollController.CreateNewPoll);
  app.patch("/api/poll/:pollId/vote/:optionId", PollController.voteForOption);
  app.patch("/api/poll/:pollId", PollController.updateExistingPoll);
  app.delete("/api/poll/:pollId", PollController.deleteAnExistingPoll);
};
