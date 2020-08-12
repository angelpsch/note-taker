const notes = require("../db/db.json");
const router = require("express").Router();
const fs = require("fs");


router.get("/notes", (req, res) => {
  res.json(notes);
})
  .post("/notes", (req, res) => {
    notes.forEach(note => {
      note.id++;
    });
    const newNote = req.body;
    newNote.id = 1;
    notes.unshift(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
      if (err) throw err;
      console.log("File saved");
    });
    res.end();
  });


router.delete("/notes/:id", (req, res) => {
  const chosenId = req.params.id - 1;
  notes.splice(chosenId, 1);
  for (let i = chosenId; i < notes.length; i++) {
    notes[i].id--;
  }
  fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
    if (err) throw err;
    console.log("File deleted");
  });
  res.end();
});

module.exports = router;