/**
 * Created by Administrator on 2017/4/14.
 */
let http = require('../../index.js');
let db = require('../../Model/mongoose.js').db;
let loginSchema = require('../../Model/login_db.js').loginSchema;
// import base from '../../function/function.js';
http.post('/Memberlogin/*',function(req,res){
	var login_model = db.model('login',loginSchema);
	var data = {
		loginID:req.body.loginID,
		loginPassword:req.body.loginPassword
	}
	login_model.find(data,function(err,data){
		if(err)console.log(err);
		if(data){
			req.session.login = data[0];
			var send = {
				data:data[0],
				status:800,
				info:'登陆成功'
			}
		}else{
			var send = {
				data:{},
				status:400,
				info:'账号或密码错误'
			}
		}		
		res.send(send);
		res.end();
	})	
});
var result = true;
module.exports = result;
