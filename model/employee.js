var mongo = require('mongoose');

var schema = mongo.Schema;

var empSchema = new schema({
    eid:{type:String, required:true},
    name:String,
    salary:Number
})

var empModel = mongo.model("employee", empSchema);

module.exports = empModel;