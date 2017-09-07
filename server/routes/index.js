var express = require('express');
var mongoose = require('mongoose');
var db = require('../db/index');
var router = express.Router();

mongoose.Promise = require("bluebird");

var User = db.User;
var AlbumList = db.AlbumList;
var FavorList = db.FavorList;

mongoose.connect('mongodb://localhost:27017/app');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db service connected.')
});

/* GET home page. */
router.get('/', function(req,res) {
  res.render('index', { title: 'Express' });    // 到达此路径则渲染index文件，并传出title值供 index.html使用
});

/*api接口*/

//登录
router.route('/account/login').post(function(req,res){
  var username = req.body.username;
  User.findOne({'name':username},function(err,doc){
    if(err){ 										//错误就返回给原post处（login.html) 状态码为500的错误
      res.send(500);
    }else if(!doc){ 								//查询不到用户名匹配信息，则用户名不存在
      req.session.error = '用户名不存在';
      res.send({success:false,message:"name or password uncorrected"});							//	状态码返回404
      //	res.redirect("/login");
    }else{
      if(req.body.password != doc.password){ 	//查询到匹配用户名的信息，但相应的password属性不匹配
        req.session.error = "密码错误";
        res.send({success:false,message:"name or password uncorrected"});
        //	res.redirect("/login");
      }else{ 									//信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
        req.session.name = doc.name;
        res.send({success:true,message:"sign in successed"});
        //	res.redirect("/home");
      }
    }
  })
})


//注册
router.route('/account/add').post(function(req,res){
  var email = req.body.email;
  var name = req.body.username;
  var password = req.body.password;

  // var emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  // var userReg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,16}$/;

  let userReg = new RegExp(name,'i');
  let emailReg = new RegExp(email,'i');

  var userData = {
    email:email,
    name:name,
    password:password
  };

  var userEntity = new User(userData);

  User.find(
    {
      $or:[
        {name:{$regex:userReg}},
        {email:{$regex:emailReg}}
      ]
    },function(err,doc){
      if(err){
        res.send({
          success:false,
          message:"network error"
        })
        return;
      }else if(doc.length !== 0){
        res.send({
          success:false,
          message:"user existed"
        })
        return;
      }else{
        userEntity.save(function(err){
          if (err) {
            if(err.errors.name){
              res.send(
                {success:false,
                 message:err.errors.name.message
                }
              )
            }else if(err.errors.email){
              res.send(
                {success:false,
                 message:err.errors.email.message
                }
              )
            }else{
              res.send(
                {success:false,
                 message:err.errors.password.message
                }
              )
            }
          }else{
            res.send({
              success:true,
              message:'registration completed'
            })
          }
        });
      }
    });
  });

  //获取用户信息
  router.route("/account/userInfo").post(function(req,res){
    if(!req.session.name){
      req.session.error = "please sign in";
      res.send({
        success:false,
        message:"please sign in"
      })
    }else{
      res.send({
        success:true,
        name:req.session.name
      })
    }
  });


  //查询列表

  router.route('/album/queryList').post(function(req,res){
    AlbumList.find({},'-_id').sort({likeNum:-1}).exec(function(err,docs){
      res.send({
        success:true,
        result:docs
      })
    })
  });

  //增加列表
  router.route('/album/add').post(function(req,res){
    let data = req.body;
    let albumObj = {
      mainImage:data.mainPic,
      creator:req.session.name,
      genre:data.genre,
      albumName:data.albumName,
      singer:data.singer,
      createDate:new Date(),
      albumCode:"album"+ mongoose.Types.ObjectId(),
      likeNum:1
    };
    var albumEntity = new AlbumList(albumObj);
    albumEntity.save(function(err){
      if(err){
        console.log(err.errors)
      }else{
        res.send({
          success:true,
          message:'album push done!'
        })
      }
    });
  });

  //收藏列表
  router.route("/album/dolike").post(function(req,res){
    var data = req.body;
    var username = req.session.name;
    var albumCode = data.albumCode;
    if(username == "" || username == undefined){
      res.send({
        success:false,
        message:"Please sign in"
      })
    }else{
      User.findOne({'name':username},function(err,doc){
        if(err){
          throw err;
        }else{
          var userId = doc._id;

          FavorList.findOne({'userId':userId},function(err,doc){
            if(err){
              throw err;
            }else{
              if(doc){
                if(Array.indexOf(doc.list,albumCode) !== -1){
                  FavorList.update({'userId':userId},{'$pull':{'list':albumCode}});
                }else{
                  FavorList.update({'userId':userId},{'$addToSet':{'list':albumCode}});
                }
              }else{
                var favorListEntity = new FavorList({
                  'userId':userId,
                  'list':[albumCode]
                });
                favorListEntity.save();
              }
            }
          });
        }
      });
    }
  });

  module.exports = router;
