// ==UserScript==
// @name         xuanke
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  fuck xuanke server!
// @author       ay27
// @match        http://gs.uestc.edu.cn/wsxk/jsp/T_PYGL_KWGL_WSXK_KJ.jsp
// @match        http://gs.uestc.edu.cn/wsxk/jsp/*
//@require       http://gs.uestc.edu.cn/wsxk/jsp/T_PYGL_KWGL_WSXK_JB.jsp
//@require       http://apps.bdimg.com/libs/underscore.js/1.7.0/underscore-min.js
//@require       http://cdn.bootcss.com/jquery/3.1.1/jquery.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var className = ['课程A-班级1', '课程B-班级2'];  // 任何你想选的课程班级
    try {
        var lcid = document.getElementsByName('LCID')[0].value;
        var xh = document.getElementsByName('XH')[0].value;

        console.log('lcid=',lcid, ' xh=',xh);

        var all_class_href = document.getElementsByTagName('a');
        for (var i = 0; i < all_class_href.length; i++) {
            var item = all_class_href[i];
            var divs = item.parentElement.parentElement.parentElement.getElementsByTagName('div');
            if (divs.length<9) {continue;}
            if (divs[9].textContent == '撤销' || divs[9].textContent == '撤选') {continue;}
            for (var j = 0; j < className.length; j++) {
                if (className[j] == divs[1].textContent) {
                    var bjdm = item.getAttribute('onclick').split("'")[3];
                    console.log(base64encode(escape(bjdm)));
                    bjdm = base64encode(escape(bjdm));
                    console.log('bjdm=',bjdm);
                    var get_url = "http://gs.uestc.edu.cn/wsxk/jsp/T_PYGL_KWGL_WSXK_XKCZ.jsp?XH="+xh+"&BJDM="+bjdm+"&LCID="+lcid+"&URL=http://gs.uestc.edu.cn/wsxk/jsp/T_PYGL_KWGL_WSXK_KXKC.jsp";
                    $.get(get_url, function(data, status){console.log(data,status);});
                }
            }
        }
    } catch(err){}

})();
