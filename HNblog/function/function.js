/**
 * Created by Administrator on 2017/4/14.
 */
const fs = require('fs');
class base {
	read(){
		return new Promise(function(reslove,reject){
			fs.readFile(path,'utf-8',function(err,str){
				if(err){console.log(err)}
				reslove(str);
			})
		});
	};
}
