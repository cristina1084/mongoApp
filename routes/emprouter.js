var exp = require('express');
const router = exp.Router();    
var mongo = require('mongoose')

var url = "mongodb://localhost/sdb"

var emp = require('../model/employee');

mongo.connect(url,(err)=>{
    if(err) throw err;
    else console.log("Database connected");
})

router.get("/new",(req,res)=>{
    res.render("new");
})

router.get("/view",(req,res)=>{
    res.render("view");
})

router.post("/add",(req,res)=>{
    var e1 = new emp();
    e1.eid = "E001";
    e1.name = "Cristina";
    e1.salary = 20000;
    e1.save();        //insert data
    res.send("Employee added");
})

module.exports = router;