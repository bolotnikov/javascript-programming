/** 
 * Adapter pattern
 * Adapt the interface that you are given to the interface that you actually need
 * A construct which adapts an existing interface X to conform the required interface Y
*/

// 3rd party API we need to work with to render an image
class RGBRenderer {
    static draw(colorRGB) {
      console.log(colorRGB);
    }
}


// Our self-developed custom API

class ColorRGB {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
} 

class ColorHEX {
    constructor(hexString) {
        this.hexString = hexString;
    }
}

class Image {
    constructor(hexString) {
        this.hexColor = new ColorHEX(hexString);
    }
    render() {
        const adapter = new HEXToRGBAdapter(this.hexColor);
        RGBRenderer.draw(adapter);
    }
}

// To render our image we need an adapter
class HEXToRGBAdapter extends ColorRGB {
    constructor(colorHex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex.hexString);
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);

        super(r, g, b);
    }
}

const image = new Image('#FFCC99');
image.render();
