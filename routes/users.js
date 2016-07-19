var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = require('url');
var querystring = require('querystring');

var user = require('./../mongodb/mongodb.js');
//登录验证
router.post('/verify',function(req,res){
	var name = req.body.name;
	var password = req.body.password;
	var table = {
		name: name,
		password: password
	}
	// users:匹配对象数组
	user.find({'name':name},function(err,users){
		for(var i=0,len=users.length;i<len;i++){
			if(typeof users[i].name=="undefined"){
				continue;
			}
			else{
				if(users[i].password==password){
					user.find(function(err,userss){
						var userList={
							list:userss
						}
						res.render('success',userList);
					})
					return;
				}
				else{
					res.render('unlogin');
					return;
				}
			}
		}
		res.render('unlogin');
		// if(users[0].name==name){
		// 	res.render('success',table);
			
		// 	return;
		// }
		// else {
		// 	console.log(users[0].name);
		// 	res.render('unlogin');
		// }
		
	});
	
	
});
// 注册
router.post('/signin',function(req,res){
	var table = {
		name: req.body.name,
		password: req.body.password,
		age: req.body.age
	}
	var userEntity = new user({
		name: req.body.name,
		password: req.body.password,
		age: req.body.age
	});
	userEntity.save(function(err){
		if(err){
			console.log("增加数据发生错误");
		}
	});
	res.render('signinok',table);
	
});
// router.post('/index/add',function(req,res){
// 	var obj = req.body;
// 	var stu02 = new student();
// 	stu02.addStu({
// 		name:req.body.stuname,
// 		age:req.body.age,
// 		sex:req.body.sex
// 	},function(res){
// 		res.json({success:ture});
// 	});
// });

module.exports = router;
