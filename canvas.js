// posions slightly diff now
(function() {
function randomPixelData() {
    return Math.floor(Math.random() * 256); // inclusive, exclusive
}
function hookGetImageData(ctx) {
    const originalGetImageData = ctx.getImageData;
    ctx.getImageData = function(x, y, width, height) {
        const imageData = originalGetImageData.call(this, x, y, width, height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = randomPixelData(); // R 
            imageData.data[i + 1] = randomPixelData(); // G 
            imageData.data[i + 2] = randomPixelData(); // B 
        }
        return imageData; 
    };
}

function hookReadPixels(ctx) {
    const originalReadPixels = ctx.readPixels;
    ctx.readPixels = function(x, y, width, height, format, type, pixels) {
        originalReadPixels.call(this, x, y, width, height, format, type, pixels);
        if (pixels instanceof Uint8Array) {
            for (let i = 0; i < pixels.length; i += 4) {
                    pixels[i] = randomPixelData(); // R 
                    pixels[i + 1] = randomPixelData(); // G 
                    pixels[i + 2] = randomPixelData(); // B 
            }
        }
    };
}

function hookGetContext() {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
        value: function(type, attributes) {
            const ctx = originalGetContext.call(this, type, attributes);
            if (type === "2d") {
                hookGetImageData(ctx); 
            } else if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") {
                hookReadPixels(ctx); 
            } else {
                // if all else fails, just nuke them both 
                hookGetImageData(ctx)
                hookReadPixels(ctx);
            }
            return ctx;
        },
        configurable: true
    });
}

hookGetContext();

})();
