//引入CSS
import '../../public/css/base.css';
import '../../public/css/bootstrap.css';
import '../css/main.css';
import HN_USER from '../../public/js/function.js';
//
import head from '../../components/header.vue';
import screen from '../../components/screen.vue';
let $_$ = require('../../public/js/baseClass.js');
const base  = new $_$();
const search = base.urlParse();
var app = new Vue({
	el:"#app",
	data:{		
		author_title:"",
		author:"刘石磊",
		add_title:"如何写好代码",
		docHtml:'',
		login:'',
		classify:[],
		FEorServer_find:"FE",
		doc_classify:"",
		doc_limits:"public",
	},
	methods:{
	async get_model_fun(){
			var url = "/get_module/";
			var data = {
				FEorServer:this.FEorServer_find,
			}				
			let res = await base.$ajax(url,data);
			if(res.status == 800){
				this.classify = res.data;
			}else{
				this.classify = [];
			}
			this.doc_classify = res.data[0].title
		},
		add_img(){
			var src = "123"
			$('#imgInput').click();
//			$('#content_text').append(`<img src="${$('#imgInput').val()}">`)
//			this.docHtml = `${this.docHtml}<img src="${src}">`
		},
		
		async save(){
			var url = "/save_doc/";
			var data = {
				author : this.author,
				htmlCode : $('#content_text').html(),
				limit : this.doc_limits,
				classify : this.doc_classify,
				title : this.author_title+this.add_title,
				FEorServer : this.FEorServer_find,
			}
			let res = await base.$ajax(url,data)
			if(res.status == 800){
				window.location.href="/src/index/html/index.html";
			}else{
				alert('Sorry,fail to add');
			}
//			$('.console input').each(function(){
//				if($(this).val()){
//					data.file.push($(this).val())
//				}
//			});
//			$.ajaxFileUpload({
//				fileElementId:"uploadform",
//		        url : '/upload_file/', // 提交目标, 默认取自form的action
//		        type : 'POST', // 提交方式 默认取自form 或者GET
//		        // dataType:'json',
//		        success:async function(res){
//		        	console.log(res)
//					if(res.status == 800){
//						let result = await base.$ajax(url,data);
//					}else{
//						
//					}
//		        },
//		        error:function(msg){
//		        	
//		        }
//			});

			
		}
	},
	created(){
		this.get_model_fun();
		this.author_title = this.author+"的分享----"
	},
	components:{
		'he':head,
		'screen':screen
	}
});
(function(){
	var doc = $(document);
	doc.on('click','#add_img',function(){
		var test = 0 ;
		$('.console input').each(function(index){
			if(!$(this).val()){
				$(this).click();
			}else{
				test++
			}
		})
		if(test == $('.console input').length){		            
			$('.console #uploadform').prepend(`<input class="choose-file" type="file" name="fileupload" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display:none">`);
			$('.console #uploadform input').eq(0).click();
		}
	});
	doc.on('change','.console input',previewImage);	
//	$('.console #uploadform input').on('change',function(){
//		var validSuffix = ['jpg','png','gif']; //定义允许上传的下标
//		var file = $(this).val(); //获取文件的名字
//		var suffix = file.split('.').pop(); //获取文件的后缀
//		if(suffix == '') return;
//		if(validSuffix.indexOf(suffix)  == -1){
//			$(this).attr('value','');
//			return false;
//		}
//		upload(); //上传
//	});
	function upload (){
		$('#uploadform').ajaxSubmit({
	        url : '/upload_file/', // 提交目标, 默认取自form的action
	        type : 'POST', // 提交方式 默认取自form 或者GET
	        // dataType:'json',
	        success:function(res){
	        	
	        },
	        error:function(msg){
	        	
	        }
		});
	}
//	doc.on('click','#blod',function(){
//		if(!$(this).hasClass('selected')){
//			$(this).addClass('selected');
//		}else{
//			$(this).removeClass('selected');
//		}
//		
//	});
//	doc.on('focus','#content_text span',function(event){
//		if($('#blod').hasClass('selected') && !$(this).hasClass('blod'))
//		{
//			var html = $(this).html();
//			var cur = getCursorPos($(this));
//			var leftHtml = html.substring(0,cur);
//			var rightHtml = html.substring(cur,html.length);
//			$(this).after(`<span>${leftHtml}</span><span class="blod"></span><span>${rightHtml}</span>`);
//			$(this).next().focus();
//			$(this).remove();
//		}
//		if(!$('#blod').hasClass('selected') && $(this).hasClass('blod'))
//		{
//			$('#blod').addClass('selected')
//			var html = $(this).html();
//			var cur = getCursorPos($(this));
//			var leftHtml = html.substring(0,cur);
//			var rightHtml = html.substring(cur,html.length);
//			$(this).after(`<span contenteditable="true">${leftHtml}</span><span contenteditable="true" class="blod"></span><span contenteditable="true">${rightHtml}</span>`);
//			$(this).next().focus();
//			$(this).remove();
//		}
//		event.stopPropagation();
//	})
//	doc.on('focus','#content_text',function(){
//		if($(this).find('div').length==0){
//			$(this).append('<div contenteditable="true"><span contenteditable="true"></span></div>')
//		}
//		$(this).find('div:last').find('span:last').focus();
//	});
//	doc.on('keyup','#content_text',function(event){
//		event.preventDefault();
//		event.stopPropagation();
//		if(event.keyCode == 13){
//			$(this).append('<div><span></span></div>');
//			$(this).find('div:last').find('span:last').focus();
//			
//		}
//		
//	})
})()
function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function (event) {
        $('#content_text').append(`<img style="display:block;max-width:95%" src="${event.target.result}">`);
    };
    reader.readAsDataURL(event.target.files[0]);
}
function getCursorPos(){
	return ele.get(0).selectionStart
}
