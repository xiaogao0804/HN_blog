import $_$ from './baseClass.js';
var HN_USER = "";
(function(){
	var base = new $_$();
	base.$ajax('/user',function(res){
		HN_USER = res.loginID[0].loginID;
	});
})();
export default HN_USER;

