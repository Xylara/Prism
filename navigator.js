// for hardcoded values
const spoofWidth = 1920;
const spoofHeight = 1080; 
const deviceMemory = 16;
const hardwareConcurrency = 16;
const productSub = 20030107
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition = function() {
        return null;
    };
}

Object.defineProperty(navigator, 'deviceMemory', {
    get: function() { return deviceMemory; },
    configurable: true
});

Object.defineProperty(navigator, 'hardwareConcurrency', {
    get: function() { return hardwareConcurrency; },
    configurable: true
});

Object.defineProperty(navigator, 'productSub', {
    get: function() { return productSub; },
    configurable: true
});
Object.defineProperty(navigator, 'vendorSub', {
    get: function() { return ''; },
    configurable: true
});

Object.defineProperty(window, 'screen', {
    value: {
        width: spoofWidth,
        height: spoofHeight,
        availWidth: spoofWidth, 
        availHeight: spoofHeight,
        colorDepth: 24,
        pixelDepth: 24
    },
    writable: false
});
