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
};

function padLeftZero (str) {
	return ('00' + str).substr(str.length);
};

$.get("http://api.tronhoo3d.com/models",function (res) {
	var mData = res;
	var model = new Vue({
		el: "#models",
		data: mData,
        mounted: function() {
            var filelist = [];
            var id = [];
            for(var i = 0;i < mData.data.length;i++) {
                var path = mData.data[i].link;
                var name = mData.data[i].filename + mData.data[i].filetype;
                var link = [{ path: path, name: name}];
                id[i] = "#model" + mData.data[i].id;
                filelist[i] = link;
            }
            for(var i = 0; i < filelist.length;i++) {
                var everRender = evercad.render3d(id[i], filelist[i],{
                background: '#f0f0f0',     // 背景色
                 showToolbar: false,        // 是否显示 toolbar
                 logo: {
                   right: '40px',           // 距右边 40px
                   bottom: '100px',         // 距底边 100px
                   width: '40px',           // logo 宽度，小于 40px 为 40px
                   src: 'https://img.com/logo.jpg'
                 }
            })
            }
        }
	})    
})

$.get("http://api.tronhoo3d.com/software",function (res) {
	var sData = res;
    console.log(sData);
	var soft = new Vue({
		el: "#software",
		data: sData
	})
})

$.get("http://api.tronhoo3d.com/files",function (res) {
	var fData = res;
	var file = new Vue({
		el: "#files",
		data: fData
	})
})

$.get("http://api.tronhoo3d.com/questions",function (res) {
	var qData = res;
	var ques = new Vue({
		el: "#ques",
		data: qData
	})
})
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
})


function show(event) {
	if(event.target.nextElementSibling.className == "content") {
		event.target.nextElementSibling.className = "contents";
	}else {
		event.target.nextElementSibling.className = "content";
	}
}

var list = document.querySelector("#list");
list.onclick = function(e) {
	console.log(e.target.hash)
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
    } else if(e.target.hash=="newsl"){
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
}

changefix();
window.onresize = function() {
    changefix();
}
function changefix() {
    var width = document.body.clientWidth;
    if (width < 768) {
        document.querySelector("#list").style.position = "absolute";
    }
}



