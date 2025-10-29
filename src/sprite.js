class Sprite {
    constructor(
        src = new Image(), //source image
        x = 0, y = 0, w = 16, h = 16, //region of the image that the sprite is in
    ) {
        this.src = src;
        this.x = x; this.y = y; this.w = w; this.h = h;
    }
}