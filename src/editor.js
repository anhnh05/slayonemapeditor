const {Tile, SlayMap} = require("./classes");

const Editor = {
    editableFields: ['name', 'description', 'maxPlayers', 'invisible', 'closed', 'type'],
    editableLabels: {name: 'Name', description: 'Description', maxPlayers: 'Max Players', invisible: 'Hidden', closed: 'Closed', type: 'Default Gamemode'},

    //current map in the editor
    currentMap: new SlayMap(),

    //export map as a slay.one map file
    save: (filename = currentMap.name + ".json") => {
        const mapJSON = {
            name: currentMap.name,
            description: currentMap.description,
            maxPlayers: currentMap.maxPlayers,
            invisible: currentMap.invisible,
            closed: currentMap.closed,
            type: currentMap.type,
            x: currentMap.x,
            y: currentMap.y
        };        
        for (let category in Tile.categories) {
            mapJSON[Tile.categories[category]] = [];
            for (let pos in currentMap[Tile.categories[category]]) {
                let tileGroup = currentMap[Tile.categories[category]][pos];
                for (let tile in tileGroup) {
                    mapJSON[Tile.categories[category]].push(tileGroup[tile])
                }
            }
        }
        const mapString = JSON.stringify(mapJSON);
        const dlQueue = document.createElement('a');
        dlQueue.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(mapString));
        dlQueue.setAttribute('download', filename);
        dlQueue.style.display = 'none';
        document.body.appendChild(dlQueue);
        dlQueue.click();
        document.body.removeChild(dlQueue);
    },

    //load map from a slay.one map file
    load: () => {},
    
    //resize the current map
    resize: (width, height) => {
        currentMap.x = width;
        currentMap.y = height;
    }
}

module.exports = {
    Editor
}