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
    mapView.expand()
    mapView.Outdoor.setStyle('https://tiles-cdn.mappedin.com/styles/starlight/style.json');
    const firstSpace = mapData.getByType('space').find(s => s.name === '200');
    const secondSpace = mapData.getByType('space').find(s => s.name === 'Male washroom');
    if (firstSpace && secondSpace) {
        const directions = mapView.getDirections(firstSpace, secondSpace);
        if (directions) {
            mapView.Navigation.draw(directions);
        }
    }
    mapData.getByType("space").forEach((space) => {
        console.log(space.name)
        mapView.updateState(space, {
            interactive: true,
            hoverColor: "#f26336",
        });
    });
});
