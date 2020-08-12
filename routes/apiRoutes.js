const notesData = require("../db/db.json");
const router = require("express").Router();
const fs = require("fs");


router.get("/notes", (req, res) => {
  res.json(notesData);
})
  .post("/notes", (req, res) => {
    notesData.forEach(note => {
      note.id++;
    });
    const newNote = req.body;
    newNote.id = 1;
    notesData.unshift(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notesData), err => {
      if (err) throw err;
      console.log("File saved");
    });
    res.end();
  });


router.delete("/notes/:id", (req, res) => {
  const chosenId = req.params.id - 1;
  notesData.splice(chosenId, 1);
  for (let i = chosenId; i < notesData.length; i++) {
    notesData[i].id--;
  }
  fs.writeFile("./db/db.json", JSON.stringify(notesData), err => {
    if (err) throw err;
    console.log("File deleted");
  });
  res.end();
});

module.exports = router;