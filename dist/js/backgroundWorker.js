const s={getCurrentPage:{message:"getCurrentUrl"}};chrome.runtime.onMessage.addListener((r,o,t)=>{if(r.value==s.getCurrentPage.message){let n={active:!0,currentWindow:!0};return chrome.tabs.query(n,function(e){const u={url:e[0].url||"",title:e[0].title||""};t(u)}),!0}});
