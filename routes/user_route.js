const express = require("express");
const router = express.Router();
const User = require("./../models/user_model");

router.get("/getbyid:id", function(req, res){
    var id = req.params.id;
    User.findById(id,function(error,user){
      if(error) res.json({ code: 500, msg: "Error", data: [] });
      else res.json({ code: 200, msg: "success", data: user });
    });
});

router.post("/add", async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var contact = req.body.contact;
  var address = req.body.address;
 
  if(name == null)  res.json({ code: 403, msg: "Name missing", data: [] });
  else if(email == null)  res.json({ code: 403, msg: "Email missing", data: [] });
  else if(password == null)  res.json({ code: 403, msg: "Password missing", data: [] });
  else {
    User.findOne({ email: email }, function (error, user) {
      if (error) res.send("Error");
      else if(user != null && name == user.name) res.json({ code: 403, msg: "Name already taken", data: [] });
      else if (user != null && email == user.email) res.json({ code: 403, msg: "Email already exist", data: [] });
      else {
        var user = {
          name: name,
          email: email,
          password: password,
          address: address,
          contact: contact,
        };

        User.create(user, function (error, user) {
          if (error) res.json({ code: 500, msg: "Error", data: [] });
          else {
            res.json({ code: 200, msg: "success", data: user });
          }
        });
      }
    });
  } 
});

router.get("/get", function (req, res) {
  User.find({}, function (error, user) {
    if (error) res.json({ code: 500, msg: "Error", data: [] });
    else res.json({ code: 200, msg: "success", data: user });
  });
});

router.post("/login", function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    if(email == null) res.json({ code: 403, msg: "Email missing", data: [] });
    else if(password == null) res.json({ code: 403, msg: "Password missing", data: [] });
    else {
        User.findOne({email: email}, function(error, user){
            if(error) res.json({ code: 500, msg: "Error", data: [] });
            else if( email == user.email && password == user.password && user.status == 1) res.json({ code: 200, msg: "success", data: user });
            else res.json({code: 403, msg: "Invalid credentials", data: [] });
        });
    }
});

module.exports = router;
 