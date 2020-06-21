// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const database = require("./db/db.json");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3003;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Basic route that sends the user first to the AJAX Page

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", function (req, res) {
  let newNote = req.body;
  for (let i = 0; i < database.length; i++) {
    newNote.id = i + 1;
  }
  database.push(newNote);
  fs.readFile("./db/db.json", function (err, data) {
    const json = JSON.parse(data);
    json.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(json), function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  });
  res.json(true);
});
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let arr = JSON.parse(data);
    let deletedArray = arr.filter((x) => x.id != req.params.id);
    let json = JSON.stringify(deletedArray);
    res.json(database);
    fs.writeFile("./db/db.json", json, (err, data) => {
      if (err) throw err;
      console.log("Note Succesfully deleted from Json File");
    });
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
