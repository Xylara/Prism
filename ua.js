
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

