const {Tile, SlayMap} = require("./classes");

const Editor = {
    editableLabels: {name: 'Name', description: 'Description', maxPlayers: 'Max Players', invisible: 'Hidden', closed: 'Closed', type: 'Default Gamemode'},

    //current map in the editor
    currentMap: new SlayMap(),

    //export map as a slay.one map file
    saveMap: (filename = currentMap.name + ".json") => {
        const mapJSON = {
            name: currentMap.name,
            description: currentMap.description,
            maxPlayers: currentMap.maxPlayers,
            invisible: currentMap.invisible,
            noBorder: false,
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
        dlQueue = document.createElement('a');
        dlQueue.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(mapString));
        dlQueue.setAttribute('download', filename);
        dlQueue.style.display = 'none';
        document.body.appendChild(dlQueue);
        dlQueue.click();
        document.body.removeChild(dlQueue);
        delete dlQueue;
    },

    //load map from a slay.one map file
    loadMap: () => {
        const data = {}
        inputHandler = document.createElement('input');
        inputHandler.type = 'file';
        inputHandler.accept = "file/json";
        fileReader = new FileReader();
        inputHandler.addEventListener(
            "change", 
            () => {
                data.file = inputHandler.files[0];  
                fileReader.readAsText(data.file);           
                delete inputHandler;
            }, 
            false
        );

        fileReader.addEventListener("load", () => {
            data.string = fileReader.result;
            data.object = JSON.parse(data.string);  
            delete fileReader;
        })

        inputHandler.click(); //prompts user to select a json file
         
        //now onto the next part: reading the data
        const rawMapJSON = data.object;

        const mapJSON = new SlayMap(
            rawMapJSON.name, 
            rawMapJSON.description, 
            rawMapJSON.maxPlayers, 
            rawMapJSON.invisible, 
            rawMapJSON.closed, 
            rawMapJSON.type, 
            rawMapJSON.width, rawMapJSON.height
        );
        
        for (let category in Tile.categories) {
        }
        
        
        
    },

    //resize the current map
    resize: (width, height) => {
        currentMap.x = width;
        currentMap.y = height;
    }
}

module.exports = {
    Editor
}