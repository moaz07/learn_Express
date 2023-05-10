const express = require("express");
const server = express();

// Create middleware
const timeCheck = (req, res, next) => {
  const today = new Date().getDay();
  const hour = new Date().getHours();
  if ([1, 2, 3, 4, 5].includes(today) && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.sendFile(__dirname + "/public/noService.html");
  }
};

// Use folder
server.use(express.static("public"));

// Get Pages
server.get("/", (req, res) => {
  res.redirect("/home");
});

server.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

server.get("/service", timeCheck, (req, res) => {
  res.sendFile(__dirname + "/public/service.html");
});

server.get("/contact", timeCheck, (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

// Create Server port
server.listen(3000, () => {
  console.log("Server is up !");
});
