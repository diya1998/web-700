/*********************************************************************************
 * WEB700 – Assignment 03
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
 * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: Diksha Deoli Student ID: 110395225 Date: 17th of Feb 2023
 *
 ********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var app = express();

app.use(express.static('public'))


const collegeData = require("./modules/collegeData.js");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
 {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/htmlDemo", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/homeDemo.html"));
});

app.get("/students/add", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/addStudent.html"));
});

app.post("/students/add", (req, res) => {
  collegeData.addStudent(req.body);
  res.redirect("/students");
});

app.get("/students", (req, res) => {
  if (req.query.course) {
    collegeData
      .getStudentsByCourse(req.query.course)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json({ Message: err });
      });
  } else if (!req.query.course) {
    collegeData
      .getAllStudents()
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json({ Message: err });
      });
  }
});

app.get("/tas", (req, res) => {
  collegeData
    .getTAs()
    .then(function (TAs) {
      res.json(TAs);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/courses", (req, res) => {
  collegeData
    .getCourses()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "no results found " });
    });
});

app.get("/student/:num", (req, res) => {
  collegeData
    .getStudentByNum(req.params.num)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.use((req, res, next) => {
  res.status(404).send("Page Not Found Error");
});

collegeData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("Listing server at port: " + HTTP_PORT);
    });
  })
  .catch((err) =>
   {
    console.log(err);
  });
