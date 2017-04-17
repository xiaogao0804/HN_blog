/**
 * Created by Administrator on 2017/4/14.
 */
// import './document/index.js';
// import './index/index.js';
let login = require('./login/index.js');
let index = require('./index/index.js');
let document = require('./document/index.js');
// import './permission/index.js';
var control = {
	login,
	index
};
module.exports =  control;

