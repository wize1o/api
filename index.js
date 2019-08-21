//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var crypCurr = req.body.crypto;
  var money = req.body.fiat;
  var amt = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypCurr,
      to: money,
      amount: amt
    }
  };

  request(options, function(error, response, body) {
    //this is where you put the items from the response
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;
    //write everything you want to this and display with res.send
    res.write("<p>The current date is " + currentDate + "</p>");

    res.write(
      "<h1>" + amt + " of " + crypCurr + " is " + price + " " + money + "</h1>"
    );
    //res.send needs to be the last thing
    res.send();

    console.log(price);
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
