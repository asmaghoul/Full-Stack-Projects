const mongoose = require("mongoose");

const Poll = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "The Title is required"],
      minlength: [10, "The question must be 10 characters or more"],
    },
    options: [
      {
        optionText: {
          type: String,
          required: [true, "Option text is required"],
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
      {
        optionText: {
          type: String,
          required: [true, "Option text is required"],
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
      {
        optionText: {
          type: String,
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
      {
        optionText: {
          type: String,
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const PollS = mongoose.model("PollSchema", Poll);

module.exports = PollS;
