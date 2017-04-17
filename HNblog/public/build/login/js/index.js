//引入CSS
import '../../public/css/base.css';
import '../../public/css/bootstrap.css';
import '../css/main.css';
//
import head from '../../components/header.vue';
let $_$ = require('../../public/js/baseClass.js');
const base  = new $_$();
var app = new Vue({
	el:"#app",
	data:{
		loginID:"",
		loginPassword:"",
		hintMessage:"",
	},
	methods:{
		async memberLogin(){
			let url = "/Memberlogin/";
			let data = {
				loginID:this.loginID,
				loginPassword:this.loginPassword,
			}
			let res = await base.$ajax(url,data);
			if(res.status == 800){
				window.location.href = `../../index/html/index.html?uid=${res.data.loginID}`;				
			}else{
				this.hintMessage = res.info;
			}
		},
		touristLogin(){
			window.location.href = `http://${location.host}/src/index/html/index.html/tourist`;
		}
		
	},
	components:{
		'he' : head,
	}
})
