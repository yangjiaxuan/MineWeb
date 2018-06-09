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
            {title: "项目一", action:"http://www.baidu.com"},
            {title: "项目二", action:"https://yangjiaxuan.github.io/Main/Main"},
            {title: "项目三", action:"https://yangjiaxuan.github.io/../MyNote/blob/master/JNI.md"},
            {title: "项目四", action:"https://github.com/yangjiaxuan/MyNote/blob/master/JNI.md"},
            {title: "项目五", action:"5"},
            {title: "项目六", action:"6"}
        ]
    },
    methods : {
        titleOnClick:function(info) {
            window.open(info.action);
        }

    }
});
