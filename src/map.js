
class SlayMap {
    constructor(
        name = "Untitled",
        description = "",
        maxPlayers = 16,
        hidden = false, // whether this map is not shown up in the in-game map list
        type = 0, // default gamemode of this map
        width = 32, height = 32, // map size

        // tile types ----
        tiles = {},
        groundTiles = {},
        noGridTiles = [],
        waypoints = {},
        spawnPoints = {},
        spawnRed = {},
        spawnBlue = {},
        redFlags = {}, // unused
        blueFlags = {}, // unused
        ammo = {},
        // ----
    ) {
        this.name = name;
        this.description = description;
        this.maxPlayers = maxPlayers;
        this.invisible = hidden;
        this.closed = false; // (deprecated) whether to hide units on the map editor
        this.type = type;
        this.x = width; this.y = height;
        this.tiles = tiles;
        this.groundTiles = groundTiles;
        this.noGridTiles = noGridTiles;
        this.waypoints = waypoints;
        this.spawnPoints = spawnPoints;
        this.spawningPointsBlue = spawnBlue;
        this.spawningPointsRed = spawnRed;
        this.redFlags = redFlags;
        this.blueFlags = blueFlags;
        this.ammo = ammo;
    }

    addTile(tile, x, y, params = null) {
        const posKey = x + "&" + y;
        if (!this[tile.category][posKey]) {
            this[tile.category][posKey] = {}
        }

        const tileObject = {};
        if (tile.category == "ammo") tileObject.weapon = -tileObject.id;
        if (!(
            tile.category == "spawningPoint" 
            || tile.category == "spawningPointsRed" 
            || tile.category == "spawningPointsBlue" 
            || tile.category == "ammo"
        )) tileObject.id = tile.id;
        tileObject.x = x;
        tileObject.y = y;

        if (params instanceof Object) {
            for (let param in params) {
                tileObject[param] = params[param];
            }
        } else {
            for (let param in tile.params) {
                tileObject[param] = tile.params[param];
            }
        }

        
        this[tile.category][posKey][tile.id] = tileObject;
    }   
}
