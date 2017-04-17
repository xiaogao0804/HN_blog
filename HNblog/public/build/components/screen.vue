<template>
	<div class="top">	
		<div class="pop pop_remove_save" v-show="remove_sure_show">
			<div class="pop-top"><a class="fr" @click="remove_sure_show=false">X</a></div>
			<div class="pop_content">
				Sure to remove?
			</div>
			<div class="btm-btn">
				<a @click="remove_sure_show=false" class="btn btn-default fl">Cancel</a>
				<a @click="remove_sure" class="btn btn-default fr">Sure</a>
			</div>
		</div>
		<select @change="get_model_fun" class="module form-control fl input-lg" v-model="FEorServer_find">
			<option value="All">All</option>
			<option value="FE">F.E.</option>
			<option value="Server">Server</option>
		</select>
		
		<select @change="get_doc_change" class="module form-control fl input-lg" v-model="classifyCheck">
			<option value="All">All</option>
			<option v-for="i in classify" :value="i.title">{{i.title}}</option>
		</select>
		
		<select @change="get_doc_change" class="module form-control fl input-lg" v-model="limitCheck">
			<option value="All">All</option>
			<option value="public">Public</option>
			<option value="private">Private</option>
		</select>
		
		<div class="fl">
			<a class="btn btn-link" @click="pop_show_manClass=true">Manage Classification</a>			
		</div>
		<div class="pop pop-manClassify" v-show="pop_show_manClass">
			<div class="pop-top"><span>Manage Classify</span><a class="fr" @click="pop_show_manClass=false">X</a></div>
			<div class="manage_content">
				<div>
					<select class="form-control input-sm" v-model="add_model_job">
						<option value="FE">F.E.</option>
						<option value="Server">Server</option>
					</select>
					<input type="text" v-model="add_model">
						<a class="btn btn-default btn-sm" @click="add_model_fun">Add</a>
				</div>
				<div>
					<select class="form-control input-sm" v-model="edit_model_option">
						<option v-for="i in allClassify" :value="i.title">{{i.title}}</option>
					</select>
					<input type="text" v-model="edit_model">
					<a class="btn btn-default btn-sm" @click.stop="edit_module">edit</a>
				</div>
				<div v-show="allClassify.length>0">
					<select class="form-control input-sm" v-model="remove_model_option">
						<option v-for="i in allClassify" :value="i.title">{{i.title}}</option>
					</select>
						<a class="btn btn-default btn-sm" @click="remove_module">Remove</a>
				</div>
				
			</div>
			
		</div>
	</div>
</template>

<script>
	import $_$ from '../public/js/baseClass.js';
	const base = new $_$();
	export default {
		data(){
			return {
				remove_sure_show:false,
				request:false,
				classify:[],
				c:[],
				edit_model:"",
				add_model:"",
				add_model_job:"FE",
				edit_model_option:"选择模块",
				remove_model_option:"选择模块",
				pop_show_manClass:false,
				FEorServer_find:"All",
				allClassify:[],
				classifyCheck:"All",
				limitCheck:"All",
				remove_title:""
			}
		},
		methods:{
			async add_model_fun(){				
				var url = "/add_module/";
				if(this.add_model == ""){
					alert('Please enter a module name');
					return false;
				}
				if(this.add_model.length>20){
					alert('Module name cannot exceed 20');
					return false;
				}
				var data = {
					FEorServer : this.add_model_job,
					title : this.add_model,				
				};
				let res = await base.$ajax(url,data);
				if(res.status == 800){
					this.pop_show_manClass = false;
					this.get_model_fun();
					alert('add module success');
				}else{
					alert('sorry,fail');
				}				
			},
			async get_model_fun(){
				var url = "/get_module/";
				var data = {
					FEorServer:this.FEorServer_find,
				}				
				let res = await base.$ajax(url,data);
				
				if(res.status == 800){
					this.classify = res.data;
				}
				this.classifyCheck = 'All';
				if(this.FEorServer_find == 'All'){
					this.allClassify = res.data;	
				}
				this.get_doc_change();
			},
			get_doc_change(){
				this.edit_model_option = this.classifyCheck;
				this.remove_model_option = this.classifyCheck;
				var data = {
					classify:this.classifyCheck,
					limit:this.limitCheck,
					FEorServer:this.FEorServer_find,
				}
				this.$emit('get_doc_change',data);
			},
			remove_module(){
				this.remove_sure_show = true;
			},
			async remove_sure(){
				if(this.request){
					return false;
				}	
				this.request = true;
				var data = {
					classify:this.remove_model_option,
				}
				var url = '/remove_module/';
				let res = await base.$ajax(url,data);
				if(res.status == 800){
					alert('Remove success!');
					this.get_model_fun();
				}else{
					alert('Sorry,faile!');
				}
				this.request = false;
				this.remove_sure_show = true;
			},
			async edit_module(){
				if(this.request){
					return false;
				}				
				var data = {
					old_module : this.edit_model_option,
					new_module : this.edit_model,
				}
				if(!this.edit_model_option){
					alert('Please select a module');
					return false;
				}
				if(this.edit_model == ""){
					alert('Please enter a module name');
					return false;
				}
				if(this.edit_model.length>20){
					alert('Module name cannot exceed 20');
					return false;
				}
				var url = "/edit_module/";
				let res = await base.$ajax(url,data);
				this.request = true;
				if(res.status == 800){
					alert('success!');
					this.get_model_fun();
				}else{
					alert('fail to edit!');
				}
				this.pop_show_manClass = false
			}
		},
		created(){
			this.get_model_fun();
		},
		components:{
			
		},
	}
</script>

<style>
	.manage_content{
		width: 80%;
		padding: 10%;
	}
	.manage_content div{
		height: 100px;
	}
	.manage_content div a{
		
	}
	.manage_content div select,.manage_content div input{
		display: inline-block;
		width: 200px;
	    height: 30px;
	    padding: 5px 10px;
	    font-size: 12px;
	    line-height: 30px;
	    border-radius: 3px;
	}
	.top{
		width: 990px;
		height: 100px;
		padding: 50px;
		margin: 0 auto;
		margin-bottom: 40px;
	}
	.top .module{
		width: 220px;
		height: 40px;
	}
	.module:nth-child(n+1){
		margin-left: 20px;
	}
	.pop-manClassify{
		width: 800px;
		height: 400px;
		left: 50%;
		top: 50%;
		margin: -200px 0 0 -400px;
	}
</style>