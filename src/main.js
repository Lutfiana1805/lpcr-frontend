import './stylesheets/custom-theme.scss';
import './stylesheets/font-awesome.min.css';
import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/leaflet-draw/dist/leaflet.draw.css';
import '../node_modules/leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css';
import '../node_modules/leaflet.markercluster/dist/MarkerCluster.css';
import '../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../node_modules/leaflet-pulse-icon/src/L.Icon.Pulse.css';
import '../node_modules/simple-datatables/src/style.css';

import config from './config';
import ui from './ui';

document.addEventListener('DOMContentLoaded', () => {
  let _userdata = sessionStorage.getItem('_userdata');
  if(_userdata==null){
    sessionStorage.clear();
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function(){
      let responseObj = xhr.response;
      let _responseStr = JSON.stringify(responseObj);
      sessionStorage.setItem('_userdata', _responseStr);
    };
    xhr.open('GET', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getInitToken');
    xhr.send();
    ui.initUI();
  } else {
    let _userDataObj = JSON.parse(_userdata);
    let _currentTimestamp = new Date().valueOf();
    if(parseInt(_userDataObj.expires) < _currentTimestamp){
      sessionStorage.clear();
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _responseStr = JSON.stringify(responseObj);
        sessionStorage.setItem('_userdata', _responseStr);
      };
      xhr.open('GET', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getInitToken');
      xhr.send();
      ui.initUI();
    } else {
      ui.initUI();
    }
  }
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
  document.querySelectorAll('.navbar-link').forEach(function(navbarLink){
    navbarLink.addEventListener('click', function(){
      navbarLink.nextElementSibling.classList.toggle('is-hidden-mobile');
    });
  });
});