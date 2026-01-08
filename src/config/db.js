const mongoose = require("mongoose");

function MongoDbConnection() {
  mongoose
    .connect("mongodb://localhost:27017/interviewPractice")
    .then(function () {
      console.log("✅MongoDb Connected");
    })
    .catch(function (error) {
      console.log("❌MongoDb Connection Error");
    });
}

module.exports = {MongoDbConnection}