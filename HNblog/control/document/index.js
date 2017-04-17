/**
 * Created by Administrator on 2017/4/14.
 */
let formidable = require("formidable");
let http = require('../../index.js');
let db = require('../../Model/mongoose.js').db;
let docSchema = require('../../Model/index_db.js').docSchema;
let fs = require('fs')
http.post('/get_doc/',function(req,res){
	if(!req.body){
		return res.sendStatus(404);
	}
	if(!req.body.id){
		res.send({
			info:"缺少必要id参数",
			data:"",
			status:200
		});
		res.end()
		return false
	}
	var find = {
		_id : req.body.id
	}
	let doc_model = db.model('document',docSchema)
	doc_model.find(find,function(err,data){
		if(err) throw err;
		if(data.length == 0){
			res.send({
				info:"没有查到相关的数据",
				status:600,
				data:[]
			})
		}else{
			res.send({
				info:"获取成功",
				status:800,
				data:data,
			});
		}
		res.end();
	})
});
http.post('/save_doc/*',function(req,res){
	var send = {
		info:"缺少参数",
		status : 400,
		data: [],
	}
	if(!req.body.FEorServer || !req.body.classify || !req.body.htmlCode || !req.body.limit){
		res.send(send);
		res.end();
		return;
	}
	var obj = {
		author : req.body.author,
//		author_id : req.session.login._id?req.session.login._id:'',
		FEorServer : req.body.FEorServer,
		classify : req.body.classify,
		docHTML : req.body.htmlCode,
		limits : req.body.limit,
		title : req.body.title,
		time : nowTime(),
		img : "",
	}
	doc_model = db.model('document',docSchema);
	var newDoc = new doc_model(obj);
	newDoc.save(function(err){
		if (err) throw err
		res.send({
			info:"保存成功",
			status : 800,
			data: [],
		});
		res.end();
	});	
});
http.post('/upload_file/',function(req,res){
	var form = new formidable.IncomingForm({
			encoding:"utf-8",
	        uploadDir:"../../public/src/Public/upload",  //文件上传地址
	        keepExtensions:true  //保留后缀
	});
	var obj={};
//	form.parse(req)
//	.on('file', function(name, file) {  //文件
//      obj[name] = file;
//      console.log(obj)
//  })
	form.parse(req, function(err, fields, files) {
		if (err) {
		  throw err;	
		}  	   
		var extName = '';  //后缀名
		console.log(files);
//		switch (files.fulAvatar.type) {
//			case 'image/pjpeg':
//				extName = 'jpg';
//				break;
//			case 'image/jpeg':
//				extName = 'jpg';
//				break;		 
//			case 'image/png':
//				extName = 'png';
//				break;
//			case 'image/x-png':
//				extName = 'png';
//				break;		 
//		}
//		var avatarName = Math.random() + '.' + extName;
//		var newPath = form.uploadDir + avatarName;
//		fs.renameSync(files.fulAvatar.path, newPath);  //重命名
	});
	res.send({
		info : '上传成功',
		data : [],
		status : 800
	});
	res.end();
});
function nowTime(time){
	if(time){
		var obj = new Date(time);
	}else{
		var obj = new Date();
	}
	
	var year = obj.getFullYear();
	var mounth = obj.getMonth()+1;
	var day = obj.getDate();
	var hours = obj.getHours()+1;
	var min = obj.getMinutes();
	var str = `${year}-${mounth}-${day} ${hours}:${min}`;
	return str
}
var result = true;
module.exports = result;
