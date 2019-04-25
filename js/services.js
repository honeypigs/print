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

console.log(formatDate(new Date(1554046320000),"yyyy-M-d h:m"));

function padLeftZero (str) {
	return ('00' + str).substr(str.length);
};

$.get("http://api.tronhoo3d.com/models",function (res) {
	var mData = res;
	var model = new Vue({
		el: "#models",
		data: mData
	})
})

$.get("http://api.tronhoo3d.com/software",function (res) {
	var sData = res;
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
	var file = new Vue({
		el: "#ques",
		data: qData
	})
})

