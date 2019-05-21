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

Vue.component('commentTextarea',{
	template:'\
	<div class="commentBox">\
	<h3>发表评论</h3>\
	<b v-if="type">你回复&nbsp;用户#{{name}}</b>\
	<textarea name="" value="请填写评论内容" v-model="commentText"></textarea>\
	<button class="btn" @click="addComment">发表</button>\
	<button class="btn" @click="canelComment">取消</button>\
	</div>',
	props: ['type','name'],
	data: function(){
		return {commentText:""}
	},
	methods: {
		addComment: function() {
			this.$emit("submit",this.commentText);
			this.commentText = "";
		},
		canelComment: function() {
			this.$emit("canel");
			this.commentText = "";
		}
	}
});


Vue.component('commemt-content',{
	template:'\
	<div class="commentBox">\
	<h3>评论</h3>\
	<p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>\
	<div v-else>\
	<div class="comment" v-for="(item,index) in comment" v-bind:index="index">\
	<b>用户#{{item.id}}<span>{{formatDate(new Date(item.created_at*1000),"yyyy-M-d h:m")}}</span></b>\
	<p @click="changeCommenter(item.id,index)">{{item.question}}</p>\
	<div v-if="item.replies.length > 0">\
	<div class="reply" v-for="reply in item.replies">\
	<b>用户#{{reply.id}}&nbsp;&nbsp;回复&nbsp;&nbsp;用户#{{reply.pid}}<span>{{formatDate(new Date(reply.created_at*1000),"yyyy-M-d h:m")}}</span></b>\
	<p @click="changeCommenter(reply.id,index)"">{{reply.reply}}</p>\
	</div>\
	</div>\
	</div>\
	</div>\
	</div>',
	props: ['comment'],
	methods: {
		changeCommenter: function(name,index) {
			this.$emit("change",name,index);
		}
	}
});


$.get("http://api.tronhoo3d.com/messages",function(res){
	var mData = res.data
	console.log(mData[0],mData[1]);
	var comment = new Vue({
		el: "#comment",
		data: {
	        type: 0,                //0为评论作者1为评论别人的评论
	        oldComment: null,       //久评论者的名字
	        chosedIndex: -1,        //被选中的评论的index
	        comment: mData   //评论内容
	    },
	    methods: {  
	        //添加评论
	        addComment: function(data) {
	        	if(this.type == 0) {
	        		this.comment.push({
	        			id: "你",
	        			created_at: (new Date().getTime())/1000,
	        			question: data, 
	        			replies: []
	        		});
	        		var qf = new FormData();
					qf.append("pid", -1);
					qf.append("message", data);
					qf.append("token", "6b0e3d40-6575-11e9-a6b0-0f9f5022d5d91");
	        		$.ajax({
	        			type: 'post',
	        			url:'http://api.tronhoo3d.com/messages',
	        			processData : false,
	        			contentType:false,
	        			data:qf,
	        			dataType:'json'
	        		})
	        	}else if(this.type == 1){
	        		this.comment[this.chosedIndex].replies.push({
	        			id: "你",
	        			created_at: (new Date().getTime())/1000,
	        			pid:this.oldComment,
	        			token: "6b0e3d40-6575-11e9-a6b0-0f9f5022d5d9",
	        			reply: data
	        		});
		        		var af = new FormData();
						af.append("pid", this.oldComment);
						af.append("message", data);
						af.append("token", "6b0e3d40-6575-11e9-a6b0-0f9f5022d5d91");
		        		$.ajax({
	        			type: 'post',
	        			url:'http://api.tronhoo3d.com/messages',
	        			processData : false,
	        			contentType:false,
	        			data:af,
	        			dataType:'json'
	        		})
	        		this.type = 0;
	        	}
	        },
	        //监听到了点击了别人的评论
	        changCommmer: function(name,index) {
	        	this.oldComment = name;
	        	this.chosedIndex = index;
	        	this.type = 1;
	        },
	        //监听到了取消评论
	        canelCommit: function() {
	        	this.type = 0;
	        }
	    }
	})
})
