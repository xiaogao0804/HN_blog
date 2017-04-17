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
var app = new Vue({
	el:"#app",
	data:{
		login : "123",		
		login_name : "321",
		page:1,
		FEorServer:"",
		classify:"123",
		doc:[],
		remove_sure_show:false,
		remove_id:"",
		state : {}
	},
	methods:{
		async get_page_list(data){
			var url = "/get_doc_list/";
			var postData = {
				page:this.page,
				FEorServer:data.FEorServer,
				classify:data.classify,
				limit:data.limit
			};
			this.state = JSON.parse(JSON.stringify(postData));
			let res = await base.$ajax(url,postData);
			if(res.status == 800){
				this.doc = res.data;
			}else{
				this.doc = [];
			}
		},
		async remove_sure(){
			var url = '/remove_doc/'
			var data = {
				id:this.remove_id
			}
			let res = await base.$ajax(url,data)
			if(res.status == 800){
				this.get_page_list(this.state);
				this.remove_pop_show = false;
			}else{
				alert('Sorry,remove the faile');
			}
		},
		remove_pop(data){
			this.remove_sure_show = true;
			this.remove_id = data.id;
		}
	},
	created(){
		var data = {
			FEorServer:'All',
			classify:'All',
			limit:'All'
		}
		this.get_page_list(data);
	},
	components:{
		'he':head,
		'screen':screen
	}
})