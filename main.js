import {
    getMapData,
    show3dMap
} from "https://cdn.jsdelivr.net/npm/@mappedin/mappedin-js@beta/lib/esm/index.js";
const options = {
    mapId: '66f7ff6142d0ac000b79d8db',
    key: 'mik_5en9U07n3mUydPTj850100724',
    secret: 'mis_FoUPRwtRfojkqYl3qiRuFyQc9W2ZszsmMbcx9StWTROab8f1178',
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
            hoverColor: "#f26336",
        });
    });
    spaceList = [...new Set(spaceList)]
    spaceList.sort()
    let root = document.getElementById("autofills");
    root.innerHTML = '';
    const input = document.getElementById('searchinput')
    input.oninput = function(){
        console.log(spaceList)
        let num = 0
        for (let i = 0; i<spaceList.length; i++){
            if ((input.value!='')&&(spaceList[i].indexOf(input.value)!=-1)){
                let autofill = document.createElement("div")
                autofill.classList.add("autofill")
                let p = document.createElement("p")
                p.innerHTML = spaceList[i]
                autofill.appendChild(p)
                root.appendChild(autofill)
                num+=1
            }
        }
        if (num==0){
            root.innerHTML = '';
        }
    };
});