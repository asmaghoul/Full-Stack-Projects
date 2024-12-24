const mongoose = require("mongoose");

const Note = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "the title is required"],
      minlength: [2, "title must be at least 2 characters long"],
    },
    body: {
      type: String,
      required: [true, "the body is required"],
      maxlength: [255, "the body must not exceed 255 characters"],
    },
  },
  { timestamps: true }
);

const NoteSchema = mongoose.model("NoteSchema", Note);

module.exports = NoteSchema;
