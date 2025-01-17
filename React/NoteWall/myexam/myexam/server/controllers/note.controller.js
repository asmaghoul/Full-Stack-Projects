const NoteSchema = require("../models/note.model");

//? Read All

module.exports.FindAllNotes = (req, res) => {
  NoteSchema.find()
    .sort({ createdAt: 1 })
    .then((AllNotes) => {
      console.log(AllNotes);
      res.json(AllNotes);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//? Create

module.exports.CreateNewNote = (req, res) => {
  console.log(req.body);
  NoteSchema.create(req.body)
    .then((CreateNote) => {
      console.log(CreateNote);
      res.json({ newNote: CreateNote });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//? Read One

module.exports.FindOneSingleNote = (req, res) => {
  NoteSchema.findOne({ _id: req.params.NoteId })
    .then((oneSingleNote) => {
      res.json(oneSingleNote);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//? DELETE

module.exports.deleteAnExistingNote = (req, res) => {
  NoteSchema.deleteOne({ _id: req.params.NoteId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//? UPDATE

module.exports.updateExistingNote = (req, res) => {
  console.log(req.body);
  NoteSchema.findOneAndUpdate({ _id: req.params.NoteId }, req.body, {
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
// Display Random Note
module.exports.FindRandomNote = (req, res) => {
  NoteSchema.aggregate([{ $sample: { size: 1 } }])
    .then((randomNote) => {
      console.log(randomNote);
      res.json(randomNote[0]); // Assuming the result is an array with a single element
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
