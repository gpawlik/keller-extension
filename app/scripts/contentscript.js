'use strict';

import $ from 'jquery';
import { content } from './content';
import { navigation } from './navigation';
import './lib/voice';

console.time('loadtime');
console.time('DOMload');
console.time('storageTime');

console.log('content?', content);

responsiveVoice.speak("Hello World");

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

    $(document).keydown(function(e) {        
        console.log('pressing', e.keyCode);
        switch(e.keyCode) {
            case 37: // arrow left
                navigation.contentNavigate('prev');
                break;
            case 39: // arrow right
                navigation.contentNavigate('next');
                break;             
            case 13: // enter
                navigation.contentOpen();
                break;  
            case 27: case 8: // escape / backspace
                navigation.contentBack();   
                break;                  
        }
    });  
