'use strict';
var lastTime = 0;
var getScrollWidth, getUlWidth, scrollContainer, showLeftFilter, showRightFilter;
scrollContainer = document.getElementById("ulArticleTypeFilter");                                
getScrollWidth = document.getElementById("ulArticleTypeFilter").scrollWidth;
getUlWidth = document.getElementById("navList").clientWidth;
showLeftFilter = document.getElementById("showLeftFilter");
showRightFilter = document.getElementById("showRightFilter");
if (getScrollWidth > getUlWidth) {
    showRightFilter.classList.remove("hide");
}
var vendors = ['ms', 'moz', 'webkit', 'o'];
var x;
for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
if (!window.requestAnimationFrame)
window.requestAnimationFrame = function (callback, element) {
    var currTime, timeToCall, id;
    currTime = new Date().getTime();
    timeToCall = Math.max(0, 16 - (currTime - lastTime));
    id = window.setTimeout(function () {
        callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
};
if (!window.cancelAnimationFrame)
window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
};
var easings = {
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
};
var smoothScroll = function (start, end, duration, easing) {
    var delta, startTime;
    delta = end - start;
    if (window.performance && window.performance.now) {
        startTime = performance.now();
    } else if (Date.now) {
        startTime = Date.now();
    } else {
        startTime = new Date().getTime();
    }
    var tweenLoop = function(time) {
        var t = (!time ? 0 : time - startTime);
        var factor = easing(null, t, 0, 1, duration);
        scrollContainer.scrollLeft = start + delta * factor;
        if (t < duration && scrollContainer.scrollLeft != end)
        requestAnimationFrame(tweenLoop);
    };
    tweenLoop();
};

//show previous links - scroll left
var showPrev = function () {
    showRightFilter.classList.remove("hide");
    if (getScrollWidth > getUlWidth) {
        smoothScroll(document.getElementById("ulArticleTypeFilter").scrollLeft, document.getElementById("ulArticleTypeFilter").scrollLeft -= getUlWidth - 64, 1000, easings.easeInOutSine);
    }
    var getScrollPosition = document.getElementById("ulArticleTypeFilter").scrollLeft -= getUlWidth - 64;
    if (getScrollPosition <= 0) {
        showLeftFilter.classList.add("hide");
    }
};

//show next links - scroll right
var showNext = function () {
    showLeftFilter.classList.remove("hide");
    if (getScrollWidth > getUlWidth) {
        smoothScroll(document.getElementById("ulArticleTypeFilter").scrollLeft, document.getElementById("ulArticleTypeFilter").scrollLeft += getUlWidth - 64, 1000, easings.easeInOutSine);
    }
    var futureScrollWidth = document.getElementById("ulArticleTypeFilter").scrollLeft += getUlWidth - 64 + getUlWidth;
    if (futureScrollWidth >= getScrollWidth) {
        showRightFilter.classList.add("hide");
    }
};

//show active links
var getTabLinks = document.querySelectorAll(".tabs a");
for (var aL = 0; aL < getTabLinks.length; aL++){
    getTabLinks[aL].onclick = function(){
        this.className = "activeTab";
        //debugger;
        //document.querySelectorAll(".activeTab")[0];
    }
}