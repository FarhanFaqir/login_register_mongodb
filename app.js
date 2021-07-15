const express = require("express");
const app = express();
const userRouter = require("./routes/user_route");

require("./models/database_model.js");

app.use(express.json());

app.use("/user", userRouter);

app.get('/', function(req, res){
    res.send("Farhan");
});

const port = 3000;
app.listen(port, function(){
    console.log("App is running on port "+port);
});