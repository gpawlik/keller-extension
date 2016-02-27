import $ from 'jquery';
import responsiveVoice from './lib/voice';
import { content } from './content';

const navigation = (function() {  
    
    const active_class = "active";
    
    function contentNavigate(direction, elements, act_class = active_class) {                                     
              
        const $elements = elements || $('.klr-body').find('[data-navigable]');
        let active_el = false;
        
        console.log('navigating...', direction, $elements, act_class); 
        
        $elements.each(function(key, elem) {
            if($(this).hasClass(act_class)) {
                active_el = true;
                $elements.removeClass(act_class);  
                $elements.children().removeClass(act_class);    
                if(direction === 'next'){
                    if($(this).next().length > 0) {
                        $(this).next().addClass(act_class);
                        console.log('class ' + act_class + ' added to ' + $(this).next().html());  
                    } 
                    else {
                        $elements.first().addClass(act_class);
                        console.log('class ' + act_class + ' added to ' + $elements.first().html());
                    }                    
                }     
                else if (direction === 'prev') {
                    if($(this).prev().length > 0) {
                        $(this).prev().addClass(act_class);
                        console.log('class ' + act_class + ' added to ' + $(this).prev().html()); 
                    }
                    else {
                        $elements.last().addClass(act_class);
                        console.log('class ' + act_class + ' added to ' + $elements.last().html());
                    }
                }                                 
                return false;
            }
        });
        if(!active_el) {
            console.log('adding ' + act_class + ' to ' + $elements.first().html());
            $elements.first().addClass(act_class);  
            //contentNavigate(direction, elements, act_class);      
        }
    }
    
    function contentOpen() {
        const link = $('.klr-body').find('[data-navigable].' + active_class).find('a').attr('href');
        console.log('link', link);
        window.location.href = link;       
    }
    
    function contentBack() {
        console.log("going back");
        window.history.back();
    }      
    
    function contentRead(direction) {        
        const elements = $('.klr-body').find('[data-navigable].' + active_class).children();
        contentNavigate(direction, elements, 'read');
        responsiveVoice.speak(content.getCurrentText(), "Spanish Female");
    }
    
    return {
        contentNavigate: contentNavigate,
        contentOpen: contentOpen,
        contentBack: contentBack,
        contentRead: contentRead
    }   
    
})();

exports.navigation = navigation;