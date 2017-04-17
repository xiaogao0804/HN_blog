var mongoose=require('mongoose');
var db = mongoose.createConnection('localhost','HNblog');
var Schema=mongoose.Schema;
exports.db = db;
exports.Schema = Schema;