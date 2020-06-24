// ==UserScript==
// @name         ZJOOC自动播放
// @namespace    https://github.com/ColdThunder11/ZJOOCAutoPlay
// @version      0.2
// @description  ZJOOC自动播放下一课，详细使用需求见附加信息或readme.md
// @author       ColdThunder11,00LT00
// @match        *://www.zjooc.cn/ucenter/student/course/study/*/plan/detail/*
// @grant        none
// @supportURL   https://github.com/ColdThunder11/ZJOOCAutoPlay/issues
// ==/UserScript==

(function() {
    'use strict';
    var startTime=25000;//第一次脚本开始时间（毫秒），在这个时间之前需要确保完成课程选择和课程加载，否则会报错
    var playInterval=10000;//课程播放间隔时间（毫秒），在这个时间之前需要确保完成课程加载，否则会报错或者错误跳过
    var speedIndex = 0; // 速度，0：4倍速，1：2倍速，2：1.5倍速，3：1.25倍速，4：正常，5：0.5倍速
    var muteFlag = true; //是否静音
    var nextVideoFunc=function(){
        var currentClass=document.getElementsByClassName("el-menu-item is-active")[1];
        var nextClass=currentClass.nextSibling;
        if(nextClass==null){
            currentClass.parentNode.parentNode.nextSibling.childNodes[0].click();
            nextClass=currentClass.parentNode.parentNode.nextSibling.childNodes[1].childNodes[1];
        }
        if(nextClass==null){
            alert("所有课程已经学习完毕。");
        }
        nextClass.click();
        playVideoFunc();
    }
    var playVideoFunc=function(){
        var vidf=document.getElementsByTagName("video")[0];
        var spd = vidf.parentElement.children[8];
        var cbf=vidf.parentNode.childNodes[2];
        var playLayerf=cbf.childNodes[0];
        /*速度*/
        spd.children[speedIndex].click();
        /*音量*/
        if(muteFlag){
            cbf.children[18].click();
        }
        window.setTimeout(function(){
            var vidf=document.getElementsByTagName("video")[0];
            var spd = vidf.parentElement.children[8];
            var cbf=vidf.parentNode.childNodes[2];
            var playLayerf=cbf.childNodes[0];
            /*速度*/
            spd.children[speedIndex].click();
            /*音量*/
            if(muteFlag){
            cbf.children[18].click();
        }
            playLayerf.click();
        },playInterval);
    };
    var detectiveFunc=function(){
        var vid=document.getElementsByTagName("video")[0];
        var cb=vid.parentNode.childNodes[2];
        var playLayer=cb.childNodes[0];
        var processBar=cb.childNodes[7];
        var processText;
        processText=processBar.innerText;
        var pctime=processText.split('/');
        var ctime=pctime[0].trim();
        var etime=pctime[1].trim();
        if(ctime==etime){
            nextVideoFunc();
            return;
        }
    };
    var ScritpFunc=function(){
        playVideoFunc();
        window.setInterval(detectiveFunc,playInterval);
    }
    window.setTimeout(ScritpFunc,startTime);
})();
