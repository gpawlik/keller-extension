'use strict';

import $ from 'jquery';
import { content } from './content';

console.time('loadtime');
console.time('DOMload');
console.time('storageTime');

console.log('content?', content);

if(localStorage.getItem('feed_url')) {          
    console.timeEnd('storageTime');
    window.stop();
    content.getData(localStorage.getItem('feed_url'));
} else {
    document.addEventListener("DOMContentLoaded", function(event) {
        console.timeEnd('DOMload');
        window.stop();   
        const url = $('head').find('link[type="application/rss+xml"]').first().attr('href');    
        console.log('feed_url', url);
        localStorage.setItem('feed_url', url);
        // clear document    
        document.head.innerHTML = "";
        document.body.innerHTML = "";
        content.getData(url);
    });    
}
