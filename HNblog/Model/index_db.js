var Schema = require('./mongoose.js').Schema;
var classifySchema = new Schema({
	author : String,
	FEorServer : String,
	title : String,
});
var docSchema = new Schema({
	author : String,
	author_id : String,
	FEorServer : String,
	classify : String,
	docHTML : String,
	limits : String,
	title : String,
	time : String,
	img : String
});
exports.classifySchema = classifySchema;
exports.docSchema = docSchema;
