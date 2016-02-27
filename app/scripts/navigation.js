import $ from 'jquery';

const navigation = (function() {  
    
    const active_class = "active";
    
    function contentNavigate(direction) {        
        const $elements = $('.klr-body').find('[data-navigable]');
        
        $elements.each(function(key, elem) {
            if($(this).hasClass(active_class)) {
                $elements.removeClass(active_class);    
                if(direction === 'next'){
                    if($(this).next().length > 0) {
                        $(this).next().addClass(active_class);
                    } 
                    else {
                        $elements.first().addClass(active_class);
                    }                    
                }     
                else if (direction === 'prev') {
                    if($(this).prev().length > 0) {
                        $(this).prev().addClass(active_class);
                    }
                    else {
                        $elements.last().addClass(active_class);
                    }
                }                      
                return false;
            }
        });
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
    
    return {
        contentNavigate: contentNavigate,
        contentOpen: contentOpen,
        contentBack: contentBack
    }   
    
})();

exports.navigation = navigation;