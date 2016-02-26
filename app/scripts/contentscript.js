'use strict';

import $ from 'jquery';

console.time('loadtime');
console.time('DOMload');
console.time('storageTime');

if(localStorage.getItem('xdata')) {          
    console.timeEnd('storageTime');
    window.stop();
    getX(localStorage.getItem('xdata'));
} else {
    document.addEventListener("DOMContentLoaded", function(event) {
        console.timeEnd('DOMload');
        console.log("DOM fully loaded and parsed (from within Preloader)", new Date().toISOString());
        console.log('stopping window...');
        window.stop();   
        const x = $('head').find('link[type="application/rss+xml"]').first().attr('href');    
        console.log('x', x);
        localStorage.setItem('xdata', x);
        // clear document    
        document.head.innerHTML = "";
        document.body.innerHTML = "";
        getX(x);
    });    
}

function getX(url) {
    console.log('called', url);
    $.get(url, function (data) {
        
        console.log('got data ->', data);
        $(data).find("item").each(function () {
            var el = $(this);
            console.log("------------------------");
            console.log("title      : " + el.find("title").text());
            console.log("link       : " + el.find("link").text());
            console.log("description: " + el.find("description").text());
        });
        console.timeEnd('loadtime');
    });    
}
