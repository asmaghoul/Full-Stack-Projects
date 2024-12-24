const PollS = require("../models/poll.model");

//? Read All

//module.exports.FindAllPoll = (req, res) => {
// PollS.find({})
//   .then((AllPolls) => {
//     console.log(AllPolls);
//    res.json(AllPolls);
// })
// .catch((err) => {
//   res.status(400).json(err);
//  });
//};

module.exports.FindAllPoll = async (req, res) => {
  try {
    // Step 1: Fetch all polls
    const allPolls = await PollS.find({});

    // Step 2: Calculate the sum of votes for each poll's options
    const pollsWithTotalVotes = allPolls.map((poll) => {
      const totalVotes = poll.options.reduce(
        (sum, option) => sum + option.votes,
        0
      );
      return { ...poll.toObject(), totalVotes };
    });

    // Step 3: Sort polls by total votes in descending order
    const sortedPolls = pollsWithTotalVotes.sort(
      (a, b) => b.totalVotes - a.totalVotes
    );

    // Step 4: Separate top three polls and remaining polls
    const topThreePolls = sortedPolls.slice(0, 3);
    const remainingPolls = sortedPolls.slice(3);

    // Step 5: Sort remaining polls by chronological order (recent first)
    const sortedRemainingPolls = remainingPolls.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    // Step 6: Combine top three polls and sorted remaining polls
    const finalSortedPolls = topThreePolls.concat(sortedRemainingPolls);

    res.json(finalSortedPolls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//? Create

module.exports.CreateNewPoll = (req, res) => {
  console.log(req.body);
  PollS.create(req.body)
    .then((CreatePoll) => {
      console.log(CreatePoll);
      res.json({ newPoll: CreatePoll });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//? Read One

module.exports.FindOneSinglePoll = (req, res) => {
  PollS.findOne({ _id: req.params.pollId })
    .then((oneSinglePoll) => {
      res.json(oneSinglePoll);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//? DELETE

module.exports.deleteAnExistingPoll = (req, res) => {
  PollS.deleteOne({ _id: req.params.pollId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//? UPDATE

module.exports.updateExistingPoll = (req, res) => {
  console.log(req.body);
  PollS.findOneAndUpdate({ _id: req.params.pollId }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => {
      res.json({ done: result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
// Vote for an option
module.exports.voteForOption = async (req, res) => {
  try {
    const { pollId, optionId } = req.params;

    // Find the poll by ID
    const poll = await PollS.findById(pollId);

    // Find the option in the poll's options array
    const option = poll.options.id(optionId);

    if (!option) {
      return res.status(404).json({ error: "Option not found" });
    }

    // Increment the votes for the selected option
    option.votes++; // Increment the votes property for the selected option

    // Save the updated poll
    const updatedPoll = await poll.save();

    res.json(updatedPoll);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
