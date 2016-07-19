var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/greeny');
var schema = mongoose.Schema;
var userSchema = new schema({
	name:String,
	password:String,
	age:String
});


// 括号里的user+s，就是数据库里面的集合的名字，其实可以设置第三个参数(可缺省String)
var user = db.model('user',userSchema);
module.exports = user;