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

    http: {
        root: '/root',
        headers: {
            Authorization: ''
        }
    },
    el: '.leftTitlesView',
    data: {
        name : "baudu",
        isShowInfos : false,
        infos:[]
        // "{'title': '', 'type':'.md', 'action':'https://github.com/yangjiaxuan/MyNote/JNI.md'}"
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

function loadData() {

    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","./Resource/AppData.json");
    xmlhttp.send(null);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = JSON.parse(xmlhttp.responseText);
            // titles.infos.push(result['infos']);
            // Array.prototype.push.apply(titles.infos, result.infos);
            titles.infos = titles.infos.concat(result.infos);
            titles.isShowInfos = true;
        }
    }
}
