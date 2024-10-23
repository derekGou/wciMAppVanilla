import {
    getMapData,
    show3dMap
} from "https://cdn.jsdelivr.net/npm/@mappedin/mappedin-js@beta/lib/esm/index.js";
const options = {
    mapId: '66f7ff6142d0ac000b79d8db',
    key: 'mik_5en9U07n3mUydPTj850100724',
    secret: 'mis_FoUPRwtRfojkqYl3qiRuFyQc9W2ZszsmMbcx9StWTROab8f1178',
}

function clickSpace(str){
    const input = document.getElementById('searchinput')
    input.value = ''
}

getMapData(options).then(async (mapData) => {
    const mapView = await show3dMap(document.getElementById("app"), mapData);
    // mapView.expand()
    mapView.Outdoor.setStyle('https://tiles-cdn.mappedin.com/styles/starlight/style.json');
    const firstSpace = mapData.getByType('space').find(s => s.name === '200');
    const secondSpace = mapData.getByType('space').find(s => s.name === 'Male washroom');
    if (firstSpace && secondSpace) {
        const directions = mapView.getDirections(firstSpace, secondSpace);
        if (directions) {
            mapView.Navigation.draw(directions);
        }
    }
    var spaceList = []
    mapData.getByType("space").forEach((space) => {
        if (space.name){
            spaceList.push(space.name.trim())
        }
        mapView.updateState(space, {
            interactive: true,
            hoverColor: "#1374c5",
        });
    });
    mapData.getByType("connection").forEach((connection) => {
        const coords = connection.coordinates.find(
            (coord) => coord.floorId === mapView.currentFloor.id
        );
        if (coords) {
            mapView.Labels.add(coords, connection.name);
        }
    });
    var fullList = spaceList
    spaceList = [...new Set(spaceList)]
    spaceList.sort()
    let root = document.getElementById("autofills");
    const input = document.getElementById('searchinput')
    input.oninput = function(){
        root.innerHTML = '';
        let num = 0
        for (let i = 0; i<spaceList.length; i++){
            if ((input.value!='')&&(spaceList[i].toLowerCase().indexOf(input.value.toLowerCase())!=-1)){
                let autofill = document.createElement("div")
                autofill.classList.add("autofill")
                let p = document.createElement("p")
                p.innerHTML = spaceList[i]
                autofill.appendChild(p)
                autofill.addEventListener('click', function(){
                    clickSpace(spaceList[i])
                    root.innerHTML = '';
                })
                root.appendChild(autofill)
                num+=1
            }
        }
    };
});