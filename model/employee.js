var mongo = require('mongoose');

var schema = mongo.Schema;

var empSchema = new schema({
    eid:{type:String, required:true},
    name:String,
    salary:Number
})

var empModel = mongo.model("employee", empSchema); //add third parameter to forcefully create a collection with the name specified

module.exports = empModel;