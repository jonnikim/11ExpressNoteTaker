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
  console.log(newNote);
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

app.delete("/api/notes/:id", function (req, res) {
  const target = req.params.id;
  console.log(target);
  // fs.readFile("./db/db.json", function (err, data) {
  //   console.log(req.params.id);
  //   console.log(data);
  // });
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
