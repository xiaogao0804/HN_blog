interface obj
{
	
};
interface fun {
	(res:obj):void;
};

class $_${
	private g_request:number;
	public author:string;
	constructor(){
		this.author = 'jarvan';
		this.g_request = 0;
	}
	public $ajax<T extends fun>(url:string,data:obj,reslove:fun,reject?:fun):Promise{		
		var promise = new Promise(function(reslove:fun,reject?:fun):any{
			if(this.g_request == 1){
				return false;
			}		
			$.ajax({
				url:url,
				data:data,
				type:"POST",
				success(res){
					console.log(res);
					reslove(res);
					this.g_request == 0;
				},
				error(res){
					reject(res);
					this.g_request == 0;
				}
			})
		});
		return promise;
		
	}
	public urlParse():obj{
		var search=location.search.substring(1,location.search.length);
		var arr = search.split('&');
		var obj = {};
		arr.forEach(function(item,index){
			let arr = item.split('=');
			obj[arr[0]] = arr[1];
		})
		return obj;
	}
	public objToJson(obj:obj,index?:string){
		var str = ``;
		if(typeof obj == "object" && (!(obj instanceof Array))){
			for(var i in obj){
				if(typeof obj[i] != "object"){						
					str+=`${i}=${obj[i]}&`;
				}else{
					str+=this.objToJson(obj[i],i);
				}	
			}
		}else if(typeof obj == "object" && (obj instanceof Array) && index){
			for(var i in obj){
				if(typeof obj[i] != "object"){						
					str+=`${index}[${i}]=${obj[i]}&`;
				}else{
					str+=this.objToJson(obj[i]);
				}	
			}
		}else if((obj instanceof Array) && (!index)){
			for(var i in obj){
				if(typeof obj[i] != "object"){						
					str+=`Array[${i}]=${obj[i]}&`;
				}else{
					str+=this.objToJson(obj[i]);
				}	
			}
		}
		return str
	}
	public $setValue(ele:obj|string, value:string):void {
		$(ele).val(value)
	}
	public $getValue(ele:obj|string):string {
	    if ($(ele).val() == "") {
	        return "";
	    } else {
	        return this.stripscript($(ele).val().trim());
	    }
	}
	public stripscript(str:string):string{
		if(str == undefined){
			return '';
		}
		str = str+'';
		if(str.length <= 0){
	    	return '';
		}
		
		// str = str.toLowerCase();
		if(str.indexOf('<script') >= 0 ){
			str =  str.replace(/<script.*?>.*?<\/script>/ig,'');
	    	str =  str.replace(/<script.*?>/ig,'');
		}
	
		if(str.indexOf('</script>') >= 0){
			str =  str.replace(/<\/script>/ig,'');
		}
		return str;
	}
	public $pl_set_value(input:obj[], data:any[]):void {
	    let index = 0;
	    data?plSet():plClear();
	    function plClear() {
	        $(input[index]).val('');
	        ++index;
	        if (index == input.length) {
	            return false;
	        } else {
	            plClear();
	        }
	    }
	    function plSet() {
	        $(input[index]).val(data[index]);
	        ++index;
	        if (index == input.length) {
	            return false;
	        } else {
	            plSet();
	        }
	    }
	}

}
//export default $_$;
module.exports = $_$