$.get("http://api.tronhoo3d.com/products",function (res) {
	var data = res.data;
	var diyData = data[1], eduData = data[2], indData = data[3]; 
    // console.log(diyData,eduData,indData);
	var vmdiy = new Vue({
                el: "#diy",
                data: diyData,
                methods: {
                	detail: function(event){
                		window.location = "detail.html#" + event.target.id;
                	}
                }
            });
	var vmedu = new Vue({
                el: "#edu",
                data: eduData,
                methods: {
                    detail: function(event){
                        window.location = "detail.html#" + event.target.id;
                    }
                }
            });
	var vmind = new Vue({
                el: "#ind",
                data: indData,
                methods: {
                    detail: function(event){
                        window.location = "detail.html#" + event.target.id;
                    }
                }
            });
})