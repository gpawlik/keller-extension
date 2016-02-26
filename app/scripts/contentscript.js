'use strict';

import $ from 'jquery';
import { content } from './content';

console.time('loadtime');
console.time('DOMload');
console.time('storageTime');

console.log('content?', content);

if(localStorage.getItem('klr_data')) {         
    console.timeEnd('storageTime');
    window.stop();     
    content.getContent();
} else {
    document.addEventListener("DOMContentLoaded", function(event) {             
                        
        console.timeEnd('DOMload');
        //window.stop(); 
          
        // set content
        content.setContent();
        
        // clear document    
        document.head.innerHTML = "";
        document.body.innerHTML = "";

        content.getContent();
    });    
}
