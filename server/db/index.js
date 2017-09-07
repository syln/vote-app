var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require('../models/index');

var _User = new Schema(models.user,{versionKey: false});
var _AlbumList = new Schema(models.album_list,{versionKey:false});
var _FavorList = new Schema(models.favor_list,{versionKey: false});

var User = mongoose.model('User',_User,"User");
var AlbumList = mongoose.model('AlbumList',_AlbumList,"AlbumList");
var FavorList = mongoose.model('FavorList',_FavorList,"FavorList");

//validator
User.schema.path('name').validate(function(value){
  return /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,16}$/.test(value);
},"username format error");

User.schema.path('password').validate(function(value){
  return /^[a-zA-Z0-9]{6,15}$/.test(value);
},"password format error");

User.schema.path('email').validate(function(value){
  return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value);
},"email format error");

module.exports = {
  User,AlbumList,FavorList
};
