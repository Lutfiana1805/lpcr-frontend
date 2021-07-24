import config from './config';
import templates from './templates';

import L from 'leaflet';
import {DataTable} from '../node_modules/simple-datatables/dist/index';

var components = {};

components._familyDataTable = function(tableid){
  let _tableid = '#'+tableid+'';
  let _datatable = document.querySelector(_tableid);
  let dataTable = new DataTable(_datatable, {
    sortable: false
  });
  dataTable.on('datatable.init', function(){
    components._applyFamilyDetails();
  });
  dataTable.on('datatable.refresh', function(){
    components._applyFamilyDetails();
  });
  dataTable.on('datatable.page', function(page){
    components._applyFamilyDetails();
  });
  dataTable.on('datatable.perpage', function(perpage){
    components._applyFamilyDetails();
  });
  dataTable.on('datatable.search', function(query, matched){
    components._applyFamilyDetails();
  });
};

components._individualDataTable = function(tableid){
  let _tableid = '#'+tableid+'';
  let _datatable = document.querySelector(_tableid);
  let dataTable = new DataTable(_datatable, {
    sortable: false
  });
  dataTable.on('datatable.init', function(){
    components._applyIndividualDetails();
  });
  dataTable.on('datatable.refresh', function(){
    components._applyIndividualDetails();
  });
  dataTable.on('datatable.page', function(page){
    components._applyIndividualDetails();
  });
  dataTable.on('datatable.perpage', function(perpage){
    components._applyIndividualDetails();
  });
  dataTable.on('datatable.search', function(query, matched){
    components._applyIndividualDetails();
  });
};

components._allUsersDataTable = function(tableid){
  let _tableid = '#'+tableid+'';
  let _datatable = document.querySelector(_tableid);
  let dataTable = new DataTable(_datatable, {
    sortable: false
  });
  dataTable.on('datatable.init', function(){
    components._applyAllUsersManagementActions();
  });
  dataTable.on('datatable.refresh', function(){
    components._applyAllUsersManagementActions();
  });
  dataTable.on('datatable.page', function(page){
    components._applyAllUsersManagementActions();
  });
  dataTable.on('datatable.perpage', function(perpage){
    components._applyAllUsersManagementActions();
  });
  dataTable.on('datatable.search', function(query, matched){
    components._applyAllUsersManagementActions();
  });
};

components._regionalUsersDataTable = function(tableid){
  let _tableid = '#'+tableid+'';
  let _datatable = document.querySelector(_tableid);
  let dataTable = new DataTable(_datatable, {
    sortable: false
  });
  dataTable.on('datatable.init', function(){
    components._applyRegionalUsersManagementActions();
  });
  dataTable.on('datatable.refresh', function(){
    components._applyRegionalUsersManagementActions();
  });
  dataTable.on('datatable.page', function(page){
    components._applyRegionalUsersManagementActions();
  });
  dataTable.on('datatable.perpage', function(perpage){
    components._applyRegionalUsersManagementActions();
  });
  dataTable.on('datatable.search', function(query, matched){
    components._applyRegionalUsersManagementActions();
  });
};

components._districtUsersDataTable = function(tableid){
  let _tableid = '#'+tableid+'';
  let _datatable = document.querySelector(_tableid);
  let dataTable = new DataTable(_datatable, {
    sortable: false
  });
  dataTable.on('datatable.init', function(){
    components._applyDistrictUsersManagementActions();
  });
  dataTable.on('datatable.refresh', function(){
    components._applyDistrictUsersManagementActions();
  });
  dataTable.on('datatable.page', function(page){
    components._applyDistrictUsersManagementActions();
  });
  dataTable.on('datatable.perpage', function(perpage){
    components._applyDistrictUsersManagementActions();
  });
  dataTable.on('datatable.search', function(query, matched){
    components._applyDistrictUsersManagementActions();
  });
};

components._applyAllUsersManagementActions = function(){
  let $toResetPasswordElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-small.is-warning.password-reset-button'), 0);
  $toResetPasswordElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _confirmation = confirm('Benar-benar akan reset password untuk pengguna ini?');
      if(_confirmation == true){
        let _payload = JSON.stringify({"userid":_itemid});
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            components._reloadAllUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          } else {
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Status: `+responseObj.status+`. Error: `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/resetPassword');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        return;
      }
    });
  });
  let $toActivateElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-small.is-primary.activate-user-button'), 0);
  $toActivateElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _confirmation = confirm('Benar-benar akan mengaktivasi pengguna ini?');
      if(_confirmation == true){
        let _payload = JSON.stringify({"userid":_itemid});
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            components._reloadAllUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          } else {
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Status: `+responseObj.status+`. Error: `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/activateUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        return;
      }
    });
  });
  let $toDeactivateElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-small.is-danger.deactivate-user-button'), 0);
  $toDeactivateElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _confirmation = confirm('Benar-benar akan mendeaktivasi pengguna ini?');
      if(_confirmation == true){
        let _payload = JSON.stringify({"userid":_itemid});
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            components._reloadAllUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          } else {
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Status: `+responseObj.status+`. Error: `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/deactivateUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        return;
      }
    });
  });
};

components._reloadAllUsersData = function(){
  document.getElementById('datatablecontainer').innerHTML = ``;
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = function(){
    let responseObj = xhr.response;
    let _dataarray = responseObj.dataarray;
    let _datarows = '';
    let _rowcount = 1;
    for(var i=0;i<_dataarray.length;i++){
      if(_dataarray[i].status=='0'){
        _datarows += `<tr class='has-background-grey'><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].realname+`</td><td class=''>`+_dataarray[i].username+`</td><td class=''>`+_dataarray[i].module+`</td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small password-reset-button'><i class='fa fa-refresh'></i></a></td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-primary activate-user-button'><i class='fa fa-user-plus'></i></a></td></tr>`;
      } else {
        _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].realname+`</td><td class=''>`+_dataarray[i].username+`</td><td class=''>`+_dataarray[i].module+`</td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small password-reset-button'><i class='fa fa-refresh'></i></a></td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-danger deactivate-user-button'><i class='fa fa-recycle'></i></a></td></tr>`;
      }
      _rowcount++;
    }
    let _tableDOM = `<table id='usersdatatable' class='table is-bordered is-striped is-size-7'><thead><tr><th class='has-text-centered'>No.</th><th class='has-text-centered'>Nama Lengkap Pengguna</th><th class='has-text-centered'>Nama Pengguna [Username]</th><th class='has-text-centered'>Modul</th><th class='has-text-centered' colspan='2'></th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
    document.getElementById('datatablecontainer').innerHTML = _tableDOM;
    components._allUsersDataTable('usersdatatable');
  };
  xhr.open('GET', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/listAllUsers');
  xhr.send();
};

components._reloadRegionalUsersData = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let _payload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  document.getElementById('datatablecontainer').innerHTML = ``;
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = function(){
    let responseObj = xhr.response;
    let _dataarray = responseObj.dataarray;
    let _datarows = '';
    let _rowcount = 1;
    for(var i=0;i<_dataarray.length;i++){
      if(_dataarray[i].id == _udObj.id){
        _datarows += ``;
      } else {
        if(_dataarray[i].status=='0'){
          _datarows += `<tr><td class='is-italic has-background-grey'>`+_rowcount+`.</td><td class='is-italic has-background-grey'>`+_dataarray[i].realname+`</td><td class='is-italic has-background-grey'>`+_dataarray[i].username+`</td><td class='is-italic has-background-grey'>`+_dataarray[i].module+`</td><td class='is-italic has-background-grey has-text-centered'>-</td><td class='has-text-italic has-background-grey has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-primary activate-user-button'><i class='fa fa-user-plus'></i>&nbsp;Aktivasi</a></td></tr>`;
        } else {
          _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].realname+`</td><td class=''>`+_dataarray[i].username+`</td><td class=''>`+_dataarray[i].module+`</td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-warning password-reset-button'><i class='fa fa-refresh'></i>&nbsp;Reset Password</a></td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-danger deactivate-user-button'><i class='fa fa-recycle'></i>&nbsp;Deaktivasi</a></td></tr>`;
        }
        _rowcount++;
      }
    }
    let _tableDOM = `<table id='usersdatatable' class='table is-bordered is-striped is-size-6'><thead><tr><th class='has-text-centered'>No.</th><th class='has-text-centered'>Nama Lengkap Pengguna</th><th class='has-text-centered'>Nama Pengguna [Username]</th><th class='has-text-centered'>Modul</th><th class='has-text-centered' colspan='2'></th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
    document.getElementById('datatablecontainer').innerHTML = _tableDOM;
    _loaderModal.classList.remove('is-active');
    _loaderContainer.innerHTML = ``;
    components._regionalUsersDataTable('usersdatatable');
  };
  xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/listRegionUsers');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(_payload);
};

components._reloadDistrictUsersData = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let _payload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
  document.getElementById('datatablecontainer').innerHTML = ``;
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = function(){
    let responseObj = xhr.response;
    let _dataarray = responseObj.dataarray;
    let _datarows = '';
    let _rowcount = 1;
    for(var i=0;i<_dataarray.length;i++){
      if(_dataarray[i].id == _udObj.id){
        _datarows += ``;
      } else {
        if(_dataarray[i].status=='0'){
          _datarows += `<tr><td class='is-italic has-background-grey'>`+_rowcount+`.</td><td class='is-italic has-background-grey'>`+_dataarray[i].realname+`</td><td class='is-italic has-background-grey'>`+_dataarray[i].username+`</td><td class='is-italic has-background-grey'>`+_dataarray[i].module+`</td><td class='is-italic has-background-grey has-text-centered'>-</td><td class='has-text-italic has-background-grey has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-primary activate-user-button'><i class='fa fa-user-plus'></i>&nbsp;Aktivasi</a></td></tr>`;
        } else {
          _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].realname+`</td><td class=''>`+_dataarray[i].username+`</td><td class=''>`+_dataarray[i].module+`</td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-warning password-reset-button'><i class='fa fa-refresh'></i>&nbsp;Reset Password</a></td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-danger deactivate-user-button'><i class='fa fa-recycle'></i>&nbsp;Deaktivasi</a></td></tr>`;
        }
        _rowcount++;
      }
    }
    let _tableDOM = `<table id='usersdatatable' class='table is-bordered is-striped is-size-6'><thead><tr><th class='has-text-centered'>No.</th><th class='has-text-centered'>Nama Lengkap Pengguna</th><th class='has-text-centered'>Nama Pengguna [Username]</th><th class='has-text-centered'>Modul</th><th class='has-text-centered' colspan='2'></th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
    document.getElementById('datatablecontainer').innerHTML = _tableDOM;
    _loaderModal.classList.remove('is-active');
    _loaderContainer.innerHTML = ``;
    components._districtUsersDataTable('usersdatatable');
  };
  xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/listDistrictUsers');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(_payload);
};

components._applyRegionalUsersManagementActions = function(){
  let $toResetPasswordElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-small.is-warning.password-reset-button'), 0);
  $toResetPasswordElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _confirmation = confirm('Benar-benar akan reset password untuk pengguna ini?');
      if(_confirmation == true){
        let _payload = JSON.stringify({"userid":_itemid});
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            components._reloadRegionalUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          } else {
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Status: `+responseObj.status+`. Error: `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/resetPassword');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        return;
      }
    });
  });
  let $toActivateElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-small.is-primary.activate-user-button'), 0);
  $toActivateElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _confirmation = confirm('Benar-benar akan mengaktivasi pengguna ini?');
      if(_confirmation == true){
        let _payload = JSON.stringify({"userid":_itemid});
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            components._reloadRegionalUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          } else {
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Status: `+responseObj.status+`. Error: `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/activateUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        return;
      }
    });
  });
  let $toDeactivateElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-small.is-danger.deactivate-user-button'), 0);
  $toDeactivateElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _confirmation = confirm('Benar-benar akan mendeaktivasi pengguna ini?');
      if(_confirmation == true){
        let _payload = JSON.stringify({"userid":_itemid});
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            components._reloadRegionalUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          } else {
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Status: `+responseObj.status+`. Error: `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/deactivateUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        return;
      }
    });
  });
};

components._applyDistrictUsersManagementActions = function(){
  let $toResetPasswordElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-small.is-warning.password-reset-button'), 0);
  $toResetPasswordElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _confirmation = confirm('Benar-benar akan reset password untuk pengguna ini?');
      if(_confirmation == true){
        let _payload = JSON.stringify({"userid":_itemid});
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            components._reloadDistrictUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          } else {
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Status: `+responseObj.status+`. Error: `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/resetPassword');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        return;
      }
    });
  });
  let $toActivateElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-small.is-primary.activate-user-button'), 0);
  $toActivateElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _confirmation = confirm('Benar-benar akan mengaktivasi pengguna ini?');
      if(_confirmation == true){
        let _payload = JSON.stringify({"userid":_itemid});
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            components._reloadDistrictUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          } else {
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Status: `+responseObj.status+`. Error: `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/activateUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        return;
      }
    });
  });
  let $toDeactivateElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-small.is-danger.deactivate-user-button'), 0);
  $toDeactivateElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _confirmation = confirm('Benar-benar akan mendeaktivasi pengguna ini?');
      if(_confirmation == true){
        let _payload = JSON.stringify({"userid":_itemid});
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            components._reloadDistrictUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          } else {
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Status: `+responseObj.status+`. Error: `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 1500);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/deactivateUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        return;
      }
    });
  });
};

components._populateProvinceSelector = function(){
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = function(){
    let responseObj = xhr.response;
    let _dataarray = responseObj.dataarray;
    let _options = `<option value=''>Pilih Provinsi</option>`;
    for(var i=0;i<_dataarray.length;i++){
      _options += `<option value='`+ _dataarray[i].kdprov +`'>`+ _dataarray[i].nmprov +`</option>`;
    }
    document.getElementById('kdprov').innerHTML = _options;
    _loaderModal.classList.remove('is-active');
    _loaderContainer.innerHTML = ``;
  };
  xhr.open('GET', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getProvinceList');
  xhr.send();
};

components._populateDistrictSelector = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let _payload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = function(){
    let responseObj = xhr.response;
    let _dataarray = responseObj.dataarray;
    let _options = `<option value=''>Pilih Kecamatan</option>`;
    for(var i=0;i<_dataarray.length;i++){
      _options += `<option value='`+ _dataarray[i].kdkec +`'>`+ _dataarray[i].nmkec +`</option>`;
    }
    document.getElementById('kdkec').innerHTML = _options;
    _loaderModal.classList.remove('is-active');
    _loaderContainer.innerHTML = ``;
  };
  xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getDistrictList');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(_payload);
};

components._populateSubDistrictSelector = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let _payload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = function(){
    let responseObj = xhr.response;
    let _dataarray = responseObj.dataarray;
    let _options = `<option value=''>Pilih Desa/Kelurahan</option>`;
    for(var i=0;i<_dataarray.length;i++){
      _options += `<option value='`+ _dataarray[i].kdkel +`'>`+ _dataarray[i].nmkel +`</option>`;
    }
    document.getElementById('kdkel').innerHTML = _options;
    _loaderModal.classList.remove('is-active');
    _loaderContainer.innerHTML = ``;
  };
  xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getSubDistrictList');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(_payload);
};

components._populateLocalBlockSelector = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
  _loaderModal.classList.toggle('is-active');
  let _payload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":parseInt(_udObj.district),"kdkel":_udObj.subdistrict});
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = function(){
    let responseObj = xhr.response;
    let _dataarray = responseObj.dataarray;
    let _options = `<option value=''>Pilih RW</option>`;
    for(var i=0;i<_dataarray.length;i++){
      _options += `<option value='`+ _dataarray[i].norw +`'>`+ _dataarray[i].norw +`</option>`;
    }
    document.getElementById('norw').innerHTML = _options;
    _loaderModal.classList.remove('is-active');
    _loaderContainer.innerHTML = ``;
  };
  xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getLocalBlockList');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(_payload);
};

/* province action to select region */
components._applyProvinceSelectorAction = function(){
  let _provinceSelector = document.getElementById('kdprov');
  let _regionSelector = document.getElementById('kdkab');
  let _districtSelector = document.getElementById('kdkec');
  let _subDistrictSelector = document.getElementById('kdkel');
  let _localBlockSelector = document.getElementById('norw');
  _provinceSelector.addEventListener('change', function(){
    let _kdprov = this.value;
    if(_kdprov.length>0){
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let xhr = new XMLHttpRequest();
      let _payload = JSON.stringify({"kdprov":_kdprov});
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _dataarray = responseObj.dataarray;
        let _options = `<option value=''>Pilih Kabupaten/Kota</option>`;
        for(var i=0;i<_dataarray.length;i++){
          _options += `<option value='`+ _dataarray[i].kdkab +`'>`+ _dataarray[i].nmkab +`</option>`;
        }
        _regionSelector.innerHTML = _options;
        _districtSelector.innerHTML = `<option value=''>Pilih Kecamatan</option>`;
        _subDistrictSelector.innerHTML = `<option value=''>Pilih Desa/Kelurahan</option>`;
        if(_localBlockSelector){
          _localBlockSelector.innerHTML = `<option value=''>Pilih RW</option>`;
        }
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getRegionList');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else {
      _regionSelector.innerHTML = `<option value=''>Pilih Kabupaten/Kota</option>`;
      _districtSelector.innerHTML = `<option value=''>Pilih Kecamatan</option>`;
      _subDistrictSelector.innerHTML = `<option value=''>Pilih Desa/Kelurahan</option>`;
      if(_localBlockSelector){
        _localBlockSelector.innerHTML = `<option value=''>Pilih RW</option>`;
      }
    }
  });
};
/* region action to select district */
components._applyRegionSelectorAction = function(){
  let _regionSelector = document.getElementById('kdkab');
  let _districtSelector = document.getElementById('kdkec');
  let _subDistrictSelector = document.getElementById('kdkel');
  let _localBlockSelector = document.getElementById('norw');
  _regionSelector.addEventListener('change', function(){
    let _kdkab = this.value;
    let _kdprov = document.getElementById('kdprov').value;
    if(_kdkab.length>0){
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let xhr = new XMLHttpRequest();
      let _payload = JSON.stringify({"kdprov":_kdprov,"kdkab":_kdkab});
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _dataarray = responseObj.dataarray;
        let _options = `<option value=''>Pilih Kecamatan</option>`;
        for(var i=0;i<_dataarray.length;i++){
          _options += `<option value='`+ _dataarray[i].kdkec +`'>`+ _dataarray[i].nmkec +`</option>`;
        }
        _districtSelector.innerHTML = _options;
        _subDistrictSelector.innerHTML = `<option value=''>Pilih Desa/Kelurahan</option>`;
        if(_localBlockSelector){
          _localBlockSelector.innerHTML = `<option value=''>Pilih RW</option>`;
        }
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getDistrictList');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else {
      _districtSelector.innerHTML = `<option value=''>Pilih Kecamatan</option>`;
      _subDistrictSelector.innerHTML = `<option value=''>Pilih Desa/Kelurahan</option>`;
      if(_localBlockSelector){
        _localBlockSelector.innerHTML = `<option value=''>Pilih RW</option>`;
      }
    }
  });
};
/* district action to select subdistrict */
components._applyDistrictSelectorAction = function(){
  let _districtSelector = document.getElementById('kdkec');
  let _subDistrictSelector = document.getElementById('kdkel');
  let _localBlockSelector = document.getElementById('norw');
  _districtSelector.addEventListener('change', function(){
    let _kdkec = this.value;
    let _kdprov = document.getElementById('kdprov').value;
    let _kdkab = document.getElementById('kdkab').value;
    if(_kdkec.length>0){
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let xhr = new XMLHttpRequest();
      let _payload = JSON.stringify({"kdprov":_kdprov,"kdkab":_kdkab,"kdkec":_kdkec});
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _dataarray = responseObj.dataarray;
        let _options = `<option value=''>Pilih Desa/Kelurahan</option>`;
        for(var i=0;i<_dataarray.length;i++){
          _options += `<option value='`+ _dataarray[i].kdkel +`'>`+ _dataarray[i].nmkel +`</option>`;
        }
        _subDistrictSelector.innerHTML = _options;
        if(_localBlockSelector){
          _localBlockSelector.innerHTML = `<option value=''>Pilih RW</option>`;
        }
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getSubDistrictList');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else {
      _subDistrictSelector.innerHTML = `<option value=''>Pilih Desa/Kelurahan</option>`;
      if(_localBlockSelector){
        _localBlockSelector.innerHTML = `<option value=''>Pilih RW</option>`;
      }
    }
  });
};
/* subdistrict action to select localblocks */
components._applySubDistrictSelectorAction = function(){
  let _subDistrictSelector = document.getElementById('kdkel');
  let _localBlockSelector = document.getElementById('norw');
  _subDistrictSelector.addEventListener('change', function(){
    let _kdkel = this.value;
    let _kdprov = document.getElementById('kdprov').value;
    let _kdkab = document.getElementById('kdkab').value;
    let _kdkecstr = document.getElementById('kdkec').value;
    let _kdkec = ''+parseInt(_kdkecstr)+'';
    let _
    if(_kdkec.length>0){
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let xhr = new XMLHttpRequest();
      let _payload = JSON.stringify({"kdprov":_kdprov,"kdkab":_kdkab,"kdkec":_kdkec,"kdkel":_kdkel});
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _dataarray = responseObj.dataarray;
        let _options = `<option value=''>Pilih RW</option>`;
        for(var i=0;i<_dataarray.length;i++){
          _options += `<option value='`+ _dataarray[i].norw +`'>`+ _dataarray[i].norw +`</option>`;
        }
        _localBlockSelector.innerHTML = _options;
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getLocalBlockList');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else {
      _localBlockSelector.innerHTML = `<option value=''>Pilih RW</option>`;
    }
  });
};

components._applyFamilyDetails = function(){
  let $itemElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-black.is-small.show-family-details'), 0);
  $itemElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      if(_itemid.length==16 && isNaN(_itemid)==false){
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        let _payload = JSON.stringify({"nokk":_itemid});
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          let _dataarray = responseObj.dataarray;
          let _familyinfomodal = document.getElementById('familyinfomodal');
          let _familyinfomodalbody = document.getElementById('familyinfomodalbody');
          let _tablerows = '';
          for(var i=0;i<_dataarray.length;i++){
            _tablerows += `<tr><td>`+_dataarray[i].nik+`</td><td>`+_dataarray[i].nama_lgkp+`</td><td>`+_dataarray[i].jenis_klmin+`</td><td>`+_dataarray[i].tgl_lhr+`</td><td>`+_dataarray[i].jenis_pkrjn+`</td><td>`+_dataarray[i].pddk_akh+`</td></tr>`;
          }
          let _tabledata = `<table class='table is-bordered is-striped is-size-7'><thead><tr><th>NIK</th><th>Nama</th><th>Jenis Kelamin</th><th>Tanggal Lahir</th><th>Pekerjaan</th><th>Pendidikan Akhir</th></tr></thead><tbody>`+_tablerows+`</tbody></table>`;
            _familyinfomodalbody.innerHTML = _tabledata;
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
          _familyinfomodal.classList.add('is-active');
          components._applyCloseFamilyInfoModal();
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyMembersByNoKK');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        alert('Data KK tidak dapat diakses.');
      }
    });
  });
};

components._applyCloseFamilyInfoModal = function(){
  let _modalEl = document.getElementById('familyinfomodal');
  let _modalBody = document.getElementById('familyinfomodalbody');
  let _closerOnHeader = document.querySelector('.delete.familyinfomodal-close');
  let _closerOnFooter = document.querySelector('.button.is-black.familyinfomodal-close');
  _closerOnHeader.addEventListener('click', function(evt){
    evt.preventDefault();
    _modalEl.classList.remove('is-active');
    _modalBody.innerHTML = ``;
  });
  _closerOnFooter.addEventListener('click', function(evt){
    evt.preventDefault();
    _modalEl.classList.remove('is-active');
    _modalBody.innerHTML = ``;
  });
};

components._applyIndividualDetails = function(){
  let $itemElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-black.is-small.show-family-details'), 0);
  $itemElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      if(_itemid.length==16 && isNaN(_itemid)==false){
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let xhr = new XMLHttpRequest();
        let _payload = JSON.stringify({"nokk":_itemid});
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          let _dataarray = responseObj.dataarray;
          let _individualinfomodal = document.getElementById('individualinfomodal');
          let _individualinfomodalbody = document.getElementById('individualinfomodalbody');
          let _tablerows = '';
          for(var i=0;i<_dataarray.length;i++){
            _tablerows += `<tr><td>`+_dataarray[i].nik+`</td><td>`+_dataarray[i].nama_lgkp+`</td><td>`+_dataarray[i].jenis_klmin+`</td><td>`+_dataarray[i].tgl_lhr+`</td><td>`+_dataarray[i].jenis_pkrjn+`</td><td>`+_dataarray[i].pddk_akh+`</td></tr>`;
          }
          let _tabledata = `<table class='table is-bordered is-striped is-size-7'><thead><tr><th>NIK</th><th>Nama</th><th>Jenis Kelamin</th><th>Tanggal Lahir</th><th>Pekerjaan</th><th>Pendidikan Akhir</th></tr></thead><tbody>`+_tablerows+`</tbody></table>`;
          _individualinfomodalbody.innerHTML = _tabledata;
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
          _individualinfomodal.classList.add('is-active');
          components._applyCloseIndividualInfoModal();
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyMembersByNoKK');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        alert('Data Individu tidak dapat diakses.');
      }
    });
  });
};

components._applyFamilySelectionModalActionRegion = function(mapObject,objClusters,objPoints){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let _buttonSaveFamilyCoordinates = document.querySelector('.button.is-black.apply-familyselect-button');
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  let _modalEl = document.getElementById('familyselectormodal');
  let _modalBody = document.getElementById('datatablecontainer');
  let $itemElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-black.is-small.digitize-family-select'), 0);
  $itemElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _arrItemid = _itemid.split('|');
      document.getElementById('objectid').value = _arrItemid[0];
      document.getElementById('selecteditemnotification').innerHTML = `<span class='iY-size-6'>Data terpilih: <span class='has-text-weight-bold is-family-sans-serif'>`+_arrItemid[1]+`</span></span>`;
      _buttonSaveFamilyCoordinates.disabled = false;
    });
  });
  _buttonSaveFamilyCoordinates.addEventListener('click', function(evt){
    evt.preventDefault();
    let _coordinates = document.getElementById('coordinates').value;
    let _objectid = document.getElementById('objectid').value;
    let _payload = JSON.stringify({"objectid":_objectid,"coordinates":_coordinates});
    _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
    _loaderModal.classList.toggle('is-active');
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function(){
      let responseObj = xhr.response;
      if(responseObj.status == 201){
        document.getElementById('coordinates').value = '';
        document.getElementById('objectid').value = '';
        document.getElementById('selecteditemnotification').innerHTML = '';
        _modalBody.innerHTML = ``;
        _modalEl.classList.remove('is-active');
        let _payloadReload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region});
        let xhrreload = new XMLHttpRequest();
        xhrreload.responseType = 'json';
        xhrreload.onload = function(){
          let responseObjreload = xhrreload.response;
          objClusters.clearLayers();
          objPoints.clearLayers();
          mapObject.invalidateSize();
          objPoints.addData(responseObjreload);
          objClusters.addLayer(objPoints);
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
        };
        xhrreload.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsByRegion');
        xhrreload.setRequestHeader('Content-Type', 'application/json');
        xhrreload.send(_payloadReload);
      } else {
        document.getElementById('coordinates').value = '';
        document.getElementById('objectid').value = '';
        document.getElementById('selecteditemnotification').innerHTML = '';
        _modalBody.innerHTML = ``;
        _modalEl.classList.remove('is-active');
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        alert('Digitasi lokasi gagal.');
      }
    };
    xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/assignFamilyCoordinates');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(_payload);
  });
};

components._applyFamilySelectionModalActionDistrict = function(mapObject,objClusters,objPoints){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let _buttonSaveFamilyCoordinates = document.querySelector('.button.is-black.apply-familyselect-button');
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  let _modalEl = document.getElementById('familyselectormodal');
  let _modalBody = document.getElementById('datatablecontainer');
  let $itemElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-black.is-small.digitize-family-select'), 0);
  $itemElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _arrItemid = _itemid.split('|');
      document.getElementById('objectid').value = _arrItemid[0];
      document.getElementById('selecteditemnotification').innerHTML = `<span class='iY-size-6'>Data terpilih: <span class='has-text-weight-bold is-family-sans-serif'>`+_arrItemid[1]+`</span></span>`;
      _buttonSaveFamilyCoordinates.disabled = false;
    });
  });
  _buttonSaveFamilyCoordinates.addEventListener('click', function(evt){
    evt.preventDefault();
    let _coordinates = document.getElementById('coordinates').value;
    let _objectid = document.getElementById('objectid').value;
    let _payload = JSON.stringify({"objectid":_objectid,"coordinates":_coordinates});
    _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
    _loaderModal.classList.toggle('is-active');
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function(){
      let responseObj = xhr.response;
      if(responseObj.status == 201){
        document.getElementById('coordinates').value = '';
        document.getElementById('objectid').value = '';
        document.getElementById('selecteditemnotification').innerHTML = '';
        _modalBody.innerHTML = ``;
        _modalEl.classList.remove('is-active');
        let _payloadReload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district});
        let xhrreload = new XMLHttpRequest();
        xhrreload.responseType = 'json';
        xhrreload.onload = function(){
          let responseObjreload = xhrreload.response;
          objClusters.clearLayers();
          objPoints.clearLayers();
          mapObject.invalidateSize();
          objPoints.addData(responseObjreload);
          objClusters.addLayer(objPoints);
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
        };
        xhrreload.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsByDistrict');
        xhrreload.setRequestHeader('Content-Type', 'application/json');
        xhrreload.send(_payloadReload);
      } else {
        document.getElementById('coordinates').value = '';
        document.getElementById('objectid').value = '';
        document.getElementById('selecteditemnotification').innerHTML = '';
        _modalBody.innerHTML = ``;
        _modalEl.classList.remove('is-active');
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        alert('Digitasi lokasi gagal.');
      }
    };
    xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/assignFamilyCoordinates');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(_payload);
  });
};

components._applyFamilySelectionModalActionSubDistrict = function(mapObject,objClusters,objPoints){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let _buttonSaveFamilyCoordinates = document.querySelector('.button.is-black.apply-familyselect-button');
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  let _modalEl = document.getElementById('familyselectormodal');
  let _modalBody = document.getElementById('datatablecontainer');
  let $itemElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-black.is-small.digitize-family-select'), 0);
  $itemElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _arrItemid = _itemid.split('|');
      document.getElementById('objectid').value = _arrItemid[0];
      document.getElementById('selecteditemnotification').innerHTML = `<span class='iY-size-6'>Data terpilih: <span class='has-text-weight-bold is-family-sans-serif'>`+_arrItemid[1]+`</span></span>`;
      _buttonSaveFamilyCoordinates.disabled = false;
    });
  });
  _buttonSaveFamilyCoordinates.addEventListener('click', function(evt){
    evt.preventDefault();
    let _coordinates = document.getElementById('coordinates').value;
    let _objectid = document.getElementById('objectid').value;
    let _payload = JSON.stringify({"objectid":_objectid,"coordinates":_coordinates});
    _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
    _loaderModal.classList.toggle('is-active');
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function(){
      let responseObj = xhr.response;
      if(responseObj.status == 201){
        document.getElementById('coordinates').value = '';
        document.getElementById('objectid').value = '';
        document.getElementById('selecteditemnotification').innerHTML = '';
        _modalBody.innerHTML = ``;
        _modalEl.classList.remove('is-active');
        let _payloadReload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict});
        let xhrreload = new XMLHttpRequest();
        xhrreload.responseType = 'json';
        xhrreload.onload = function(){
          let responseObjreload = xhrreload.response;
          objClusters.clearLayers();
          objPoints.clearLayers();
          mapObject.invalidateSize();
          objPoints.addData(responseObjreload);
          objClusters.addLayer(objPoints);
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
        };
        xhrreload.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsBySubDistrict');
        xhrreload.setRequestHeader('Content-Type', 'application/json');
        xhrreload.send(_payloadReload);
      } else {
        document.getElementById('coordinates').value = '';
        document.getElementById('objectid').value = '';
        document.getElementById('selecteditemnotification').innerHTML = '';
        _modalBody.innerHTML = ``;
        _modalEl.classList.remove('is-active');
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        alert('Digitasi lokasi gagal.');
      }
    };
    xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/assignFamilyCoordinates');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(_payload);
  });
};

components._applyFamilySelectionModalActionLocalBlock = function(mapObject,objClusters,objPoints){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let _buttonSaveFamilyCoordinates = document.querySelector('.button.is-black.apply-familyselect-button');
  let _loaderModal = document.getElementById('loadermodal'), 
    _loaderContainer = document.getElementById('loadercontainer');
  let _modalEl = document.getElementById('familyselectormodal');
  let _modalBody = document.getElementById('datatablecontainer');
  let $itemElements = Array.prototype.slice.call(document.querySelectorAll('.button.is-black.is-small.digitize-family-select'), 0);
  $itemElements.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let _itemid = element.id;
      let _arrItemid = _itemid.split('|');
      document.getElementById('objectid').value = _arrItemid[0];
      document.getElementById('selecteditemnotification').innerHTML = `<span class='iY-size-6'>Data terpilih: <span class='has-text-weight-bold is-family-sans-serif'>`+_arrItemid[1]+`</span></span>`;
      _buttonSaveFamilyCoordinates.disabled = false;
    });
  });
  _buttonSaveFamilyCoordinates.addEventListener('click', function(evt){
    evt.preventDefault();
    let _coordinates = document.getElementById('coordinates').value;
    let _objectid = document.getElementById('objectid').value;
    let _payload = JSON.stringify({"objectid":_objectid,"coordinates":_coordinates});
    _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
    _loaderModal.classList.toggle('is-active');
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function(){
      let responseObj = xhr.response;
      if(responseObj.status == 201){
        document.getElementById('coordinates').value = '';
        document.getElementById('objectid').value = '';
        document.getElementById('selecteditemnotification').innerHTML = '';
        _modalBody.innerHTML = ``;
        _modalEl.classList.remove('is-active');
        let _payloadReload = JSON.stringify({"kdprov":_udObj.province,"kdkab":_udObj.region,"kdkec":_udObj.district,"kdkel":_udObj.subdistrict,"norw":_udObj.localblock});
        let xhrreload = new XMLHttpRequest();
        xhrreload.responseType = 'json';
        xhrreload.onload = function(){
          let responseObjreload = xhrreload.response;
          objClusters.clearLayers();
          objPoints.clearLayers();
          mapObject.invalidateSize();
          objPoints.addData(responseObjreload);
          objClusters.addLayer(objPoints);
          _loaderModal.classList.remove('is-active');
          _loaderContainer.innerHTML = ``;
        };
        xhrreload.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyPointsByLocalBlock');
        xhrreload.setRequestHeader('Content-Type', 'application/json');
        xhrreload.send(_payloadReload);
      } else {
        document.getElementById('coordinates').value = '';
        document.getElementById('objectid').value = '';
        document.getElementById('selecteditemnotification').innerHTML = '';
        _modalBody.innerHTML = ``;
        _modalEl.classList.remove('is-active');
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        alert('Digitasi lokasi gagal.');
      }
    };
    xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/assignFamilyCoordinates');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(_payload);
  });
};

components._applyCloseIndividualInfoModal = function(){
  let _modalEl = document.getElementById('individualinfomodal');
  let _modalBody = document.getElementById('individualinfomodalbody');
  let _closerOnHeader = document.querySelector('.delete.individualinfomodal-close');
  let _closerOnFooter = document.querySelector('.button.is-black.individualinfomodal-close');
  _closerOnHeader.addEventListener('click', function(evt){
    evt.preventDefault();
    _modalEl.classList.remove('is-active');
    _modalBody.innerHTML = ``;
  });
  _closerOnFooter.addEventListener('click', function(evt){
    evt.preventDefault();
    _modalEl.classList.remove('is-active');
    _modalBody.innerHTML = ``;
  });
};

components._applyCloseDigitizeFamilySelectorModal = function(){
  let _modalEl = document.getElementById('familyselectormodal');
  let _modalBody = document.getElementById('datatablecontainer');
  let _closerOnHeader = document.querySelector('.delete.familyselectormodal-close');
  let _closerOnFooter = document.querySelector('.button.is-danger.familyselectormodal-close');
  _closerOnHeader.addEventListener('click', function(evt){
    evt.preventDefault();
    _modalEl.classList.remove('is-active');
    _modalBody.innerHTML = ``;
    document.getElementById('coordinates').value = '';
    document.getElementById('objectid').value = '';
    document.getElementById('selecteditemnotification').innerHTML = '';
  });
  _closerOnFooter.addEventListener('click', function(evt){
    evt.preventDefault();
    _modalEl.classList.remove('is-active');
    _modalBody.innerHTML = ``;
    document.getElementById('coordinates').value = '';
    document.getElementById('objectid').value = '';
    document.getElementById('selecteditemnotification').innerHTML = '';
  });
};

export default components;