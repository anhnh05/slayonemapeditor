const Editor = {
    labels: {name: 'Name', description: 'Description', maxPlayers: 'Max Players', invisible: 'Hidden', type: 'Default Gamemode'},

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
            for (let tileID in currentMap[Tile.categories[category]]) {
                let tile = currentMap[Tile.categories[category]][tileID];

                mapJSON[Tile.categories[category]].push(tile)

            }
        }
        const mapString = JSON.stringify(mapJSON);
        let dlQueue = document.createElement('a');
        dlQueue.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(mapString));
        dlQueue.setAttribute('download', filename);
        dlQueue.style.display = 'none';
        document.body.appendChild(dlQueue);
        dlQueue.click();
        document.body.removeChild(dlQueue);
        dlQueue = null;
    },

    // load map from a slay.one map file
    loadMap: () => {
        const data = {}
        let inputHandler = document.createElement('input');
        inputHandler.type = 'file';
        inputHandler.accept = "file/json";
        let fileReader = new FileReader();
        inputHandler.addEventListener(
            "change", 
            () => {
                data.file = inputHandler.files[0];  
                fileReader.readAsText(data.file);           
            }, 
            false
        );

        fileReader.addEventListener("load", () => {
            data.string = fileReader.result;
            data.object = JSON.parse(data.string);  
        })

        inputHandler.click(); // prompts user to select a json file
         
        // reading the data
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
        
        // final cleanup 
        document.body.removeChild(inputHandler);
        inputHandler = null;
        fileReader = null;
        
        
    },

    //resize the current map
    resize: (width, height) => {
        currentMap.x = width;
        currentMap.y = height;
    }
}
