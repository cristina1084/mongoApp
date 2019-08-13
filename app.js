var express = require('express');
var path = require('path');

var app = express();

var emprouter = require('./routes/emprouter');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res)=>{
  res.render("index");
})

app.use('/emp', emprouter);

app.listen(8080,()=>{
  console.log("Listening");
})