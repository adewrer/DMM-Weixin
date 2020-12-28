/**
 * @file 页面html配置
 * @author:leinov
 * @date: 2018-10-09
 * @update: 2018-11-05
 * @use: 动态配置html页面，获取src下每个文件下的pageinfo.json内容,解析到HtmlWebpackPlugin中
 */

const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");//生成html文件
const getFilePath = require("./getFilepath");
let htmlArr = [];

getFilePath("./src").map((item)=>{
	let infoJson = fs.readFileSync(`src/${item}/pageinfo.json`,"utf-8");//读取文件内容
	let infoData = JSON.parse(infoJson);
	htmlArr.push(new HtmlWebpackPlugin({
		title:infoData.title ? infoData.title : "微信开发",
		meta:{
			keywords: infoData.keywords ? infoData.keywords : "微信开发",
			description:infoData.description ? infoData.description : "微信开发"
		},
		chunks:[`${item}/${item}`], //引入的js
		template: "./src/template.html",
		filename : item == "index" ? "index.html" : `${item}/index.html`, //html位置
		minify:{//压缩html
			collapseWhitespace: true,
			preserveLineBreaks: true
		},
	}));
});

module.exports = htmlArr;
