const {Tile, SlayMap} = require("./classes");

const Editor = {
    currentMap: new SlayMap(),
    export: (filename = currentMap.name + ".json") => {
        const mapJSON = {
            name: currentMap.name,
            description: currentMap.description,
            maxPlayers: currentMap.maxPlayers,
            invisible: currentMap.invisible,
            closed: currentMap.closed,
            type: currentMap.type,
            width: currentMap.width,
            height: currentMap.height
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
    load: () => {}

}