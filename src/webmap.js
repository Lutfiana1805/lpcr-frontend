import config from './config';
import templates from './templates';
import components from './components';

import L from 'leaflet';
import 'leaflet.control.layers.tree';
import 'leaflet-groupedlayercontrol';
import 'leaflet.markercluster';
import 'leaflet-draw';
import '../node_modules/leaflet-pulse-icon/src/L.Icon.Pulse';

var webmap = {};

webmap.createThematicMapFamilyRegion = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  var map, isCollapsed, circlepoint_red = new L.divIcon({className: 'pointmarker-red'}), 
  circlepoint_grey = new L.divIcon({className: 'pointmarker-grey'}), 
  circlepoint_yellow = new L.divIcon({className: 'pointmarker-yellow'}), 
  circlepoint_orange = new L.divIcon({className: 'pointmarker-orange'}), 
  circlepoint_green = new L.divIcon({className: 'pointmarker-green'}), 
  circlepoint_blue = new L.divIcon({className: 'pointmarker-blue'}), 
  circlepoint_pink = new L.divIcon({className: 'pointmarker-pink'}), 
  circlepoint_purple = new L.divIcon({className: 'pointmarker-purple'}), googleSatellite, googleStreets, googleHybrid, googleTerrain, openStreetMaps, openStreetMapsBW, openTopoMap, cartoDarkMatter, minzoom = 9, maxzoom = 20, initzoom = 12;
  openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openStreetMapsBW = new L.TileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openTopoMap = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    minZoom: 9,
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  cartoDarkMatter = new L.TileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  });
  var adminBoundary = L.featureGroup(null), regionAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 4, fill: false, opacity: 1, clickable: false};}}), districtAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 3.5, fill: false, opacity: 1, clickable: false};}}), 
    subDistrictAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 3, fill: false, opacity: 1, clickable: false};}}), localBlockAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 2.5, fill: false, opacity: 1, clickable: false};}}), markerClusters, 
    familyPoints = L.geoJson(null, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: circlepoint_red});
      },
      onEachFeature: function(feature, layer){
        layer.bindPopup('Memuat data...', {closeButton:false,maxWidth:460});
        layer.on({
          click: function(e){
            var thisPopup = e.target.getPopup();
            let _payload = JSON.stringify({"objectid":feature.properties.gid});
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.onload = function(){
              let responseObj = xhr.response;
              let _dataarray = responseObj.dataarray;
              let _datarows = '';
              let _rowcount = 1;
              for(var i=0;i<_dataarray.length;i++){
                _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].nama_lgkp+`</td><td class=''>`+_dataarray[i].jenis_klmin+`</td><td class=''>`+_dataarray[i].stat_hbkel+`</td></tr>`;
                _rowcount++;
              }
              let content = `<table class='table is-striped is-bordered is-fullwidth is-size-7'><thead><tr><th colspan='4' class='has-text-centered'>Informasi Keluarga</th></tr><tr><th class=''>No. KK</th><th colspan='3' class=''>`+responseObj.no_kk+`</th></tr><tr><th class=''>Nama KK</th><th colspan='3' class=''>`+responseObj.nama_kep+`</th></tr><tr><th class=''>Alamat</th><th colspan='3' class=''>`+responseObj.alamat+`</th></tr><tr><th class=''>RT / RW</th><th colspan='2' class='has-text-right'>`+responseObj.no_rt+`</th><th class='has-text-right'>`+responseObj.no_rw+`</th></tr><tr><th class=''>Desa / Kelurahan</th><th colspan='3' class=''>`+responseObj.nama_kelurahan+`</th></tr><tr><th class=''>Kecamatan</th><th colspan='3' class=''>`+responseObj.nama_kecamatan+`</th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
              setTimeout(function(){
                thisPopup.setContent(content);
                thisPopup.update();
              }, 1000);
            };
            xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyInfo');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(_payload);
          }
        });
      }
    });
  markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 18
  });
  let _payloadBWAdmRegion = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let _payloadBWAdmDistrict = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let _payloadBWAdmSubDistrict = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let _payloadBWAdmLocalBlock = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let _payloadFamilyPoints = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr1 = new XMLHttpRequest();
  xhr1.responseType = 'json';
  xhr1.onload = function(){
    let responseObj1 = xhr1.response;
    regionAdminBoundary.addData(responseObj1);
    adminBoundary.addLayer(regionAdminBoundary);
    let southWest = L.latLng(regionAdminBoundary.getBounds().getSouthWest()),
      northEast = L.latLng(regionAdminBoundary.getBounds().getNorthEast()),
      maxBoundingBox = L.latLngBounds(southWest, northEast);
    googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    let xhr2 = new XMLHttpRequest();
    xhr2.responseType = 'json';
    xhr2.onload = function(){
      let responseObj2 = xhr2.response;
      districtAdminBoundary.addData(responseObj2);
      adminBoundary.addLayer(districtAdminBoundary);
      let xhr3 = new XMLHttpRequest();
      xhr3.responseType = 'json';
      xhr3.onload = function(){
        let responseObj3 = xhr3.response;
        subDistrictAdminBoundary.addData(responseObj3);
        adminBoundary.addLayer(subDistrictAdminBoundary);
        let xhr4 = new XMLHttpRequest();
        xhr4.responseType = 'json';
        xhr4.onload = function(){
          let responseObj4 = xhr4.response;
          localBlockAdminBoundary.addData(responseObj4);
          adminBoundary.addLayer(localBlockAdminBoundary);
          map = L.map('map', {
            layers:[openStreetMaps, adminBoundary, markerClusters],
            zoomControl: false
          });
          var zoomControl = L.control.zoom({
            position: "topleft"
          }).addTo(map);
          map.fitBounds(regionAdminBoundary.getBounds());
          let xhrFP = new XMLHttpRequest();
          xhrFP.responseType = 'json';
          xhrFP.onload = function(){
            let responseObjFP = xhrFP.response;
            familyPoints.addData(responseObjFP);
            markerClusters.addLayer(familyPoints);
          };
          xhrFP.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsByRegion');
          xhrFP.setRequestHeader('Content-Type', 'application/json');
          xhrFP.send(_payloadFamilyPoints);
          let basemaps = {
            "Google Satellite": googleSatellite,
            "Google Hybrid": googleHybrid,
            "Google Streets": googleStreets,
            "Google Terrain": googleTerrain,
            "OpenStreetMap": openStreetMaps,
            "OpenstreetMap BW": openStreetMapsBW,
            "OpenTopoMap": openTopoMap,
            "Carto Dark Matter": cartoDarkMatter
          };
          let groupedOverlays = {
            "Batas Wilayah Administrasi": {
              "Kabupaten / Kota": regionAdminBoundary,
              "Kecamatan": districtAdminBoundary,
              "Desa / Kelurahan": subDistrictAdminBoundary,
              "RW": localBlockAdminBoundary
            },
            "Hasil Pendataan": {
              "Keluarga": familyPoints
            }
          };
          if (document.body.clientWidth <= 767) {
            isCollapsed = true;
          } else {
            isCollapsed = false;
          }
          let layerControl = L.control.groupedLayers(basemaps, groupedOverlays, {
            collapsed: isCollapsed
          }).addTo(map);
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
        };
        xhr4.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryLocalBlockByRegion');
        xhr4.setRequestHeader('Content-Type', 'application/json');
        xhr4.send(_payloadBWAdmLocalBlock);
      };
      xhr3.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundarySubDistrictByRegion');
      xhr3.setRequestHeader('Content-Type', 'application/json');
      xhr3.send(_payloadBWAdmSubDistrict);
    };
    xhr2.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryDistrictByRegion');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.send(_payloadBWAdmDistrict);
  };
  xhr1.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryRegion');
  xhr1.setRequestHeader('Content-Type', 'application/json');
  xhr1.send(_payloadBWAdmRegion);
};

webmap.createThematicMapFamilyDistrict = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  var map, isCollapsed, circlepoint_red = new L.divIcon({className: 'pointmarker-red'}), 
  circlepoint_grey = new L.divIcon({className: 'pointmarker-grey'}), 
  circlepoint_yellow = new L.divIcon({className: 'pointmarker-yellow'}), 
  circlepoint_orange = new L.divIcon({className: 'pointmarker-orange'}), 
  circlepoint_green = new L.divIcon({className: 'pointmarker-green'}), 
  circlepoint_blue = new L.divIcon({className: 'pointmarker-blue'}), 
  circlepoint_pink = new L.divIcon({className: 'pointmarker-pink'}), 
  circlepoint_purple = new L.divIcon({className: 'pointmarker-purple'}), googleSatellite, googleStreets, googleHybrid, googleTerrain, openStreetMaps, openStreetMapsBW, openTopoMap, cartoDarkMatter, minzoom = 9, maxzoom = 20, initzoom = 12;
  openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openStreetMapsBW = new L.TileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openTopoMap = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    minZoom: 9,
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  cartoDarkMatter = new L.TileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  });
  var adminBoundary = L.featureGroup(null), districtAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 4, fill: false, opacity: 1, clickable: false};}}), 
    subDistrictAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 3.5, fill: false, opacity: 1, clickable: false};}}), localBlockAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 3, fill: false, opacity: 1, clickable: false};}}), markerClusters, 
    familyPoints = L.geoJson(null, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: circlepoint_red});
      },
      onEachFeature: function(feature, layer){
        layer.bindPopup('Memuat data...', {closeButton:false,maxWidth:460});
        layer.on({
          click: function(e){
            var thisPopup = e.target.getPopup();
            let _payload = JSON.stringify({"objectid":feature.properties.gid});
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.onload = function(){
              let responseObj = xhr.response;
              let _dataarray = responseObj.dataarray;
              let _datarows = '';
              let _rowcount = 1;
              for(var i=0;i<_dataarray.length;i++){
                _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].nama_lgkp+`</td><td class=''>`+_dataarray[i].jenis_klmin+`</td><td class=''>`+_dataarray[i].stat_hbkel+`</td></tr>`;
                _rowcount++;
              }
              let content = `<table class='table is-striped is-bordered is-fullwidth is-size-7'><thead><tr><th colspan='4' class='has-text-centered'>Informasi Keluarga</th></tr><tr><th class=''>No. KK</th><th colspan='3' class=''>`+responseObj.no_kk+`</th></tr><tr><th class=''>Nama KK</th><th colspan='3' class=''>`+responseObj.nama_kep+`</th></tr><tr><th class=''>Alamat</th><th colspan='3' class=''>`+responseObj.alamat+`</th></tr><tr><th class=''>RT / RW</th><th colspan='2' class='has-text-right'>`+responseObj.no_rt+`</th><th class='has-text-right'>`+responseObj.no_rw+`</th></tr><tr><th class=''>Desa / Kelurahan</th><th colspan='3' class=''>`+responseObj.nama_kelurahan+`</th></tr><tr><th class=''>Kecamatan</th><th colspan='3' class=''>`+responseObj.nama_kecamatan+`</th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
              setTimeout(function(){
                thisPopup.setContent(content);
                thisPopup.update();
              }, 1000);
            };
            xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyInfo');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(_payload);
          }
        });
      }
    });
  markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 18
  });
  let _payloadBWAdmDistrict = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
  let _payloadBWAdmSubDistrict = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
  let _payloadBWAdmLocalBlock = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
  let _payloadFamilyPoints = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr1 = new XMLHttpRequest();
  xhr1.responseType = 'json';
  xhr1.onload = function(){
    let responseObj1 = xhr1.response;
    districtAdminBoundary.addData(responseObj1);
    adminBoundary.addLayer(districtAdminBoundary);
    let southWest = L.latLng(districtAdminBoundary.getBounds().getSouthWest()),
      northEast = L.latLng(districtAdminBoundary.getBounds().getNorthEast()),
      maxBoundingBox = L.latLngBounds(southWest, northEast);
    googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    let xhr2 = new XMLHttpRequest();
    xhr2.responseType = 'json';
    xhr2.onload = function(){
      let responseObj2 = xhr2.response;
      subDistrictAdminBoundary.addData(responseObj2);
      adminBoundary.addLayer(subDistrictAdminBoundary);
      let xhr3 = new XMLHttpRequest();
      xhr3.responseType = 'json';
      xhr3.onload = function(){
        let responseObj3 = xhr3.response;
        localBlockAdminBoundary.addData(responseObj3);
        adminBoundary.addLayer(localBlockAdminBoundary);
        map = L.map('map', {
          layers:[openStreetMaps, adminBoundary, markerClusters],
          zoomControl: false
        });
        var zoomControl = L.control.zoom({
          position: "topleft"
        }).addTo(map);
        map.fitBounds(districtAdminBoundary.getBounds());
        let xhrFP = new XMLHttpRequest();
        xhrFP.responseType = 'json';
        xhrFP.onload = function(){
          let responseObjFP = xhrFP.response;
          familyPoints.addData(responseObjFP);
          markerClusters.addLayer(familyPoints);
        };
        xhrFP.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsByDistrict');
        xhrFP.setRequestHeader('Content-Type', 'application/json');
        xhrFP.send(_payloadFamilyPoints);
        let basemaps = {
          "Google Satellite": googleSatellite,
          "Google Hybrid": googleHybrid,
          "Google Streets": googleStreets,
          "Google Terrain": googleTerrain,
          "OpenStreetMap": openStreetMaps,
          "OpenstreetMap BW": openStreetMapsBW,
          "OpenTopoMap": openTopoMap,
          "Carto Dark Matter": cartoDarkMatter
        };
        let groupedOverlays = {
          "Batas Wilayah Administrasi": {
            "Kecamatan": districtAdminBoundary,
            "Desa / Kelurahan": subDistrictAdminBoundary,
            "RW": localBlockAdminBoundary
          },
          "Hasil Pendataan": {
            "Keluarga": familyPoints
          }
        };
        if (document.body.clientWidth <= 767) {
          isCollapsed = true;
        } else {
          isCollapsed = false;
        }
        let layerControl = L.control.groupedLayers(basemaps, groupedOverlays, {
          collapsed: isCollapsed
        }).addTo(map);
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
      };
      xhr3.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryLocalBlockByDistrict');
      xhr3.setRequestHeader('Content-Type', 'application/json');
      xhr3.send(_payloadBWAdmLocalBlock);
    };
    xhr2.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundarySubDistrictByDistrict');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.send(_payloadBWAdmSubDistrict);
  };
  xhr1.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryDistrict');
  xhr1.setRequestHeader('Content-Type', 'application/json');
  xhr1.send(_payloadBWAdmDistrict);
};

webmap.createThematicMapFamilySubDistrict = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  var map, isCollapsed, circlepoint_red = new L.divIcon({className: 'pointmarker-red'}), 
  circlepoint_grey = new L.divIcon({className: 'pointmarker-grey'}), 
  circlepoint_yellow = new L.divIcon({className: 'pointmarker-yellow'}), 
  circlepoint_orange = new L.divIcon({className: 'pointmarker-orange'}), 
  circlepoint_green = new L.divIcon({className: 'pointmarker-green'}), 
  circlepoint_blue = new L.divIcon({className: 'pointmarker-blue'}), 
  circlepoint_pink = new L.divIcon({className: 'pointmarker-pink'}), 
  circlepoint_purple = new L.divIcon({className: 'pointmarker-purple'}), googleSatellite, googleStreets, googleHybrid, googleTerrain, openStreetMaps, openStreetMapsBW, openTopoMap, cartoDarkMatter, minzoom = 9, maxzoom = 20, initzoom = 12;
  openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openStreetMapsBW = new L.TileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openTopoMap = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    minZoom: 9,
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  cartoDarkMatter = new L.TileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  });
  var adminBoundary = L.featureGroup(null), subDistrictAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 4, fill: false, opacity: 1, clickable: false};}}), localBlockAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 3, fill: false, opacity: 1, clickable: false};}}), markerClusters, 
    familyPoints = L.geoJson(null, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: circlepoint_red});
      },
      onEachFeature: function(feature, layer){
        layer.bindPopup('Memuat data...', {closeButton:false,maxWidth:460});
        layer.on({
          click: function(e){
            var thisPopup = e.target.getPopup();
            let _payload = JSON.stringify({"objectid":feature.properties.gid});
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.onload = function(){
              let responseObj = xhr.response;
              let _dataarray = responseObj.dataarray;
              let _datarows = '';
              let _rowcount = 1;
              for(var i=0;i<_dataarray.length;i++){
                _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].nama_lgkp+`</td><td class=''>`+_dataarray[i].jenis_klmin+`</td><td class=''>`+_dataarray[i].stat_hbkel+`</td></tr>`;
                _rowcount++;
              }
              let content = `<table class='table is-striped is-bordered is-fullwidth is-size-7'><thead><tr><th colspan='4' class='has-text-centered'>Informasi Keluarga</th></tr><tr><th class=''>No. KK</th><th colspan='3' class=''>`+responseObj.no_kk+`</th></tr><tr><th class=''>Nama KK</th><th colspan='3' class=''>`+responseObj.nama_kep+`</th></tr><tr><th class=''>Alamat</th><th colspan='3' class=''>`+responseObj.alamat+`</th></tr><tr><th class=''>RT / RW</th><th colspan='2' class='has-text-right'>`+responseObj.no_rt+`</th><th class='has-text-right'>`+responseObj.no_rw+`</th></tr><tr><th class=''>Desa / Kelurahan</th><th colspan='3' class=''>`+responseObj.nama_kelurahan+`</th></tr><tr><th class=''>Kecamatan</th><th colspan='3' class=''>`+responseObj.nama_kecamatan+`</th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
              setTimeout(function(){
                thisPopup.setContent(content);
                thisPopup.update();
              }, 1000);
            };
            xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyInfo');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(_payload);
          }
        });
      }
    });
  markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 18
  });
  let _payloadBWAdmSubDistrict = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict});
  let _payloadBWAdmLocalBlock = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict});
  let _payloadFamilyPoints = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict});
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr1 = new XMLHttpRequest();
  xhr1.responseType = 'json';
  xhr1.onload = function(){
    let responseObj1 = xhr1.response;
    subDistrictAdminBoundary.addData(responseObj1);
    adminBoundary.addLayer(subDistrictAdminBoundary);
    let southWest = L.latLng(subDistrictAdminBoundary.getBounds().getSouthWest()),
      northEast = L.latLng(subDistrictAdminBoundary.getBounds().getNorthEast()),
      maxBoundingBox = L.latLngBounds(southWest, northEast);
    googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    let xhr2 = new XMLHttpRequest();
    xhr2.responseType = 'json';
    xhr2.onload = function(){
      let responseObj2 = xhr2.response;
      localBlockAdminBoundary.addData(responseObj2);
      adminBoundary.addLayer(localBlockAdminBoundary);
      map = L.map('map', {
        layers:[openStreetMaps, adminBoundary, markerClusters],
        zoomControl: false
      });
      var zoomControl = L.control.zoom({
        position: "topleft"
      }).addTo(map);
      map.fitBounds(subDistrictAdminBoundary.getBounds());
      let xhrFP = new XMLHttpRequest();
      xhrFP.responseType = 'json';
      xhrFP.onload = function(){
        let responseObjFP = xhrFP.response;
        familyPoints.addData(responseObjFP);
        markerClusters.addLayer(familyPoints);
      };
      xhrFP.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsBySubDistrict');
      xhrFP.setRequestHeader('Content-Type', 'application/json');
      xhrFP.send(_payloadFamilyPoints);
      let basemaps = {
        "Google Satellite": googleSatellite,
        "Google Hybrid": googleHybrid,
        "Google Streets": googleStreets,
        "Google Terrain": googleTerrain,
        "OpenStreetMap": openStreetMaps,
        "OpenstreetMap BW": openStreetMapsBW,
        "OpenTopoMap": openTopoMap,
        "Carto Dark Matter": cartoDarkMatter
      };
      let groupedOverlays = {
        "Batas Wilayah Administrasi": {
          "Desa / Kelurahan": subDistrictAdminBoundary,
          "RW": localBlockAdminBoundary
        },
        "Hasil Pendataan": {
          "Keluarga": familyPoints
        }
      };
      if (document.body.clientWidth <= 767) {
        isCollapsed = true;
      } else {
        isCollapsed = false;
      }
      let layerControl = L.control.groupedLayers(basemaps, groupedOverlays, {
        collapsed: isCollapsed
      }).addTo(map);
      _loaderModal.classList.remove('is-active');
      _loaderContainer.innerHTML = ``;
    };
    xhr2.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryLocalBlockBySubDistrict');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.send(_payloadBWAdmLocalBlock);
  };
  xhr1.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundarySubDistrict');
  xhr1.setRequestHeader('Content-Type', 'application/json');
  xhr1.send(_payloadBWAdmSubDistrict);
};

webmap.createThematicMapFamilyLocalBlock = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  var map, isCollapsed, circlepoint_red = new L.divIcon({className: 'pointmarker-red'}), 
  circlepoint_grey = new L.divIcon({className: 'pointmarker-grey'}), 
  circlepoint_yellow = new L.divIcon({className: 'pointmarker-yellow'}), 
  circlepoint_orange = new L.divIcon({className: 'pointmarker-orange'}), 
  circlepoint_green = new L.divIcon({className: 'pointmarker-green'}), 
  circlepoint_blue = new L.divIcon({className: 'pointmarker-blue'}), 
  circlepoint_pink = new L.divIcon({className: 'pointmarker-pink'}), 
  circlepoint_purple = new L.divIcon({className: 'pointmarker-purple'}), googleSatellite, googleStreets, googleHybrid, googleTerrain, openStreetMaps, openStreetMapsBW, openTopoMap, cartoDarkMatter, minzoom = 9, maxzoom = 20, initzoom = 12;
  openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openStreetMapsBW = new L.TileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openTopoMap = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    minZoom: 9,
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  cartoDarkMatter = new L.TileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  });
  var adminBoundary = L.featureGroup(null), localBlockAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 4, fill: false, opacity: 1, clickable: false};}}), markerClusters, 
    familyPoints = L.geoJson(null, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: circlepoint_red});
      },
      onEachFeature: function(feature, layer){
        layer.bindPopup('Memuat data...', {closeButton:false,maxWidth:460});
        layer.on({
          click: function(e){
            var thisPopup = e.target.getPopup();
            let _payload = JSON.stringify({"objectid":feature.properties.gid});
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.onload = function(){
              let responseObj = xhr.response;
              let _dataarray = responseObj.dataarray;
              let _datarows = '';
              let _rowcount = 1;
              for(var i=0;i<_dataarray.length;i++){
                _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].nama_lgkp+`</td><td class=''>`+_dataarray[i].jenis_klmin+`</td><td class=''>`+_dataarray[i].stat_hbkel+`</td></tr>`;
                _rowcount++;
              }
              let content = `<table class='table is-striped is-bordered is-fullwidth is-size-7'><thead><tr><th colspan='4' class='has-text-centered'>Informasi Keluarga</th></tr><tr><th class=''>No. KK</th><th colspan='3' class=''>`+responseObj.no_kk+`</th></tr><tr><th class=''>Nama KK</th><th colspan='3' class=''>`+responseObj.nama_kep+`</th></tr><tr><th class=''>Alamat</th><th colspan='3' class=''>`+responseObj.alamat+`</th></tr><tr><th class=''>RT / RW</th><th colspan='2' class='has-text-right'>`+responseObj.no_rt+`</th><th class='has-text-right'>`+responseObj.no_rw+`</th></tr><tr><th class=''>Desa / Kelurahan</th><th colspan='3' class=''>`+responseObj.nama_kelurahan+`</th></tr><tr><th class=''>Kecamatan</th><th colspan='3' class=''>`+responseObj.nama_kecamatan+`</th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
              setTimeout(function(){
                thisPopup.setContent(content);
                thisPopup.update();
              }, 1000);
            };
            xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyInfo');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(_payload);
          }
        });
      }
    });
  markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 18
  });
  let _payloadBWAdmLocalBlock = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict,"norw":_udObj.localblock});
  let _payloadFamilyPoints = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict,"norw":_udObj.localblock});
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr1 = new XMLHttpRequest();
  xhr1.responseType = 'json';
  xhr1.onload = function(){
    let responseObj1 = xhr1.response;
    localBlockAdminBoundary.addData(responseObj1);
    adminBoundary.addLayer(localBlockAdminBoundary);
    let southWest = L.latLng(localBlockAdminBoundary.getBounds().getSouthWest()),
      northEast = L.latLng(localBlockAdminBoundary.getBounds().getNorthEast()),
      maxBoundingBox = L.latLngBounds(southWest, northEast);
    googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    map = L.map('map', {
      layers:[openStreetMaps, adminBoundary, markerClusters],
      zoomControl: false
    });
    var zoomControl = L.control.zoom({
      position: "topleft"
    }).addTo(map);
    map.fitBounds(localBlockAdminBoundary.getBounds());
    let xhrFP = new XMLHttpRequest();
    xhrFP.responseType = 'json';
    xhrFP.onload = function(){
      let responseObjFP = xhrFP.response;
      familyPoints.addData(responseObjFP);
      markerClusters.addLayer(familyPoints);
    };
    xhrFP.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsByLocalBlock');
    xhrFP.setRequestHeader('Content-Type', 'application/json');
    xhrFP.send(_payloadFamilyPoints);
    let basemaps = {
      "Google Satellite": googleSatellite,
      "Google Hybrid": googleHybrid,
      "Google Streets": googleStreets,
      "Google Terrain": googleTerrain,
      "OpenStreetMap": openStreetMaps,
      "OpenstreetMap BW": openStreetMapsBW,
      "OpenTopoMap": openTopoMap,
      "Carto Dark Matter": cartoDarkMatter
    };
    let groupedOverlays = {
      "Batas Wilayah Administrasi": {
        "RW": localBlockAdminBoundary
      },
      "Hasil Pendataan": {
        "Keluarga": familyPoints
      }
    };
    if (document.body.clientWidth <= 767) {
      isCollapsed = true;
    } else {
      isCollapsed = false;
    }
    let layerControl = L.control.groupedLayers(basemaps, groupedOverlays, {
      collapsed: isCollapsed
    }).addTo(map);
    _loaderModal.classList.remove('is-active');
    _loaderContainer.innerHTML = ``;
  };
  xhr1.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryLocalBlock');
  xhr1.setRequestHeader('Content-Type', 'application/json');
  xhr1.send(_payloadBWAdmLocalBlock);
};

webmap.createDigitizeMapFamilyRegion = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  var map, isCollapsed, circlepoint_red = new L.divIcon({className: 'pointmarker-red'}), 
  circlepoint_grey = new L.divIcon({className: 'pointmarker-grey'}), 
  circlepoint_yellow = new L.divIcon({className: 'pointmarker-yellow'}), 
  circlepoint_orange = new L.divIcon({className: 'pointmarker-orange'}), 
  circlepoint_green = new L.divIcon({className: 'pointmarker-green'}), 
  circlepoint_blue = new L.divIcon({className: 'pointmarker-blue'}), 
  circlepoint_pink = new L.divIcon({className: 'pointmarker-pink'}), 
  circlepoint_purple = new L.divIcon({className: 'pointmarker-purple'}), googleSatellite, googleStreets, googleHybrid, googleTerrain, openStreetMaps, openStreetMapsBW, openTopoMap, cartoDarkMatter, minzoom = 9, maxzoom = 20, initzoom = 12;
  openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openStreetMapsBW = new L.TileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openTopoMap = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    minZoom: 9,
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  cartoDarkMatter = new L.TileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  });
  var adminBoundary = L.featureGroup(null), regionAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 4, fill: false, opacity: 1, clickable: false};}}), districtAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 3.5, fill: false, opacity: 1, clickable: false};}}), 
    subDistrictAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 3, fill: false, opacity: 1, clickable: false};}}), localBlockAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 2.5, fill: false, opacity: 1, clickable: false};}}), markerClusters, 
    familyPoints = L.geoJson(null, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: circlepoint_red});
      },
      onEachFeature: function(feature, layer){
        layer.bindPopup('Memuat data...', {closeButton:false,maxWidth:460});
        layer.on({
          click: function(e){
            var thisPopup = e.target.getPopup();
            let _payload = JSON.stringify({"objectid":feature.properties.gid});
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.onload = function(){
              let responseObj = xhr.response;
              let _dataarray = responseObj.dataarray;
              let _datarows = '';
              let _rowcount = 1;
              for(var i=0;i<_dataarray.length;i++){
                _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].nama_lgkp+`</td><td class=''>`+_dataarray[i].jenis_klmin+`</td><td class=''>`+_dataarray[i].stat_hbkel+`</td></tr>`;
                _rowcount++;
              }
              let content = `<table class='table is-striped is-bordered is-fullwidth is-size-7'><thead><tr><th colspan='4' class='has-text-centered'>Informasi Keluarga</th></tr><tr><th class=''>No. KK</th><th colspan='3' class=''>`+responseObj.no_kk+`</th></tr><tr><th class=''>Nama KK</th><th colspan='3' class=''>`+responseObj.nama_kep+`</th></tr><tr><th class=''>Alamat</th><th colspan='3' class=''>`+responseObj.alamat+`</th></tr><tr><th class=''>RT / RW</th><th colspan='2' class='has-text-right'>`+responseObj.no_rt+`</th><th class='has-text-right'>`+responseObj.no_rw+`</th></tr><tr><th class=''>Desa / Kelurahan</th><th colspan='3' class=''>`+responseObj.nama_kelurahan+`</th></tr><tr><th class=''>Kecamatan</th><th colspan='3' class=''>`+responseObj.nama_kecamatan+`</th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
              setTimeout(function(){
                thisPopup.setContent(content);
                thisPopup.update();
              }, 1000);
            };
            xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyInfo');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(_payload);
          }
        });
      }
    });
  markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 18
  });
  let _payloadBWAdmRegion = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let _payloadBWAdmDistrict = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let _payloadBWAdmSubDistrict = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let _payloadBWAdmLocalBlock = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let _payloadFamilyPoints = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr1 = new XMLHttpRequest();
  xhr1.responseType = 'json';
  xhr1.onload = function(){
    let responseObj1 = xhr1.response;
    regionAdminBoundary.addData(responseObj1);
    adminBoundary.addLayer(regionAdminBoundary);
    let southWest = L.latLng(regionAdminBoundary.getBounds().getSouthWest()),
      northEast = L.latLng(regionAdminBoundary.getBounds().getNorthEast()),
      maxBoundingBox = L.latLngBounds(southWest, northEast);
    googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    let xhr2 = new XMLHttpRequest();
    xhr2.responseType = 'json';
    xhr2.onload = function(){
      let responseObj2 = xhr2.response;
      districtAdminBoundary.addData(responseObj2);
      adminBoundary.addLayer(districtAdminBoundary);
      let xhr3 = new XMLHttpRequest();
      xhr3.responseType = 'json';
      xhr3.onload = function(){
        let responseObj3 = xhr3.response;
        subDistrictAdminBoundary.addData(responseObj3);
        adminBoundary.addLayer(subDistrictAdminBoundary);
        let xhr4 = new XMLHttpRequest();
        xhr4.responseType = 'json';
        xhr4.onload = function(){
          let responseObj4 = xhr4.response;
          localBlockAdminBoundary.addData(responseObj4);
          adminBoundary.addLayer(localBlockAdminBoundary);
          map = L.map('map', {
            layers:[openStreetMaps, adminBoundary, markerClusters],
            zoomControl: false
          });
          var zoomControl = L.control.zoom({
            position: "topleft"
          }).addTo(map);
          map.fitBounds(regionAdminBoundary.getBounds());
          let xhr5 = new XMLHttpRequest();
          xhr5.responseType = 'json';
          xhr5.onload = function(){
            let responseObj5 = xhr5.response;
            familyPoints.addData(responseObj5);
            markerClusters.addLayer(familyPoints);
          };
          xhr5.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsByRegion');
          xhr5.setRequestHeader('Content-Type', 'application/json');
          xhr5.send(_payloadFamilyPoints);
          let basemaps = {
            "Google Satellite": googleSatellite,
            "Google Hybrid": googleHybrid,
            "Google Streets": googleStreets,
            "Google Terrain": googleTerrain,
            "OpenStreetMap": openStreetMaps,
            "OpenstreetMap BW": openStreetMapsBW,
            "OpenTopoMap": openTopoMap,
            "Carto Dark Matter": cartoDarkMatter
          };
          let groupedOverlays = {
            "Batas Wilayah Administrasi": {
              "Kabupaten / Kota": regionAdminBoundary,
              "Kecamatan": districtAdminBoundary,
              "Desa / Kelurahan": subDistrictAdminBoundary,
              "RW": localBlockAdminBoundary
            },
            "Hasil Pendataan": {
              "Keluarga": familyPoints
            }
          };
          if (document.body.clientWidth <= 767) {
            isCollapsed = true;
          } else {
            isCollapsed = false;
          }
          let layerControl = L.control.groupedLayers(basemaps, groupedOverlays, {
            collapsed: isCollapsed
          }).addTo(map);
          let drawnItems = new L.FeatureGroup();
          map.addLayer(drawnItems);
          let drawControl = new L.Control.Draw({
            draw: {
              position: 'topleft',
              polyline: false,
              polygon: false,
              rectangle: false,
              circle: false,
              marker: true,
              circlemarker: false
            },
            edit: false
          });
          map.addControl(drawControl);
          map.on('draw:created', function (e) {
            let layer = e.layer, _latlng = layer.getLatLng(), _pointWKT = `POINT(`+_latlng.lng+` `+_latlng.lat+`)`;
            let _familyLookupPayload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"coordinates":_pointWKT});
            _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
            _loaderModal.classList.toggle('is-active');
            let xhrlookup = new XMLHttpRequest();
            xhrlookup.responseType = 'json';
            xhrlookup.onload = function(){
              let responseObj = xhrlookup.response;
              if(responseObj.status == 201){
                let _familyselectormodal = document.getElementById('familyselectormodal');
                let _dataarray = responseObj.dataarray;
                let _datarows = '';
                let _rowcount = 1;
                for(var i=0;i<_dataarray.length;i++){
                  _datarows += `<tr><td>`+_rowcount+`.</td><td class='has-text-centered'>`+_dataarray[i].no_kk+`</td><td class=''>`+_dataarray[i].nama_kep+`</td><td class='has-text-centered'>`+_dataarray[i].no_rw+`</td><td class='has-text-centered'>`+_dataarray[i].no_rt+`</td><td class='has-text-centered'><a href='' id='`+_dataarray[i].gid+`|`+_dataarray[i].nama_kep+`' class='button is-black is-small digitize-family-select'><i class='fa fa-map-marker'></i></a></td></tr>`;
                  _rowcount++;
                }
                let _tableDOM = `<table id='familyselectortable' class='table is-bordered is-striped is-fullwidth is-size-6'><tbody>`+_datarows+`</tbody></table>`;
                document.getElementById('datatablecontainer').innerHTML = _tableDOM;
                _familyselectormodal.classList.add('is-active');
                _loaderModal.classList.remove('is-active');
                _loaderContainer.innerHTML = ``;
                document.getElementById('coordinates').value = _pointWKT;
                components._applyFamilySelectionModalActionRegion(map,markerClusters,familyPoints);
                components._applyCloseDigitizeFamilySelectorModal();
              } else {
                _loaderModal.classList.remove('is-active');
                _loaderContainer.innerHTML = ``;
                let _isFailedConfirm = confirm(''+responseObj.message+'');
                if(_isFailedConfirm === true){
                  return;
                } else {
                  return;
                }
              }
              _loaderModal.classList.remove('is-active');
              _loaderContainer.innerHTML = ``;
            };
            xhrlookup.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyListByCoordinatesByRegion');
            xhrlookup.setRequestHeader('Content-Type', 'application/json');
            xhrlookup.send(_familyLookupPayload);
          });
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
        };
        xhr4.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryLocalBlockByRegion');
        xhr4.setRequestHeader('Content-Type', 'application/json');
        xhr4.send(_payloadBWAdmLocalBlock);
      };
      xhr3.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundarySubDistrictByRegion');
      xhr3.setRequestHeader('Content-Type', 'application/json');
      xhr3.send(_payloadBWAdmSubDistrict);
    };
    xhr2.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryDistrictByRegion');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.send(_payloadBWAdmDistrict);
  };
  xhr1.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryRegion');
  xhr1.setRequestHeader('Content-Type', 'application/json');
  xhr1.send(_payloadBWAdmRegion);
};

webmap.createDigitizeMapFamilyDistrict = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  var map, isCollapsed, circlepoint_red = new L.divIcon({className: 'pointmarker-red'}), 
  circlepoint_grey = new L.divIcon({className: 'pointmarker-grey'}), 
  circlepoint_yellow = new L.divIcon({className: 'pointmarker-yellow'}), 
  circlepoint_orange = new L.divIcon({className: 'pointmarker-orange'}), 
  circlepoint_green = new L.divIcon({className: 'pointmarker-green'}), 
  circlepoint_blue = new L.divIcon({className: 'pointmarker-blue'}), 
  circlepoint_pink = new L.divIcon({className: 'pointmarker-pink'}), 
  circlepoint_purple = new L.divIcon({className: 'pointmarker-purple'}), googleSatellite, googleStreets, googleHybrid, googleTerrain, openStreetMaps, openStreetMapsBW, openTopoMap, cartoDarkMatter, minzoom = 9, maxzoom = 20, initzoom = 12;
  openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openStreetMapsBW = new L.TileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openTopoMap = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    minZoom: 9,
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  cartoDarkMatter = new L.TileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  });
  var adminBoundary = L.featureGroup(null), districtAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 4, fill: false, opacity: 1, clickable: false};}}), 
    subDistrictAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 3.5, fill: false, opacity: 1, clickable: false};}}), localBlockAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 2, fill: false, opacity: 1, clickable: false};}}), markerClusters, 
    familyPoints = L.geoJson(null, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: circlepoint_red});
      },
      onEachFeature: function(feature, layer){
        layer.bindPopup('Memuat data...', {closeButton:false,maxWidth:460});
        layer.on({
          click: function(e){
            var thisPopup = e.target.getPopup();
            let _payload = JSON.stringify({"objectid":feature.properties.gid});
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.onload = function(){
              let responseObj = xhr.response;
              let _dataarray = responseObj.dataarray;
              let _datarows = '';
              let _rowcount = 1;
              for(var i=0;i<_dataarray.length;i++){
                _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].nama_lgkp+`</td><td class=''>`+_dataarray[i].jenis_klmin+`</td><td class=''>`+_dataarray[i].stat_hbkel+`</td></tr>`;
                _rowcount++;
              }
              let content = `<table class='table is-striped is-bordered is-fullwidth is-size-7'><thead><tr><th colspan='4' class='has-text-centered'>Informasi Keluarga</th></tr><tr><th class=''>No. KK</th><th colspan='3' class=''>`+responseObj.no_kk+`</th></tr><tr><th class=''>Nama KK</th><th colspan='3' class=''>`+responseObj.nama_kep+`</th></tr><tr><th class=''>Alamat</th><th colspan='3' class=''>`+responseObj.alamat+`</th></tr><tr><th class=''>RT / RW</th><th colspan='2' class='has-text-right'>`+responseObj.no_rt+`</th><th class='has-text-right'>`+responseObj.no_rw+`</th></tr><tr><th class=''>Desa / Kelurahan</th><th colspan='3' class=''>`+responseObj.nama_kelurahan+`</th></tr><tr><th class=''>Kecamatan</th><th colspan='3' class=''>`+responseObj.nama_kecamatan+`</th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
              setTimeout(function(){
                thisPopup.setContent(content);
                thisPopup.update();
              }, 1000);
            };
            xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyInfo');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(_payload);
          }
        });
      }
    });
  markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 18
  });
  let _payloadBWAdmDistrict = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
  let _payloadBWAdmSubDistrict = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
  let _payloadBWAdmLocalBlock = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
  let _payloadFamilyPoints = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr1 = new XMLHttpRequest();
  xhr1.responseType = 'json';
  xhr1.onload = function(){
    let responseObj1 = xhr1.response;
    districtAdminBoundary.addData(responseObj1);
    adminBoundary.addLayer(districtAdminBoundary);
    let southWest = L.latLng(districtAdminBoundary.getBounds().getSouthWest()),
      northEast = L.latLng(districtAdminBoundary.getBounds().getNorthEast()),
      maxBoundingBox = L.latLngBounds(southWest, northEast);
    googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    let xhr2 = new XMLHttpRequest();
    xhr2.responseType = 'json';
    xhr2.onload = function(){
      let responseObj2 = xhr2.response;
      subDistrictAdminBoundary.addData(responseObj2);
      adminBoundary.addLayer(subDistrictAdminBoundary);
      let xhr3 = new XMLHttpRequest();
      xhr3.responseType = 'json';
      xhr3.onload = function(){
        let responseObj3 = xhr3.response;
        localBlockAdminBoundary.addData(responseObj3);
        adminBoundary.addLayer(localBlockAdminBoundary);
        map = L.map('map', {
          layers:[openStreetMaps, adminBoundary, markerClusters],
          zoomControl: false
        });
        var zoomControl = L.control.zoom({
          position: "topleft"
        }).addTo(map);
        map.fitBounds(districtAdminBoundary.getBounds());
        let xhr4 = new XMLHttpRequest();
        xhr4.responseType = 'json';
        xhr4.onload = function(){
          let responseObj4 = xhr4.response;
          familyPoints.addData(responseObj4);
          markerClusters.addLayer(familyPoints);
        };
        xhr4.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsByDistrict');
        xhr4.setRequestHeader('Content-Type', 'application/json');
        xhr4.send(_payloadFamilyPoints);
        let basemaps = {
          "Google Satellite": googleSatellite,
          "Google Hybrid": googleHybrid,
          "Google Streets": googleStreets,
          "Google Terrain": googleTerrain,
          "OpenStreetMap": openStreetMaps,
          "OpenstreetMap BW": openStreetMapsBW,
          "OpenTopoMap": openTopoMap,
          "Carto Dark Matter": cartoDarkMatter
        };
        let groupedOverlays = {
          "Batas Wilayah Administrasi": {
            "Kecamatan": districtAdminBoundary,
            "Desa / Kelurahan": subDistrictAdminBoundary,
            "RW": localBlockAdminBoundary
          },
          "Hasil Pendataan": {
            "Keluarga": familyPoints
          }
        };
        if (document.body.clientWidth <= 767) {
          isCollapsed = true;
        } else {
          isCollapsed = false;
        }
        let layerControl = L.control.groupedLayers(basemaps, groupedOverlays, {
          collapsed: isCollapsed
        }).addTo(map);
        let drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
        let drawControl = new L.Control.Draw({
          draw: {
            position: 'topleft',
            polyline: false,
            polygon: false,
            rectangle: false,
            circle: false,
            marker: true,
            circlemarker: false
          },
          edit: false
        });
        map.addControl(drawControl);
        map.on('draw:created', function (e) {
          let layer = e.layer, _latlng = layer.getLatLng(), _pointWKT = `POINT(`+_latlng.lng+` `+_latlng.lat+`)`;
          let _familyLookupPayload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"coordinates":_pointWKT});
          _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
          _loaderModal.classList.toggle('is-active');
          let xhrlookup = new XMLHttpRequest();
          xhrlookup.responseType = 'json';
          xhrlookup.onload = function(){
            let responseObj = xhrlookup.response;
            if(responseObj.status == 201){
              let _familyselectormodal = document.getElementById('familyselectormodal');
              let _dataarray = responseObj.dataarray;
              let _datarows = '';
              let _rowcount = 1;
              for(var i=0;i<_dataarray.length;i++){
                _datarows += `<tr><td>`+_rowcount+`.</td><td class='has-text-centered'>`+_dataarray[i].no_kk+`</td><td class=''>`+_dataarray[i].nama_kep+`</td><td class='has-text-centered'>`+_dataarray[i].no_rw+`</td><td class='has-text-centered'>`+_dataarray[i].no_rt+`</td><td class='has-text-centered'><a href='' id='`+_dataarray[i].gid+`|`+_dataarray[i].nama_kep+`' class='button is-black is-small digitize-family-select'><i class='fa fa-map-marker'></i></a></td></tr>`;
                _rowcount++;
              }
              let _tableDOM = `<table id='familyselectortable' class='table is-bordered is-striped is-fullwidth is-size-6'><tbody>`+_datarows+`</tbody></table>`;
              document.getElementById('datatablecontainer').innerHTML = _tableDOM;
              _familyselectormodal.classList.add('is-active');
              _loaderModal.classList.remove('is-active');
              _loaderContainer.innerHTML = ``;
              document.getElementById('coordinates').value = _pointWKT;
              components._applyFamilySelectionModalActionDistrict(map,markerClusters,familyPoints);
              components._applyCloseDigitizeFamilySelectorModal();
            } else {
              _loaderModal.classList.remove('is-active');
              _loaderContainer.innerHTML = ``;
              let _isFailedConfirm = confirm(''+responseObj.message+'');
              if(_isFailedConfirm === true){
                return;
              } else {
                return;
              }
            }
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
          };
          xhrlookup.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyListByCoordinatesByDistrict');
          xhrlookup.setRequestHeader('Content-Type', 'application/json');
          xhrlookup.send(_familyLookupPayload);
        });
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
      };
      xhr3.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryLocalBlockByDistrict');
      xhr3.setRequestHeader('Content-Type', 'application/json');
      xhr3.send(_payloadBWAdmLocalBlock);
    };
    xhr2.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundarySubDistrictByDistrict');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.send(_payloadBWAdmSubDistrict);
  };
  xhr1.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryDistrict');
  xhr1.setRequestHeader('Content-Type', 'application/json');
  xhr1.send(_payloadBWAdmDistrict);
};

webmap.createDigitizeMapFamilySubDistrict = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  var map, isCollapsed, circlepoint_red = new L.divIcon({className: 'pointmarker-red'}), 
  circlepoint_grey = new L.divIcon({className: 'pointmarker-grey'}), 
  circlepoint_yellow = new L.divIcon({className: 'pointmarker-yellow'}), 
  circlepoint_orange = new L.divIcon({className: 'pointmarker-orange'}), 
  circlepoint_green = new L.divIcon({className: 'pointmarker-green'}), 
  circlepoint_blue = new L.divIcon({className: 'pointmarker-blue'}), 
  circlepoint_pink = new L.divIcon({className: 'pointmarker-pink'}), 
  circlepoint_purple = new L.divIcon({className: 'pointmarker-purple'}), googleSatellite, googleStreets, googleHybrid, googleTerrain, openStreetMaps, openStreetMapsBW, openTopoMap, cartoDarkMatter, minzoom = 9, maxzoom = 20, initzoom = 12;
  openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openStreetMapsBW = new L.TileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openTopoMap = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    minZoom: 9,
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  cartoDarkMatter = new L.TileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  });
  var adminBoundary = L.featureGroup(null), subDistrictAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 4, fill: false, opacity: 1, clickable: false};}}), localBlockAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 3, fill: false, opacity: 1, clickable: false};}}), markerClusters, 
    familyPoints = L.geoJson(null, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: circlepoint_red});
      },
      onEachFeature: function(feature, layer){
        layer.bindPopup('Memuat data...', {closeButton:false,maxWidth:460});
        layer.on({
          click: function(e){
            var thisPopup = e.target.getPopup();
            let _payload = JSON.stringify({"objectid":feature.properties.gid});
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.onload = function(){
              let responseObj = xhr.response;
              let _dataarray = responseObj.dataarray;
              let _datarows = '';
              let _rowcount = 1;
              for(var i=0;i<_dataarray.length;i++){
                _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].nama_lgkp+`</td><td class=''>`+_dataarray[i].jenis_klmin+`</td><td class=''>`+_dataarray[i].stat_hbkel+`</td></tr>`;
                _rowcount++;
              }
              let content = `<table class='table is-striped is-bordered is-fullwidth is-size-7'><thead><tr><th colspan='4' class='has-text-centered'>Informasi Keluarga</th></tr><tr><th class=''>No. KK</th><th colspan='3' class=''>`+responseObj.no_kk+`</th></tr><tr><th class=''>Nama KK</th><th colspan='3' class=''>`+responseObj.nama_kep+`</th></tr><tr><th class=''>Alamat</th><th colspan='3' class=''>`+responseObj.alamat+`</th></tr><tr><th class=''>RT / RW</th><th colspan='2' class='has-text-right'>`+responseObj.no_rt+`</th><th class='has-text-right'>`+responseObj.no_rw+`</th></tr><tr><th class=''>Desa / Kelurahan</th><th colspan='3' class=''>`+responseObj.nama_kelurahan+`</th></tr><tr><th class=''>Kecamatan</th><th colspan='3' class=''>`+responseObj.nama_kecamatan+`</th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
              setTimeout(function(){
                thisPopup.setContent(content);
                thisPopup.update();
              }, 1000);
            };
            xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyInfo');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(_payload);
          }
        });
      }
    });
  markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 18
  });
  let _payloadBWAdmSubDistrict = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict});
  let _payloadBWAdmLocalBlock = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict});
  let _payloadFamilyPoints = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict});
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr1 = new XMLHttpRequest();
  xhr1.responseType = 'json';
  xhr1.onload = function(){
    let responseObj1 = xhr1.response;
    subDistrictAdminBoundary.addData(responseObj1);
    adminBoundary.addLayer(subDistrictAdminBoundary);
    let southWest = L.latLng(subDistrictAdminBoundary.getBounds().getSouthWest()),
      northEast = L.latLng(subDistrictAdminBoundary.getBounds().getNorthEast()),
      maxBoundingBox = L.latLngBounds(southWest, northEast);
    googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    let xhr2 = new XMLHttpRequest();
    xhr2.responseType = 'json';
    xhr2.onload = function(){
      let responseObj2 = xhr2.response;
      localBlockAdminBoundary.addData(responseObj2);
      adminBoundary.addLayer(localBlockAdminBoundary);
      map = L.map('map', {
        layers:[openStreetMaps, adminBoundary, markerClusters],
        zoomControl: false
      });
      var zoomControl = L.control.zoom({
        position: "topleft"
      }).addTo(map);
      map.fitBounds(subDistrictAdminBoundary.getBounds());
      let xhr3 = new XMLHttpRequest();
      xhr3.responseType = 'json';
      xhr3.onload = function(){
        let responseObj3 = xhr3.response;
        familyPoints.addData(responseObj3);
        markerClusters.addLayer(familyPoints);
      };
      xhr3.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsBySubDistrict');
      xhr3.setRequestHeader('Content-Type', 'application/json');
      xhr3.send(_payloadFamilyPoints);
      let basemaps = {
        "Google Satellite": googleSatellite,
        "Google Hybrid": googleHybrid,
        "Google Streets": googleStreets,
        "Google Terrain": googleTerrain,
        "OpenStreetMap": openStreetMaps,
        "OpenstreetMap BW": openStreetMapsBW,
        "OpenTopoMap": openTopoMap,
        "Carto Dark Matter": cartoDarkMatter
      };
      let groupedOverlays = {
        "Batas Wilayah Administrasi": {
          "Desa / Kelurahan": subDistrictAdminBoundary,
          "RW": localBlockAdminBoundary
        },
        "Hasil Pendataan": {
          "Keluarga": familyPoints
        }
      };
      if (document.body.clientWidth <= 767) {
        isCollapsed = true;
      } else {
        isCollapsed = false;
      }
      let layerControl = L.control.groupedLayers(basemaps, groupedOverlays, {
        collapsed: isCollapsed
      }).addTo(map);
      let drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      let drawControl = new L.Control.Draw({
        draw: {
          position: 'topleft',
          polyline: false,
          polygon: false,
          rectangle: false,
          circle: false,
          marker: true,
          circlemarker: false
        },
        edit: false
      });
      map.addControl(drawControl);
      map.on('draw:created', function (e) {
        let layer = e.layer, _latlng = layer.getLatLng(), _pointWKT = `POINT(`+_latlng.lng+` `+_latlng.lat+`)`;
        let _familyLookupPayload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict,"coordinates":_pointWKT});
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhrlookup = new XMLHttpRequest();
        xhrlookup.responseType = 'json';
        xhrlookup.onload = function(){
          let responseObj = xhrlookup.response;
          if(responseObj.status == 201){
            let _familyselectormodal = document.getElementById('familyselectormodal');
            let _dataarray = responseObj.dataarray;
            let _datarows = '';
            let _rowcount = 1;
            for(var i=0;i<_dataarray.length;i++){
              _datarows += `<tr><td>`+_rowcount+`.</td><td class='has-text-centered'>`+_dataarray[i].no_kk+`</td><td class=''>`+_dataarray[i].nama_kep+`</td><td class='has-text-centered'>`+_dataarray[i].no_rw+`</td><td class='has-text-centered'>`+_dataarray[i].no_rt+`</td><td class='has-text-centered'><a href='' id='`+_dataarray[i].gid+`|`+_dataarray[i].nama_kep+`' class='button is-black is-small digitize-family-select'><i class='fa fa-map-marker'></i></a></td></tr>`;
              _rowcount++;
            }
            let _tableDOM = `<table id='familyselectortable' class='table is-bordered is-striped is-fullwidth is-size-6'><tbody>`+_datarows+`</tbody></table>`;
            document.getElementById('datatablecontainer').innerHTML = _tableDOM;
            _familyselectormodal.classList.add('is-active');
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            document.getElementById('coordinates').value = _pointWKT;
            components._applyFamilySelectionModalActionSubDistrict(map,markerClusters,familyPoints);
            components._applyCloseDigitizeFamilySelectorModal();
          } else {
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let _isFailedConfirm = confirm(''+responseObj.message+'');
            if(_isFailedConfirm === true){
              return;
            } else {
              return;
            }
          }
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
        };
        xhrlookup.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyListByCoordinatesBySubDistrict');
        xhrlookup.setRequestHeader('Content-Type', 'application/json');
        xhrlookup.send(_familyLookupPayload);
      });
      _loaderModal.classList.remove('is-active');
      _loaderContainer.innerHTML = ``;
    };
    xhr2.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryLocalBlockBySubDistrict');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.send(_payloadBWAdmLocalBlock);
  };
  xhr1.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundarySubDistrict');
  xhr1.setRequestHeader('Content-Type', 'application/json');
  xhr1.send(_payloadBWAdmSubDistrict);
};

webmap.createDigitizeMapFamilyLocalBlock = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  var map, isCollapsed, circlepoint_red = new L.divIcon({className: 'pointmarker-red'}), 
  circlepoint_grey = new L.divIcon({className: 'pointmarker-grey'}), 
  circlepoint_yellow = new L.divIcon({className: 'pointmarker-yellow'}), 
  circlepoint_orange = new L.divIcon({className: 'pointmarker-orange'}), 
  circlepoint_green = new L.divIcon({className: 'pointmarker-green'}), 
  circlepoint_blue = new L.divIcon({className: 'pointmarker-blue'}), 
  circlepoint_pink = new L.divIcon({className: 'pointmarker-pink'}), 
  circlepoint_purple = new L.divIcon({className: 'pointmarker-purple'}), googleSatellite, googleStreets, googleHybrid, googleTerrain, openStreetMaps, openStreetMapsBW, openTopoMap, cartoDarkMatter, minzoom = 9, maxzoom = 20, initzoom = 12;
  openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openStreetMapsBW = new L.TileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  openTopoMap = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    minZoom: 9,
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  cartoDarkMatter = new L.TileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
    minZoom: 9,
    maxZoom: 18,
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  });
  var adminBoundary = L.featureGroup(null), localBlockAdminBoundary = L.geoJson(null,{style: function(feature){return {color: "#FF0000", weight: 4, fill: false, opacity: 1, clickable: false};}}), markerClusters, 
    familyPoints = L.geoJson(null, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: circlepoint_red});
      },
      onEachFeature: function(feature, layer){
        layer.bindPopup('Memuat data...', {closeButton:false,maxWidth:460});
        layer.on({
          click: function(e){
            var thisPopup = e.target.getPopup();
            let _payload = JSON.stringify({"objectid":feature.properties.gid});
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.onload = function(){
              let responseObj = xhr.response;
              let _dataarray = responseObj.dataarray;
              let _datarows = '';
              let _rowcount = 1;
              for(var i=0;i<_dataarray.length;i++){
                _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].nama_lgkp+`</td><td class=''>`+_dataarray[i].jenis_klmin+`</td><td class=''>`+_dataarray[i].stat_hbkel+`</td></tr>`;
                _rowcount++;
              }
              let content = `<table class='table is-striped is-bordered is-fullwidth is-size-7'><thead><tr><th colspan='4' class='has-text-centered'>Informasi Keluarga</th></tr><tr><th class=''>No. KK</th><th colspan='3' class=''>`+responseObj.no_kk+`</th></tr><tr><th class=''>Nama KK</th><th colspan='3' class=''>`+responseObj.nama_kep+`</th></tr><tr><th class=''>Alamat</th><th colspan='3' class=''>`+responseObj.alamat+`</th></tr><tr><th class=''>RT / RW</th><th colspan='2' class='has-text-right'>`+responseObj.no_rt+`</th><th class='has-text-right'>`+responseObj.no_rw+`</th></tr><tr><th class=''>Desa / Kelurahan</th><th colspan='3' class=''>`+responseObj.nama_kelurahan+`</th></tr><tr><th class=''>Kecamatan</th><th colspan='3' class=''>`+responseObj.nama_kecamatan+`</th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
              setTimeout(function(){
                thisPopup.setContent(content);
                thisPopup.update();
              }, 1000);
            };
            xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyInfo');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(_payload);
          }
        });
      }
    });
  markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 18
  });
  let _payloadBWAdmLocalBlock = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict,"norw":_udObj.localblock});
  let _payloadFamilyPoints = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict,"norw":_udObj.localblock});
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr1 = new XMLHttpRequest();
  xhr1.responseType = 'json';
  xhr1.onload = function(){
    let responseObj1 = xhr1.response;
    localBlockAdminBoundary.addData(responseObj1);
    adminBoundary.addLayer(localBlockAdminBoundary);
    let southWest = L.latLng(localBlockAdminBoundary.getBounds().getSouthWest()),
      northEast = L.latLng(localBlockAdminBoundary.getBounds().getNorthEast()),
      maxBoundingBox = L.latLngBounds(southWest, northEast);
    googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
      maxBounds: maxBoundingBox,
      minZoom: 9,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
    });
    map = L.map('map', {
      layers:[openStreetMaps, adminBoundary, markerClusters],
      zoomControl: false
    });
    var zoomControl = L.control.zoom({
      position: "topleft"
    }).addTo(map);
    map.fitBounds(localBlockAdminBoundary.getBounds());
    let xhr2 = new XMLHttpRequest();
    xhr2.responseType = 'json';
    xhr2.onload = function(){
      let responseObj2 = xhr2.response;
      familyPoints.addData(responseObj2);
      markerClusters.addLayer(familyPoints);
    };
    xhr2.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsByLocalBlock');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.send(_payloadFamilyPoints);
    let basemaps = {
      "Google Satellite": googleSatellite,
      "Google Hybrid": googleHybrid,
      "Google Streets": googleStreets,
      "Google Terrain": googleTerrain,
      "OpenStreetMap": openStreetMaps,
      "OpenstreetMap BW": openStreetMapsBW,
      "OpenTopoMap": openTopoMap,
      "Carto Dark Matter": cartoDarkMatter
    };
    let groupedOverlays = {
      "Batas Wilayah Administrasi": {
        "RW": localBlockAdminBoundary
      },
      "Hasil Pendataan": {
        "Keluarga": familyPoints
      }
    };
    if (document.body.clientWidth <= 767) {
      isCollapsed = true;
    } else {
      isCollapsed = false;
    }
    let layerControl = L.control.groupedLayers(basemaps, groupedOverlays, {
      collapsed: isCollapsed
    }).addTo(map);
    let drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    let drawControl = new L.Control.Draw({
      draw: {
        position: 'topleft',
        polyline: false,
        polygon: false,
        rectangle: false,
        circle: false,
        marker: true,
        circlemarker: false
      },
      edit: false
    });
    map.addControl(drawControl);
    map.on('draw:created', function (e) {
      let layer = e.layer, _latlng = layer.getLatLng(), _pointWKT = `POINT(`+_latlng.lng+` `+_latlng.lat+`)`;
      let _familyLookupPayload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict,"norw":_udObj.localblock,"coordinates":_pointWKT});
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let xhrlookup = new XMLHttpRequest();
      xhrlookup.responseType = 'json';
      xhrlookup.onload = function(){
        let responseObj = xhrlookup.response;
        if(responseObj.status == 201){
          let _familyselectormodal = document.getElementById('familyselectormodal');
          let _dataarray = responseObj.dataarray;
          let _datarows = '';
          let _rowcount = 1;
          for(var i=0;i<_dataarray.length;i++){
            _datarows += `<tr><td>`+_rowcount+`.</td><td class='has-text-centered'>`+_dataarray[i].no_kk+`</td><td class=''>`+_dataarray[i].nama_kep+`</td><td class='has-text-centered'>`+_dataarray[i].no_rw+`</td><td class='has-text-centered'>`+_dataarray[i].no_rt+`</td><td class='has-text-centered'><a href='' id='`+_dataarray[i].gid+`|`+_dataarray[i].nama_kep+`' class='button is-black is-small digitize-family-select'><i class='fa fa-map-marker'></i></a></td></tr>`;
            _rowcount++;
          }
          let _tableDOM = `<table id='familyselectortable' class='table is-bordered is-striped is-fullwidth is-size-6'><tbody>`+_datarows+`</tbody></table>`;
          document.getElementById('datatablecontainer').innerHTML = _tableDOM;
          _familyselectormodal.classList.add('is-active');
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
          document.getElementById('coordinates').value = _pointWKT;
          components._applyFamilySelectionModalActionLocalBlock(map,markerClusters,familyPoints);
          components._applyCloseDigitizeFamilySelectorModal();
        } else {
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
          let _isFailedConfirm = confirm(''+responseObj.message+'');
          if(_isFailedConfirm === true){
            return;
          } else {
            return;
          }
        }
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
      };
      xhrlookup.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyListByCoordinatesByLocalBlock');
      xhrlookup.setRequestHeader('Content-Type', 'application/json');
      xhrlookup.send(_familyLookupPayload);
    });
    _loaderModal.classList.remove('is-active');
    _loaderContainer.innerHTML = ``;
  };
  xhr1.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getAdmBoundaryLocalBlock');
  xhr1.setRequestHeader('Content-Type', 'application/json');
  xhr1.send(_payloadBWAdmLocalBlock);
};

export default webmap;