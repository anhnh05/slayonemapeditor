

class Tile {
    static categories = ["tiles", "groundTiles", "noGridTiles", "waypoints", "spawningPoints", "ammo", "spawningPointsRed", "spawningPointsBlue", "redFlags", "blueFlags"]
    
    constructor(
        id = 0, // numeric ID
        localName = "unknown", // tile's local display name in UI
        category = "tiles", // tile category
        w = 1, h = 1, // tile size
        isNotFull = false,
        noShow = false, // whether to show in tile list in the editor
        ground = false,
        sprite = null,
    ) {
        this.id = id;
        this.localName = localName;
        this.category = category;
        this.w = w; this.h = h;
        this.pathing = pathing; 
        this.ground = ground;
        this.isNotFull = isNotFull;
        this.noShow = noShow;
        this.sprite = sprite;
        this.params = {}; // extra editable parameters / fields
    }
}
class Teleporter extends Tile {
    constructor(
        id = 0,
        localName = "unknown", 
        w = 1, h = 1, 
        noShow = false,
        sprite = null,
        channel = 1,
    ) {
        super(id, localName, "tiles", w, h, true, noShow, true, sprite);
        this.params.channel = channel;
    }
}

class Conveyor extends Tile {
    constructor(
        id = 0,
        localName = "unknown", 
        w = 1, h = 1, 
        noShow = false,
        sprite = null,
        shiftX = 0,
        shiftY = 0,
    ) {
        super(id, localName, "tiles", w, h, false, noShow, true, sprite);
        this.params.shiftX = shiftX;
        this.params.shiftY = shiftY;
    }
}

class Ammo extends Tile {
    constructor(
        weapon = 1,
        noShow = false,
        localName = "unknown",
        sprite = null,
    ) {
        super(-weapon, localName, "ammo", 1, 1, true, noShow, true, sprite)
        this.weapon = weapon;
    }

}
