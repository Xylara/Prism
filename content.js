function injectS(file) {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL(file);
    document.documentElement.appendChild(script);
}
// chrome santisation is 100% safe 
// with zero issues
// i cant just inject a script tag at all
injectS("canvas.js");