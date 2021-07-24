import config from './config';
import helpers from './helpers';
import templates from './templates';
import modules from './modules';
import webmap from './webmap';

var ui = {};

ui.initUI = function(){
  document.title = config.documentTitle;
  let _currentTimestamp = new Date().valueOf();
  let _sessionData = sessionStorage.getItem('_userdata');
  if(_sessionData){
    let _sessionDataObj = JSON.parse(_sessionData);
    if(parseInt(_sessionDataObj.expires) > parseInt(_currentTimestamp)){
      if(_sessionDataObj.module){
        let mainAnchorElement = document.getElementById('app');
        let _topnavbar = document.querySelector('.navbar.is-fixed-top.is-dark');
        if(_topnavbar){
          document.getElementById('logoffbutton').addEventListener('click', function(evt){
            evt.preventDefault();
            sessionStorage.clear();
            setTimeout(function(){
              document.location = './';
            }, 1000);
          });
          ui._menuActionsApply();
        } else {
          mainAnchorElement.insertAdjacentHTML('beforebegin', templates._topNavigation());
          mainAnchorElement.insertAdjacentHTML('afterend', templates._loaderContainer());
          document.getElementById('logoffbutton').addEventListener('click', function(evt){
            evt.preventDefault();
            sessionStorage.clear();
            setTimeout(function(){
              document.location = './';
            }, 1000);
          });
          ui._menuActionsApply();
        }
      } else {
        ui.createLoginBox();
      }
    } else {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _responseStr = JSON.stringify(responseObj);
        sessionStorage.setItem('_userdata', _responseStr);
      };
      xhr.open('GET', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getInitToken');
      xhr.send();
      ui.createLoginBox();
    }
  } else {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function(){
      let responseObj = xhr.response;
      let _responseStr = JSON.stringify(responseObj);
      sessionStorage.setItem('_userdata', _responseStr);
    };
    xhr.open('GET', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getInitToken');
    xhr.send();
    ui.createLoginBox();
  }
};

ui.createLoginBox = function(){
  let mainAnchorElement = document.getElementById('app');
  mainAnchorElement.innerHTML = templates._loginBox();
  ui._loginFormAction();
};

ui._loginFormAction = function(){
  let loginForm = document.getElementById('loginform');
  loginForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    let _udString = sessionStorage.getItem('_userdata');
    let _udObj = JSON.parse(_udString);
    let _activeInitialtoken = _udObj.token, 
      _currentDateTime = new Date().getTime(), 
      _initialToken = window.btoa(config.initialHash +'.'+ _activeInitialtoken +'.'+ _currentDateTime);
    let _inputusername = document.querySelector('.input.is-large.is-radiusless.username-field-input').value;
    let _inputpassword = document.querySelector('.input.is-large.is-radiusless.password-field-input').value;
    if(_inputusername.length < 6 || _inputpassword.length < 5){
      let noticeElement = document.getElementById('loginnotice');
      noticeElement.innerHTML = `<span class='has-text-italic'>Username</span>/<span class='has-text-italic'>password</span> Anda salah.`;
      noticeElement.classList.remove('has-text-black');
      noticeElement.classList.add('has-text-danger');
      setTimeout(function(){
        document.querySelector('.input.is-large.is-radiusless.username-field-input').value = '';
        document.querySelector('.input.is-large.is-radiusless.password-field-input').value = '';
        noticeElement.innerHTML = `Masukkan <span class='is-italic'>Username</span> dan <span class='is-italic'>Password</span> Anda.`;
        noticeElement.classList.remove('has-text-danger');
        noticeElement.classList.add('has-text-black');
        document.querySelector('.input.is-large.is-radiusless.username-field-input').focus();
      },1500);
    } else {
      let form = document.querySelector('#loginform'),
        formData = helpers.serialize(form), 
        jsonData = helpers.QueryStringToJSON(decodeURIComponent(formData));
      fetch(''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/doLogin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Token': _initialToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        if (data.status == 201) {
          let _data = JSON.stringify(data);
          let noticeElement = document.getElementById('loginnotice');
          noticeElement.innerHTML = `Login berhasil. Memuat aplikasi...`;
          noticeElement.classList.remove('has-text-black');
          noticeElement.classList.add('has-text-success');
          sessionStorage.clear();
          sessionStorage.setItem('_userdata', _data);
          setTimeout(function(){
            document.location = './';
          },2000);
        } else {
          let noticeElement = document.getElementById('loginnotice');
          noticeElement.innerHTML = `Login gagal.`;
          noticeElement.classList.remove('has-text-black');
          noticeElement.classList.add('has-text-danger');
          setTimeout(function(){
            document.querySelector('.input.is-large.is-radiusless.username-field-input').value = '';
            document.querySelector('.input.is-large.is-radiusless.password-field-input').value = '';
            noticeElement.innerHTML = `Masukkan <span class='is-italic'>Username</span> dan <span class='is-italic'>Password</span> Anda.`;
            noticeElement.classList.remove('has-text-danger');
            noticeElement.classList.add('has-text-black');
            document.querySelector('.input.is-large.is-radiusless.username-field-input').focus();
          },1500);
        }
      })
      .catch(function(err){
        console.log(err);
      });
    }
  });
};

ui._menuActionsApply = function(){
  let _menuElements = document.querySelectorAll('a.navbar-item');
  let mainAnchorElement = document.getElementById('app');
  _menuElements.forEach(function(element){
    element.addEventListener('click', function(e){
      e.preventDefault();
      mainAnchorElement.innerHTML = ``;
      if(this.getAttribute('id') == 'home'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._applicationFrontpage());
      } else if(this.getAttribute('id') == 'steeringcommitee-primary-data-family-sync'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataFamilySync());
        modules._applyDataFamilySync();
        modules._applyDataFamilySyncForm();
      } else if(this.getAttribute('id') == 'steeringcommitee-primary-data-individual-sync'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataIndividualSync());
        modules._applyDataIndividualSync();
        modules._applyDataIndividualSyncForm();
      } else if(this.getAttribute('id') == 'steeringcommitee-primary-data-family-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataFamilyList());
        modules._applyDataFamilyList();
        modules._applyDataFamilyListForm();
      } else if(this.getAttribute('id') == 'steeringcommitee-primary-data-individual-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataIndividualList());
        modules._applyDataIndividualList();
        modules._applyDataIndividualListForm();
      } else if(this.getAttribute('id') == 'regional-primary-data-family-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataRegionalFamilyList());
        modules._applyRegionalDataFamilyList();
        modules._applyDataFamilyList();
        modules._applyDataFamilyListForm();
      } else if(this.getAttribute('id') == 'district-primary-data-family-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataDistrictFamilyList());
        modules._applyDistrictDataFamilyList();
        modules._applyDataFamilyList();
        modules._applyDataFamilyListForm();
      } else if(this.getAttribute('id') == 'subdistrict-primary-data-family-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataSubDistrictFamilyList());
        modules._applySubDistrictDataFamilyList();
        modules._applyDataFamilyList();
        modules._applyDataFamilyListForm();
      } else if(this.getAttribute('id') == 'localblock-primary-data-family-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataLocalBlockFamilyList());
        modules._applyLocalBlockDataFamilyList();
        modules._applyDataFamilyListForm();
      } else if(this.getAttribute('id') == 'sublocalblock-primary-data-family-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataSubLocalBlockFamilyList());
        modules._applySubLocalBlockDataFamilyList();
        modules._applyDataFamilyListForm();
      } else if(this.getAttribute('id') == 'regional-primary-data-individual-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataRegionalIndividualList());
        modules._applyRegionalDataIndividualList();
        modules._applyDataIndividualList();
        modules._applyDataIndividualListForm();
      } else if(this.getAttribute('id') == 'district-primary-data-individual-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataDistrictIndividualList());
        modules._applyDistrictDataIndividualList();
        modules._applyDataIndividualList();
        modules._applyDataIndividualListForm();
      } else if(this.getAttribute('id') == 'subdistrict-primary-data-individual-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataSubDistrictIndividualList());
        modules._applySubDistrictDataIndividualList();
        modules._applyDataIndividualList();
        modules._applyDataIndividualListForm();
      } else if(this.getAttribute('id') == 'localblock-primary-data-individual-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataLocalBlockIndividualList());
        modules._applyLocalBlockDataIndividualList();
        modules._applyDataIndividualListForm();
      } else if(this.getAttribute('id') == 'sublocalblock-primary-data-individual-list'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._primaryDataSubLocalBlockIndividualList());
        modules._applySubLocalBlockDataIndividualList();
        modules._applyDataIndividualListForm();
      } else if(this.getAttribute('id') == 'regional-map-family'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._thematicMapContainer());
        webmap.createThematicMapFamilyRegion();
      } else if(this.getAttribute('id') == 'district-map-family'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._thematicMapContainer());
        webmap.createThematicMapFamilyDistrict();
      } else if(this.getAttribute('id') == 'subdistrict-map-family'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._thematicMapContainer());
        webmap.createThematicMapFamilySubDistrict();
      } else if(this.getAttribute('id') == 'localblock-map-family'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._thematicMapContainer());
        webmap.createThematicMapFamilyLocalBlock();
      } else if(this.getAttribute('id') == 'sublocalblock-map-family'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._thematicMapContainer());
        webmap.createThematicMapFamily();
      } else if(this.getAttribute('id') == 'regional-map-digitize'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._digitizeMapContainer());
        webmap.createDigitizeMapFamilyRegion();
      } else if(this.getAttribute('id') == 'district-map-digitize'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._digitizeMapContainer());
        webmap.createDigitizeMapFamilyDistrict();
      } else if(this.getAttribute('id') == 'subdistrict-map-digitize'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._digitizeMapContainer());
        webmap.createDigitizeMapFamilySubDistrict();
      } else if(this.getAttribute('id') == 'localblock-map-digitize'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._digitizeMapContainer());
        webmap.createDigitizeMapFamilyLocalBlock();
      } else if(this.getAttribute('id') == 'sublocalblock-map-digitize'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._digitizeMapContainer());
        webmap.createDigitizeMapFamily();
      } else if(this.getAttribute('id') == 'common-change-password'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._changeAccessCredentials());
        ui._applyChangeAccessCredentials();
      } else if(this.getAttribute('id') == 'steeringcommitee-user-management'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._steeringCommiteeUserManagement());
        modules._loadAllUsersData();
        modules._applySteeringCommiteeUserManagement();
      } else if(this.getAttribute('id') == 'regional-user-management'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._regionalUserManagement());
        modules._loadRegionalUsersData();
        modules._applyRegionalUserManagement();
      } else if(this.getAttribute('id') == 'district-user-management'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._districtUserManagement());
        modules._loadDistrictUsersData();
        modules._applyDistrictUserManagement();
      } else if(this.getAttribute('id') == 'regional-application-help'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._regionalApplicationHelp());
      } else if(this.getAttribute('id') == 'district-application-help'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._districtApplicationHelp());
      } else if(this.getAttribute('id') == 'subdistrict-application-help'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._subDistrictApplicationHelp());
      } else if(this.getAttribute('id') == 'localblock-application-help'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._localBlockApplicationHelp());
      } else if(this.getAttribute('id') == 'sublocalblock-application-help'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._subLocalBlockApplicationHelp());
      /*} else if(this.getAttribute('id') == '[menuid]'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates.[template_name]());
        modules.[action_name]();*/
      } else {
        console.log('__undefined__');
      }
    });
  });
};

ui._applyChangeAccessCredentials = function(){
  let changePasswordForm = document.getElementById('changepasswordform');
  changePasswordForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    let noticeContainer = document.getElementById('notice-change-password');
    let noticeElement = document.querySelector('.change-password-notification');
    let _udString = sessionStorage.getItem('_userdata');
    let _udObj = JSON.parse(_udString);
    let _sessionid = _udObj.sessionid, 
      _currentDateTime = new Date().getTime(), 
      _reqToken = window.btoa(config.initialHash +'.'+ _sessionid +'.'+ _currentDateTime);
    let _npw = document.getElementById('newpassword').value;
    let _cpw = document.getElementById('cnfpassword').value;
    if(_npw.length < 5 || _cpw.length < 5){
      noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Password baru tidak diterima.</div>`;
      noticeContainer.classList.remove('is-hidden');
      setTimeout(function(){
        document.getElementById('newpassword').value = '';
        document.getElementById('cnfpassword').value = '';
        noticeElement.innerHTML = '';
        noticeContainer.classList.add('is-hidden');
        document.getElementById('newpassword').focus();
      }, 1500);
    } else {
      let form = document.querySelector('#changepasswordform'),
        formData = helpers.serialize(form), 
        jsonData = helpers.QueryStringToJSON(decodeURIComponent(formData));
      fetch(''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/changePassword', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Token': _reqToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        if (data.status == 201) {
          noticeElement.innerHTML = `<div class='notification is-info is-size-6 is-radiusless'>Password berhasil diganti. Proses keluar aplikasi... (selanjutnya Anda bisa login kembali dengan password baru)</div>`;
          noticeContainer.classList.remove('is-hidden');
          sessionStorage.clear();
          setTimeout(function(){
            document.location = './';
          }, 3000);
        } else {
          noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Ganti/update password gagal.</div>`;
          noticeContainer.classList.remove('is-hidden');
          setTimeout(function(){
            document.getElementById('newpassword').value = '';
            document.getElementById('cnfpassword').value = '';
            noticeElement.innerHTML = '';
            noticeContainer.classList.add('is-hidden');
            document.getElementById('newpassword').focus();
          }, 3000);
        }
      })
      .catch(function(err){
        console.log(err);
      });
    }
  });
};

export default ui;