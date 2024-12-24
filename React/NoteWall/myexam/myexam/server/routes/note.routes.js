const NoteController = require("../controllers/note.controller");

module.exports = (app) => {
  app.get("/api/note", NoteController.FindAllNotes);
  app.get("/api/note/rand", NoteController.FindRandomNote);
  app.get("/api/note/:NoteId", NoteController.FindOneSingleNote);
  app.patch("/api/note/:NoteId", NoteController.updateExistingNote);
  app.post("/api/note", NoteController.CreateNewNote);
  app.delete("/api/note/:NoteId", NoteController.deleteAnExistingNote);
};
