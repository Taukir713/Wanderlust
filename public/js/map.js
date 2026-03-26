 

let lattitude = coordinates[0] || 19.1737108;
let longitude = coordinates[1] || 72.8605214;   

var map = L.map('map' , {
    center : [lattitude , longitude] ,
    zoom : 9
}) 

var myIcon = L.divIcon({  
    
    html :
    `<div class="inner-div"> 
        <i class="fa-regular fa-house"></i>
    </div>`
  ,
  className: "" 
});
 
// L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//     attribution: 'Tiles © Esri'
// }).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);
  
L.marker( [lattitude, longitude] , {icon : myIcon}  ).addTo(map) 
    .bindPopup(` <p>Exact location provided after booking</p>`)
    // .openPopup();
     