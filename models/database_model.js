const mongoose = require("mongoose");

const url = "mongodb://localhost/test";

const connection = mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(error){
        if(error) console.log("Error connecting database");
        else console.log("Successfully connected to the database");
    });

module.exports = connection;

