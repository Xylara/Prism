// just nuke it all

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition = function() {
        return null;
    };
}

Object.defineProperty(navigator, 'deviceMemory', {
    get: function() { return 16; },
    configurable: true
});

Object.defineProperty(navigator, 'hardwareConcurrency', {
    get: function() { return 16; },
    configurable: true
});

Object.defineProperty(navigator, 'productSub', {
    get: function() { return 20030107; },
    configurable: true
});
Object.defineProperty(navigator, 'vendorSub', {
    get: function() { return ''; },
    configurable: true
});