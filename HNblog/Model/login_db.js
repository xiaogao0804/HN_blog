var Schema = require('./mongoose.js').Schema;
var loginSchema = new Schema({
	loginID:String,
	loginPassword:String,
	userid:String,
	login_name:String,
});
exports.loginSchema = loginSchema;