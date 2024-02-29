class Sprite {
    constructor(
        src = new Image(), //source image
        x = 0, y = 0, width = 16, height = 16, //region of the image that the sprite is in
    ) {
        this.src = src;
        this.x = x; this.y = y; this.width = width; this.height = height;
    }
}

class Tile {
    static categories = ["tiles", "groundTiles", "waypoints", "spawnPoints", "ammo", "spawningPointsRed", "spawningPointsBlue", "redFlags", "blueFlags"]
    
    constructor(
        id = 0, //numeric ID
        localName = "unknown", //tile's local display name in UI
        category = "tiles", //tile category
        width = 1, height = 1, //tile size
        isGround = false,
        sprite = null,
    ) {
        this.id = id;
        this.localName = localName;
        this.category = category;
        this.width = width; this.height = height;
        this.pathing = pathing; 
        this.isGround = isGround;
        this.sprite = sprite;
        this.params = {};
    }
}
class Teleporter extends Tile {
    constructor(
        id = 0, //numeric ID
        localName = "unknown", 
        width = 1, height = 1, 
        sprite = null,
        channel = 1,
    ) {
        super(id, localName, "tiles", width, height, false, sprite);
        this.params.channel = channel;
    }
}

class Conveyor extends Tile {
    constructor(
        id = 0, //numeric ID
        localName = "unknown", 
        width = 1, height = 1, 
        sprite = null,
        shiftX = 1,
        shiftY = 0,
    ) {
        super(id, localName, "tiles", width, height, false, sprite);
        this.params.shiftX = shiftX;
        this.params.shiftY = shiftY;
    }
}

class SlayMap {
    constructor(
        name = "Untitled",
        description = "",
        maxPlayers = 16,
        hidden = false, //whether this map is not shown up in the in-game map list
        closed = false, //whether this map is not in in-game map rotation
        type = 0, //default gamemode of this map
        width = 32, height = 32, //map size
        tiles = {},
        groundTiles = {},
        waypoints = {},
        spawnPoints = {},
        spawnRed = {},
        spawnBlue = {},
        redFlags = {},
        blueFlags = {},
        pickups = {},
        //tile types
    ) {
        this.name = name;
        this.description = description;
        this.maxPlayers = maxPlayers;
        this.invisible = hidden;
        this.closed = closed;
        this.type = type;
        this.x = width; this.y = height;
        this.tiles = tiles;
        this.groundTiles = groundTiles;
        this.waypoints = waypoints;
        this.spawnPoints = spawnPoints;
        this.spawningPointsBlue = spawnBlue;
        this.spawningPointsRed = spawnRed;
        this.redFlags = redFlags;
        this.blueFlags = blueFlags;
        this.ammo = pickups;
    }

    addTile(tile, x, y) {
        const posKey = x + "&" + y;
        if (!this[tile.category][posKey]) {
            this[tile.category][posKey] = []
        }
        const tileObject = {};
        tileObject.id = tile.id;
        tileObject.x = tile.x;
        tileObject.y = tile.y;

        for (let param in tile.params) {
            tileObject[param] = tile.params[param];
        }
        this[tile.category][posKey].push(tileObject);
    }   
}

module.exports = {
    Tile, Sprite, SlayMap
}