//引入CSS
import '../../public/css/base.css';
import '../../public/css/bootstrap.css';
import '../css/main.css';
//import HN_USER from '../../public/js/function.js';
//
import head from '../../components/header.vue';
import screen from '../../components/screen.vue';
let $_$ = require('../../public/js/baseClass.js');
const base  = new $_$();
const search = base.urlParse();
var app = new Vue({
	el:"#app",
	data:{
		docHtml:"",
		login:'',
	},
	methods:{
		async get_html_code(){
			var url = "/get_doc/";
			var data = {
				id : search.id
			};
			let res = await base.$ajax(url,data);
			if(res.status == 800){
				$('#content_text').html(res.data[0].docHTML);
			}else{
				$('#content_text').html('');
			}
		},
		
	},
	created(){
		this.get_html_code()	
	},
	components:{
		'he':head,
		'screen':screen
	}
})