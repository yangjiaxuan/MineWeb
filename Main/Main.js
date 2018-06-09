/**
 * Created by yangsen on 2018/2/24.
 */

headerTitle = new Vue({
    el: '.headTitleView',
    data: {
        headTitle: '杨稼轩'
    }
});

titles = new Vue({
    el: '.leftTitlesView',
    data: {
        name : "10",
        infos: [
            {title: "项目一", type:"web", action:"http://www.baidu.com"},
            {title: "项目二", type:"web", action:"https://yangjiaxuan.github.io"},
            {title: "项目三", type:".md", action:"./MyNote/JNI.md"},
            {title: "项目四", type:".md", action:"https://github.com/yangjiaxuan/MyNote/JNI.md"},
            {title: "项目五", type:"web", action:"https://yangjiaxuan.github.io/index.html"},
            {title: "项目六", type:"", action:"6"}
        ]
    },
    methods : {
        titleOnClick:function(info) {
            if(info.type == "web"){
                this.goToOtherWind(info.action);
            }else if(info.type == ".md"){
                this.getInfoContent(info.action);
            }
        },
        goToOtherWind:function (url) {
            window.open(url)

        },
        getInfoContent:function(url){

            var xmlhttp;
            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
            }else {// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("GET",url);
            xmlhttp.send(null);

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var rightView=document.getElementsByClassName("rightView")[0];
                    rightView.innerHTML=marked(xmlhttp.responseText);
                }
            }
        }
}
});
