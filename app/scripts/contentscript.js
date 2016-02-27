'use strict';

import $ from 'jquery';
import { content } from './content';
import { navigation } from './navigation';

console.time('loadtime');
console.time('DOMload');
console.time('storageTime');

if(localStorage.getItem('klr_data')) {         
    console.timeEnd('storageTime');    
    content.getContent();   
} else {
    document.addEventListener("DOMContentLoaded", function(event) {             
                        
        console.timeEnd('DOMload');
          
        // set content
        content.setContent();
        
        // clear document    
        document.head.innerHTML = "";
        document.body.innerHTML = "";

        content.getContent();
    });    
}

// Keyboard navigation
$(document).keydown(function(e) {        
    console.log('pressing', e.keyCode);        
    switch(e.keyCode) {
        case 37: // arrow left
            navigation.contentNavigate('prev');
            break;
        case 39: // arrow right
            navigation.contentNavigate('next');               
            break;  
        case 38: // arrow up
            navigation.contentRead('prev');                
            break; 
        case 40: // arrow down
            navigation.contentRead('next');                
            break;          
        case 13: // enter
            navigation.contentOpen();
            break;  
        case 27: case 8: // escape / backspace
            navigation.contentBack();   
            break;                  
    }
}); 
    