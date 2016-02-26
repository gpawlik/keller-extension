import $ from 'jquery';
import template from './../pages/page.html';


const getContent = (function(url) {
        
    const content = {};
    
    content.title = getPageTitle;
    content.logo  = getPageLogo;
    content.items = [];    
        
    const getFeed = function(url) {
        $.get(url, function (data) {  
                                            
            console.log('got data ->', data);
            $(data).find("item").each(function () {
                var el = $(this);
                const item = {
                    title: el.find("title").text(),
                    link: el.find("link").text(),
                    description: el.find("description").text()
                };
                content.items.push(item);
            });
            console.timeEnd('loadtime');
            render(content);
        }); 
    }   
    
    function getPageTitle(data) {
        return $('head').find('title').html();               
    }
        
    function getPageLogo(data) {
        return $('head').find('link[rel=apple-touch-icon]');        
    }  
    
    function getPageFeed(data) {
        return $('head').find('link[type="application/rss+xml"]').first().attr('href');        
    }  

    function render(data) {
        const html = template(data); 
        console.log(html, data);
        $('body').append(html); 
    }    
    
    return {
        getData: getFeed
    }
})();    
    
exports.content = getContent;