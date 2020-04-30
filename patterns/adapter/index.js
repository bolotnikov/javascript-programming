/** 
 * Adapter pattern
 * Adapt the interface that you are given to the interface that you actually need
 * A construct which adapts an existing interface X to conform the required interface Y
*/

// 3rd party API we must to work with to render an image
class RGBRenderer {
    static draw(r, g, b) {
      console.log(r, g, b);
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
    constructor(string) {
        this.string = string;
    }
}

class Image {
    constructor(hexString) {
        this.color = new ColorHEX(hexString);
        this.adapter = null;
    }
    setAdapter(adapter) {
        this.adapter = adapter;
        return this;
    }
    render() {
        if (this.adapter) {
            this.adapter.render(this.color);
        }
    }
}

// To render our image we need an adapter
class HEXToRGBAdapter {
    hexToRgb(colorHex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex.string);
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return new ColorRGB(r, g, b);
    }
    render(color) {
        const rgb = this.hexToRgb(color);
        RGBRenderer.draw(rgb.r, rgb.g, rgb.b);
    }
}

const image = new Image('#FFCC99');
image.setAdapter(new HEXToRGBAdapter()).render();
