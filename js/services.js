function formatDate (date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
}; //显示时间方法

function padLeftZero (str) {
	return ('00' + str).substr(str.length);
}; 
 
$.get("http://api.tronhoo3d.com/models",function (res) {
	var mData = res;
	var model = new Vue({
		el: "#models",
		data: mData,
	})    
}) //获取模型数据并渲染


$.get("http://api.tronhoo3d.com/software",function (res) {
	var sData = res;
	var soft = new Vue({
		el: "#software",
		data: sData
	})
})//获取软件数据并渲染

$.get("http://api.tronhoo3d.com/files",function (res) {
	var fData = res;
	var file = new Vue({
		el: "#files",
		data: fData
	})
})//获取文件数据并渲染

$.get("http://api.tronhoo3d.com/questions",function (res) {
	var qData = res;
	var ques = new Vue({
		el: "#ques",
		data: qData
	})
})//获取问题数据并渲染

$.get("http://api.tronhoo3d.com/information",function (res) {
	var nData = res;
	var news = new Vue({
		el: "#news",
		data: nData,
		methods: {
            jump: function() {
               if(window.location.hash != ""){
                    window.location.href = window.location.hash;
                }
            }
        },
        mounted: function(){
            this.jump();
        }
	})
})//获取资讯数据并渲染


function show(event) {
	if(event.target.nextElementSibling.className == "content") {
		event.target.nextElementSibling.className = "contents";
	}else {
		event.target.nextElementSibling.className = "content";
	}
}//显示问题和资讯的隐藏内容

function showmodel(event) {
	var e = event.target;
	var path = e.nextElementSibling.href;
     var name = e.id + e.type;
     var link = [{ path: path, name: name}];
     var id = "#" + e.nextElementSibling.nextElementSibling.id;
     var height = e.parentNode.clientHeight;
     var margin = e.clientHeight;
     var everRender = evercad.render3d(id, link,{
		background: '#f0f0f0',     // 背景色
	     showToolbar: false,        // 是否显示 toolbar
	     logo: {
	       right: '0px',           // 距右边 40px
	       bottom: '0px',         // 距底边 100px
	       width: '40px',// logo 宽度，小于 40px 为 40px
	       height: '40px'
	     }
     });
     e.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
     e.parentNode.style.height = height + "px";
     e.nextElementSibling.nextElementSibling.style.marginTop = margin + "px";
} //显示3d模型并渲染

var list = document.querySelector("#list");
list.onclick = function(e) {
    if(e.target.hash == "#modelsl") {
        document.querySelector("#models").hidden = false;
        document.querySelector("#software").hidden = true;
        document.querySelector("#files").hidden = true;
        document.querySelector("#ques").hidden = true;
        document.querySelector("#news").hidden = true;
    } else if(e.target.hash == "#softwarel") {
        document.querySelector("#models").hidden = true;
        document.querySelector("#software").hidden = false;
        document.querySelector("#files").hidden = true;
        document.querySelector("#ques").hidden = true;
        document.querySelector("#news").hidden = true;
    } else if(e.target.hash == "#filesl") {
        document.querySelector("#models").hidden = true;
        document.querySelector("#software").hidden = true;
        document.querySelector("#files").hidden = false;
        document.querySelector("#ques").hidden = true;
        document.querySelector("#news").hidden = true;
    } else if(e.target.hash == "#quesl") {
        document.querySelector("#models").hidden = true;
        document.querySelector("#software").hidden = true;
        document.querySelector("#files").hidden = true;
        document.querySelector("#ques").hidden = false;
        document.querySelector("#news").hidden = true;
    } else if(e.target.hash == "#newsl"){
        document.querySelector("#models").hidden = true;
        document.querySelector("#software").hidden = true;
        document.querySelector("#files").hidden = true;
        document.querySelector("#ques").hidden = true;
        document.querySelector("#news").hidden = false;
    } else{
    	   document.querySelector("#models").hidden = false;
        document.querySelector("#software").hidden = false;
        document.querySelector("#files").hidden = false;
        document.querySelector("#ques").hidden = false;
        document.querySelector("#news").hidden = false;
    }
} //点击左侧列表改变右侧内容


