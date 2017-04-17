/**
 * Created by Administrator on 2017/4/14.
 */

const express = require('express');
const session = require('express-session');
let http = express();
const cookie=require('cookie-parser');
let bodyParser = require('body-parser');
let jsonParse=bodyParser.json({'Content-Type':'application/json'});
http.use(bodyParser.urlencoded({extended: false}));
http.use(jsonParse);
http.use(express.static('public'));
http.use(cookie());
http.use(session({
	name:"hnblog_session",
	resave: true, 
  	saveUninitialized: true, 
  	rolling:true,
  	secret: 'love' ,
  	cookie:{
		maxAge: 1000*60*60*24 // default session expiration is set to 1 hour
	},
}));
http.use(function(req,res,next){
	req.session.save();
	next();
})
module.exports = http;
let control = require('./control/index.js');
http.get('/',function(req,res){
	if(req.session.login){
		res.writeHead(302,{Location:'./src/index/html/index.html'})
	}else{
		res.writeHead(302,{Location:'./src/login/html/index.html'})
	}
	
	res.end();
});
http.post('/user/',function(req,res){
	var data = {
		loginID : req.session.login,
	}
	res.send(data);
	res.end();
});
http.listen(80,'127.0.0.1',function(err){
	if(err){
		console.log(err)
	}
});

