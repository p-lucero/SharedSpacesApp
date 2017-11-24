'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.create_new_group = function(request, result){
	atributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_new_user = function(request, result) {
	atributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_group_debt = function(request, result) {
	atributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_new_personal_debt = function(request, result) {
	atributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_new_grocery_item = function(request, result) {
	atributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_new_chore = function(request, result) {
	atributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_new_rent_item = function(request, result) {
	atributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};