import $ from 'jquery';
import template from './../pages/page.html';


const content = (function() {       
    
    const klrData = JSON.parse(localStorage.getItem('klr_data'));  
    const _content = {}; 
    
    if(klrData) {          
        _content.title = klrData.title;
        _content.logo  = klrData.logo;
        _content.url = klrData.feed_url;
        _content.items = [];          
    }
                
    const getContent = function(klrData) {
        console.log('getting_content');
        getFeed();
    };
    
/* {"title":"EL PAÍS: el periódico global",
    "logo":{"length":0,"prevObject":{"length":0,"prevObject":{"0":{},"length":1,"prevObject":{"0":{},"context":{},"length":1},"context":{},"selector":"head"},"context":{},"selector":"head link[rel=apple-touch-icon]"},"context":{}},
    "feed_url":"http://ep01.epimg.net/rss/elpais/portada.xml"} */   
    
    const setContent = function() {
        console.log('setting_content');
        const newData = {
            title: getPageTitle(),
            logo: getPageLogo(),
            feed_url: getPageFeed()             
        };           
        localStorage.setItem('klr_data', JSON.stringify(newData));        
    };
        
    function getFeed() {
        $.get(_content.url, function (data) {                                   
            $(data).find("item").each(function () {
                var el = $(this);
                const item = {
                    title: el.find("title").text(),
                    link: el.find("link").text(),
                    description: el.find("description").text()
                };
                _content.items.push(item);
            });
            console.timeEnd('loadtime');
            render(_content);
        }); 
    }   
    
    function getPageTitle() {
        return $('head').find('title').html();               
    }
       
        
    function getPageLogo() {
        return $('meta[property="og:image"]').attr('content');        
    }  
    
    function getPageFeed() {
        return $('head').find('link[type="application/rss+xml"]').first().attr('href');        
    }  
    
    function getCurrentText() {
        return $('.klr-body').find('[data-navigable].active').first().text();
    }  

    function render(data) {
        const html = template(data); 
        //console.log(html, data);       
        document.getElementsByTagName('html')[0].innerHTML = "<head></head><body></body>";
        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', html);  
        $('.klr-body').find('[data-navigable]').first().addClass('active');       
    }    
    
    return {
        getContent: getContent,
        setContent: setContent,
        getPageTitle: getPageTitle, 
        getPageLogo: getPageLogo,
        getPageFeed: getPageFeed,
        getCurrentText: getCurrentText     
    }
})();    
    
exports.content = content;