'use strict';

// Enable chromereload by uncommenting this line:
import './lib/livereload';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Alli'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

console.log('injecting scripts');

chrome.tabs.executeScript(null, { file: "scripts/contentscript.js" });
chrome.tabs.insertCSS(null, { file: "styles/contentscript.css" });

/*// Temporary fix to override caching
// Execute script when the DOM content is loaded
chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
    console.log('details', details);
    // event triggers many times while loading, restrict to first frame
    if(details.frameId === 0) {       
        console.log('loading scripts when dom content loaded!', details, new Date().toISOString()); 
        chrome.tabs.executeScript(null, { file: "scripts/contentscript.js" });
        chrome.tabs.insertCSS(null, { file: "styles/contentscript.css" });
    }
});*/
