/**
 * Created by Administrator on 2017/4/14.
 */
let http = require('../../index.js');
let db = require('../../Model/mongoose.js').db;
let classifySchema = require('../../Model/index_db.js').classifySchema;
let docSchema = require('../../Model/index_db.js').docSchema;


http.post('/add_module/*',function(req,res){
	if(!req.body){
		return res.sendStatus(404);
	}
	var find = {
		FEorServer : req.body.FEorServer,
		title : req.body.title,
	}
	var class_model = db.model('classify',classifySchema)
	class_model.find(find,function(err,data){
		if(err) throw err;
		if(data.length == 0){
			var saveData = {
//				author : req.session.login.login,
				FEorServer : req.body.FEorServer,
				title : req.body.title,
			}
			savedata_model = new class_model(saveData);
			savedata_model.save(function(err){
				if(err) throw err;
				res.send({
					info:"add success",
					status:800,
					data:""
				})
				res.end();
			});
		}else{
			res.send({
				info:"已存在的模块名",
				status:400,
				data:""
			})
			res.end();
		}
	})
});
http.post('/get_module/*',function(req,res){
	if(!req.body){
		return res.sendStatus(404);
	}
	var find = {}
	if(req.body.FEorServer!="All"){
		 find = {
			FEorServer : req.body.FEorServer,
		}
	}

	var class_model = db.model('classify',classifySchema);
	class_model.find(find,function(err,data){
		if(err) throw err;
		if(data.length == 0){
			res.send({
				info:"该分类暂时没有模块",
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
	
})
http.post('/remove_doc/*',function(req,res){
	if(!req.body.id){
		res.send({
			info:"缺少参数",
			status:400,
			data:[],
		});
		res.end();
		return
	}
	var doc_model = db.model('document',docSchema);
	doc_model.remove({_id:req.body.id},function(err){
		if(err) throw err;
		res.send({
				info:'移除成功',
				status:800,
				data:[],
			});
	})
	
})
http.post('/get_doc_list/*',function(req,res){
	if(!req.body){
		return res.sendStatus(404);
	}
	var find = {}
	if(req.body.FEorServer && req.body.FEorServer != "All"){
		find.FEorServer  = req.body.FEorServer;				
	}
	if(req.body.classify && req.body.classify != "All"){
		find.classify = req.body.classify;
	}
	if(req.body.limit && req.body.limit != "All"){
		find.limits= req.body.limit;
	}
	var doc_model = db.model('document',docSchema);
	doc_model.find(find,null,{skip: 20*(+req.body.page-1), limit: 20, sort:{ "_id":-1}},function(err,data){
		if(err) throw err;
		if(data.length == 0){
			res.send({
				info:"没有查询到数据",
				data:[],
				status:400
			});
			
		}else{
			let sendData = {
				info:"获得成功",
				data:[],
				status:800
			}
			data.forEach(function(item,index){
				sendData.data.push({
					id:item._id,
					title:item.title,
					time:item.time,
					limit:item.limit,//拼写错误
				});
			})
			res.send(sendData);
		}
		res.end();
	})
	
});
http.post('/edit_module/*',function(req,res){
	if(!req.body){
		return res.sendStatus(404);
	}
	var class_model = db.model('classify',classifySchema);
	class_model.update({'title':req.body.old_module},{'$set':{'title':req.body.new_module}},
	function(err){
		if(err) throw err;
		var doc_model = db.model('document',docSchema);
		doc_model.update({'classify':req.body.old_module},
		{'$set':{'classify':req.body.new_module}},function(err){
			if(err) throw err;
			res.send({
				info:"更改成功",
				status :800,
				data:{
					old:req.body.old_module,
					"new" : req.body.new_module
				}
			})
		})
	})	
});
http.post('/remove_module/*',function(req,res){
	if(!req.body){
		return res.sendStatus(404);
	}
	var class_model = db.model('classify',classifySchema);
	console.log({'title':req.body.classify})
	class_model.remove({'title':req.body.classify},function(err){
		if(err) throw err;
		var doc_model = db.model('document',docSchema);
		doc_model.remove({'classify':req.body.classify},function(err){
			if(err) throw err;
			res.send({
				info:"删除成功",
				status :800,
				data:{}
			})
		})
	})	
})
var result = true;
module.exports = result;
