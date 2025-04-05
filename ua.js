
// this wont work on mv2 but google can suck my dick because its not happening


function injectScript(userAgent, platform) {
    const script = document.createElement("script");
    script.textContent = `
        (function() {
            Object.defineProperty(navigator, 'userAgent', {
                get: function() { return '${userAgent}'; },
                configurable: true
            });
            Object.defineProperty(navigator, 'appVersion', {
                get: function() { return '${userAgent}'; },
                configurable: true
            });
            Object.defineProperty(navigator, 'platform', {
                get: function() { return '${platform}'; },
                configurable: true
            });
            Object.defineProperty(navigator, 'productSub', {
                get: function() { return ${20030107}; },
                configurable: true
            });
            Object.defineProperty(navigator, 'vendorSub', {
                get: function() { return ''; },
                configurable: true
            });
            Object.defineProperty(navigator, 'hardwareConcurrency', {
                get: function() { return ${16}; },
                configurable: true
            });
            Object.defineProperty(navigator, 'deviceMemory', {
                get: function() { return ${16}; },
                configurable: true
            });
        })();
    ;` 
    document.documentElement.appendChild(script);
}
chrome.runtime.sendMessage({ action: "getNavigator", }, (response) => {
    if (response) {
        injectScript(response.userAgent, response.platform);
    } else {
        console.error("Couldnt get the user agent (idk why)" + response);
    }
});

