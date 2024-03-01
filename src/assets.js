const {Sprite, Tile} = require("./classes");
const TileAsset = require("./assets/sheet.json");
const Misc = require("./assets/stuff.json");

const getTileFromAsset = (asset, id) => asset[id];

const Assets = {
    tiles: {},
    imgs: {},
    getTile: (id) => this.tiles[id],
    importTile: (asset, image, assetID, id = assetID) => {
        if (asset[assetID] = undefined) {
            console.error(`item not found"`);
            return 0;
        };

        const tile = new Tile(id);
        if(asset[assetID].name) {tile.localName = asset[assetID].name} else {tile.localName = assetID};
        if(asset[assetID].w) {tile.width = asset[assetID].w} else {tile.width = 1};
        if(asset[assetID].h) {tile.height = asset[assetID].h} else {tile.height = 1};
        if(asset[assetID].ground) {tile.ground = !0} else {tile.ground = !1};
        if(asset[assetID].isNotFull) {tile.isNotFull = !0} else {tile.isNotFull = !1};
        tile.sprite = new Sprite(image, asset[assetID].img.x, asset[assetID].img.y, asset[assetID].img.w, asset[assetID].img.h);
        
    }
}

console.log(TileAsset)



const tileSheet = new Image(1500, 600);
tileSheet.src = "./assets/sheet.png";
const miscSheet = new Image(700, 1600);
miscSheet.src = "./assets/stuff.png";

