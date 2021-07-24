import config from './config';
import helpers from './helpers';
import templates from './templates';
import components from './components';

var modules = {};

modules._applyDataFamilySync = function(){
  components._populateProvinceSelector();
  components._applyProvinceSelectorAction();
  components._applyRegionSelectorAction();
  components._applyDistrictSelectorAction();
};

modules._applyDataFamilySyncForm = function(){
  let _dataForm = document.getElementById('datasyncform');
  _dataForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    let _kdprov = document.getElementById('kdprov').value;
    let _kdkab = document.getElementById('kdkab').value;
    let _kdkec = document.getElementById('kdkec').value;
    let _kdkel = document.getElementById('kdkel').value;
    if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0){
      let _nokec = ''+parseInt(_kdkec)+'';
      let _nokel = ''+parseInt(_kdkel)+'';
      let _payload = JSON.stringify({"nokec":_nokec,"nokel":_nokel});
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let noticeContainer = document.getElementById('notice-data-sync');
        let noticeElement = document.querySelector('.data-sync-notification');
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Sinkronisasi data berhasil.</div>`;
        noticeContainer.classList.remove('is-hidden');
        setTimeout(function(){
          noticeElement.innerHTML = '';
          noticeContainer.classList.add('is-hidden');
        }, 1500);
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/syncTogetDataListKeluarga');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else {
      alert('Pemilihan lingkup data harus lengkap!');
    }
  });
};

modules._applyDataIndividualSync = function(){
  components._populateProvinceSelector();
  components._applyProvinceSelectorAction();
  components._applyRegionSelectorAction();
  components._applyDistrictSelectorAction();
  components._applySubDistrictSelectorAction();
};

modules._applyDataIndividualSyncForm = function(){
  let _dataForm = document.getElementById('datasyncform');
  _dataForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    let _kdprov = document.getElementById('kdprov').value;
    let _kdkab = document.getElementById('kdkab').value;
    let _kdkec = document.getElementById('kdkec').value;
    let _kdkel = document.getElementById('kdkel').value;
    let _kdrw = document.getElementById('norw').value;
    var _norw;
    if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length > 0){
      let _nokec = ''+parseInt(_kdkec)+'';
      let _nokel = ''+parseInt(_kdkel)+'';
      if(isNaN(_kdrw)){
        _norw = _kdrw;
      } else {
        _norw = ''+parseInt(_kdrw)+'';
      }
      let _payload = JSON.stringify({"nokec":_nokec,"nokel":_nokel,"norw":_norw});
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let noticeContainer = document.getElementById('notice-data-sync');
        let noticeElement = document.querySelector('.data-sync-notification');
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        if(responseObj.status==201){
          noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
          noticeContainer.classList.remove('is-hidden');
        } else {
          noticeElement.innerHTML = `<div class='notification is-danger is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
          noticeContainer.classList.remove('is-hidden');
        }
        setTimeout(function(){
          noticeElement.innerHTML = '';
          noticeContainer.classList.add('is-hidden');
        }, 1000 * 3);
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/syncTogetDataListIndividu');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else {
      alert('Pemilihan lingkup data harus lengkap!');
    }
  });
};

modules._applyDataFamilyList = function(){
  components._populateProvinceSelector();
  components._applyProvinceSelectorAction();
  components._applyRegionSelectorAction();
  components._applyDistrictSelectorAction();
  components._applySubDistrictSelectorAction();
};

modules._applyDataFamilyListForm = function(){
  let _dataForm = document.getElementById('datalistform');
  _dataForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    let _kdprov = document.getElementById('kdprov').value;
    let _kdkab = document.getElementById('kdkab').value;
    let _kdkec = document.getElementById('kdkec').value;
    let _kdkel = document.getElementById('kdkel').value;
    let _kdrw = document.getElementById('norw').value;
    if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length > 0){
      /* scope: RW */
      document.getElementById('datatablecontainer').innerHTML = ``;
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let _payload = JSON.stringify({"kdprov":_kdprov,"kdkab":_kdkab,"kdkec":parseInt(_kdkec),"kdkel":_kdkel,"norw":_kdrw});
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _dataarray = responseObj.dataarray;
        let _datarows = '';
        let _rowcount = 1;
        for(var i=0;i<_dataarray.length;i++){
          _datarows += `<tr><td>`+_rowcount+`.</td><td class='has-text-centered'>`+_dataarray[i].no_kk+`</td><td class='has-text-centered'>`+_dataarray[i].nik_kk+`</td><td class=''>`+_dataarray[i].nama_kep+`</td><td class='has-text-centered'>`+_dataarray[i].tipe_kk+`</td><td class=''>`+_dataarray[i].alamat+`</td><td class='has-text-centered'>`+_dataarray[i].no_rw+`</td><td class='has-text-centered'>`+_dataarray[i].no_rt+`</td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].no_kk+`' class='button is-black is-small show-family-details'><i class='fa fa-file-o'></i></a></td></tr>`;
          _rowcount++;
        }
        let _tableDOM = `<table id='familydatatable' class='table is-bordered is-striped is-fullwidth is-size-6'><thead><tr><th class='has-text-centered'>No.</th><th class='has-text-centered'>No. KK</th><th class='has-text-centered'>NIK KK</th><th class='has-text-centered'>Nama Kepala Keluarga</th><th class='has-text-centered'>Tipe KK</th><th class='has-text-centered'>Alamat</th><th class='has-text-centered'>No. RW</th><th class='has-text-centered'>No. RT</th><th class='has-text-centered'></th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
        document.getElementById('datatablecontainer').innerHTML = _tableDOM;
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        components._familyDataTable('familydatatable');
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyListByLocalBlock');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length == 0){
      /* scope: subdistrict */
      document.getElementById('datatablecontainer').innerHTML = ``;
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let _payload = JSON.stringify({"kdprov":_kdprov,"kdkab":_kdkab,"kdkec":parseInt(_kdkec),"kdkel":_kdkel});
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _dataarray = responseObj.dataarray;
        let _datarows = '';
        let _rowcount = 1;
        for(var i=0;i<_dataarray.length;i++){
          _datarows += `<tr><td>`+_rowcount+`.</td><td class='has-text-centered'>`+_dataarray[i].no_kk+`</td><td class='has-text-centered'>`+_dataarray[i].nik_kk+`</td><td class=''>`+_dataarray[i].nama_kep+`</td><td class='has-text-centered'>`+_dataarray[i].tipe_kk+`</td><td class=''>`+_dataarray[i].alamat+`</td><td class='has-text-centered'>`+_dataarray[i].no_rw+`</td><td class='has-text-centered'>`+_dataarray[i].no_rt+`</td><td class='has-text-centered'><a href='' id='`+_dataarray[i].no_kk+`' class='button is-black is-small show-family-details'><i class='fa fa-file-o'></i></a></td></tr>`;
          _rowcount++;
        }
        let _tableDOM = `<table id='familydatatable' class='table is-bordered is-striped is-fullwidth is-size-6'><thead><tr><th class='has-text-centered'>No.</th><th class='has-text-centered'>No. KK</th><th class='has-text-centered'>NIK KK</th><th class='has-text-centered'>Nama Kepala Keluarga</th><th class='has-text-centered'>Tipe KK</th><th class='has-text-centered'>Alamat</th><th class='has-text-centered'>No. RW</th><th class='has-text-centered'>No. RT</th><th class='has-text-centered'></th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
        document.getElementById('datatablecontainer').innerHTML = _tableDOM;
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        components._familyDataTable('familydatatable');
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyListBySubDistrict');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length == 0 && _kdrw.length == 0){
      /* scope: district */
      document.getElementById('datatablecontainer').innerHTML = ``;
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let _payload = JSON.stringify({"kdprov":_kdprov,"kdkab":_kdkab,"kdkec":parseInt(_kdkec)});
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _dataarray = responseObj.dataarray;
        let _datarows = '';
        let _rowcount = 1;
        for(var i=0;i<_dataarray.length;i++){
          _datarows += `<tr><td>`+_rowcount+`.</td><td class='has-text-centered'>`+_dataarray[i].no_kk+`</td><td class='has-text-centered'>`+_dataarray[i].nik_kk+`</td><td class=''>`+_dataarray[i].nama_kep+`</td><td class='has-text-centered'>`+_dataarray[i].tipe_kk+`</td><td class=''>`+_dataarray[i].alamat+`</td><td class='has-text-centered'>`+_dataarray[i].no_rw+`</td><td class='has-text-centered'>`+_dataarray[i].no_rt+`</td><td class='has-text-centered'><a href='' id='`+_dataarray[i].no_kk+`' class='button is-black is-small show-family-details'><i class='fa fa-file-o'></i></a></td></tr>`;
          _rowcount++;
        }
        let _tableDOM = `<table id='familydatatable' class='table is-bordered is-striped is-fullwidth is-size-6'><thead><tr><th class='has-text-centered'>No.</th><th class='has-text-centered'>No. KK</th><th class='has-text-centered'>NIK KK</th><th class='has-text-centered'>Nama Kepala Keluarga</th><th class='has-text-centered'>Tipe KK</th><th class='has-text-centered'>Alamat</th><th class='has-text-centered'>No. RW</th><th class='has-text-centered'>No. RT</th><th class='has-text-centered'></th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
        document.getElementById('datatablecontainer').innerHTML = _tableDOM;
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        components._familyDataTable('familydatatable');
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyListByDistrict');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length == 0 && _kdkel.length > 0 && _kdrw.length == 0){
      /* scope: regional */
      document.getElementById('datatablecontainer').innerHTML = ``;
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let _payload = JSON.stringify({"kdprov":_kdprov,"kdkab":_kdkab});
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _dataarray = responseObj.dataarray;
        let _datarows = '';
        let _rowcount = 1;
        for(var i=0;i<_dataarray.length;i++){
          _datarows += `<tr><td>`+_rowcount+`.</td><td class='has-text-centered'>`+_dataarray[i].no_kk+`</td><td class='has-text-centered'>`+_dataarray[i].nik_kk+`</td><td class=''>`+_dataarray[i].nama_kep+`</td><td class='has-text-centered'>`+_dataarray[i].tipe_kk+`</td><td class=''>`+_dataarray[i].alamat+`</td><td class='has-text-centered'>`+_dataarray[i].no_rw+`</td><td class='has-text-centered'>`+_dataarray[i].no_rt+`</td><td class='has-text-centered'><a href='' id='`+_dataarray[i].no_kk+`' class='button is-black is-small show-family-details'><i class='fa fa-file-o'></i></a></td></tr>`;
          _rowcount++;
        }
        let _tableDOM = `<table id='familydatatable' class='table is-bordered is-striped is-fullwidth is-size-6'><thead><tr><th class='has-text-centered'>No.</th><th class='has-text-centered'>No. KK</th><th class='has-text-centered'>NIK KK</th><th class='has-text-centered'>Nama Kepala Keluarga</th><th class='has-text-centered'>Tipe KK</th><th class='has-text-centered'>Alamat</th><th class='has-text-centered'>No. RW</th><th class='has-text-centered'>No. RT</th><th class='has-text-centered'></th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
        document.getElementById('datatablecontainer').innerHTML = _tableDOM;
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        components._familyDataTable('familydatatable');
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getFamilyListByRegion');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else {
      alert('Pemilihan lingkup data harus lengkap!');
    }
  });
};

modules._applyDataIndividualList = function(){
  components._populateProvinceSelector();
  components._applyProvinceSelectorAction();
  components._applyRegionSelectorAction();
  components._applyDistrictSelectorAction();
  components._applySubDistrictSelectorAction();
};

modules._applyDataIndividualListForm = function(){
  let _dataForm = document.getElementById('datalistform');
  _dataForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    let _kdprov = document.getElementById('kdprov').value;
    let _kdkab = document.getElementById('kdkab').value;
    let _kdkec = document.getElementById('kdkec').value;
    let _kdkel = document.getElementById('kdkel').value;
    let _kdrw = document.getElementById('norw').value;
    if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length > 0){
      /* scope: RW */
      document.getElementById('datatablecontainer').innerHTML = ``;
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let _payload = JSON.stringify({"kdprov":_kdprov,"kdkab":_kdkab,"kdkec":parseInt(_kdkec),"kdkel":_kdkel,"norw":_kdrw});
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _dataarray = responseObj.dataarray;
        let _datarows = '';
        let _rowcount = 1;
        for(var i=0;i<_dataarray.length;i++){
          _datarows += `<tr><td>`+_rowcount+`.</td><td class='has-text-centered'>`+_dataarray[i].nik+`</td><td class='has-text-centered'>`+_dataarray[i].no_kk+`</td><td class=''>`+_dataarray[i].nama_lgkp+`</td><td class=''>`+_dataarray[i].jenis_klmin+`</td><td class=''>`+_dataarray[i].tmpt_lhr+`</td><td class='has-text-centered'>`+_dataarray[i].tgl_lhr+`</td><td class=''>`+_dataarray[i].stat_hbkel+`</td><td class=''>`+_dataarray[i].stat_kwn+`</td><td class=''>`+_dataarray[i].agama+`</td><td class=''>`+_dataarray[i].pddk_akh+`</td><td class=''>`+_dataarray[i].jenis_pkrjn+`</td><td class='has-text-centered'>`+_dataarray[i].no_rw+`</td><td class='has-text-centered'>`+_dataarray[i].no_rt+`</td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].no_kk+`' class='button is-black is-small show-family-details'><i class='fa fa-file-o'></i></a></td></tr>`;
          _rowcount++;
        }
        let _tableDOM = `<table id='individualdatatable' class='table is-bordered is-striped is-size-7'><thead><tr><th class='has-text-centered'>No.</th><th class='has-text-centered'>NIK</th><th class='has-text-centered'>No. KK</th><th class='has-text-centered'>Nama</th><th class='has-text-centered'>JK</th><th class='has-text-centered'>Tempat Lahir</th><th class='has-text-centered'>Tgl. Lahir</th><th class='has-text-centered'>Status Hb.Kel.</th><th class='has-text-centered'>Status Kawin</th><th class='has-text-centered'>Agama</th><th class='has-text-centered'>Pendidikan Akh.</th><th class='has-text-centered'>Jenis Pkrjn.</th><th class='has-text-centered'>RW</th><th class='has-text-centered'>RT</th><th class='has-text-centered'></th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
        document.getElementById('datatablecontainer').innerHTML = _tableDOM;
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        components._individualDataTable('individualdatatable');
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getIndividualByLocalBlock');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length == 0){
      /* scope: subdistrict */
      document.getElementById('datatablecontainer').innerHTML = ``;
      let _loaderModal = document.getElementById('loadermodal'), 
        _loaderContainer = document.getElementById('loadercontainer');
      _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
      _loaderModal.classList.toggle('is-active');
      let _payload = JSON.stringify({"kdprov":_kdprov,"kdkab":_kdkab,"kdkec":parseInt(_kdkec),"kdkel":_kdkel});
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = function(){
        let responseObj = xhr.response;
        let _dataarray = responseObj.dataarray;
        let _datarows = '';
        let _rowcount = 1;
        for(var i=0;i<_dataarray.length;i++){
          _datarows += `<tr><td>`+_rowcount+`.</td><td class='has-text-centered'>`+_dataarray[i].nik+`</td><td class='has-text-centered'>`+_dataarray[i].no_kk+`</td><td class=''>`+_dataarray[i].nama_lgkp+`</td><td class=''>`+_dataarray[i].jenis_klmin+`</td><td class=''>`+_dataarray[i].tmpt_lhr+`</td><td class='has-text-centered'>`+_dataarray[i].tgl_lhr+`</td><td class=''>`+_dataarray[i].stat_hbkel+`</td><td class=''>`+_dataarray[i].stat_kwn+`</td><td class=''>`+_dataarray[i].agama+`</td><td class=''>`+_dataarray[i].pddk_akh+`</td><td class=''>`+_dataarray[i].jenis_pkrjn+`</td><td class='has-text-centered'>`+_dataarray[i].no_rw+`</td><td class='has-text-centered'>`+_dataarray[i].no_rt+`</td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].no_kk+`' class='button is-black is-small show-family-details'><i class='fa fa-file-o'></i></a></td></tr>`;
          _rowcount++;
        }
        let _tableDOM = `<table id='individualdatatable' class='table is-bordered is-striped is-size-7'><thead><tr><th class='has-text-centered'>No.</th><th class='has-text-centered'>NIK</th><th class='has-text-centered'>No. KK</th><th class='has-text-centered'>Nama</th><th class='has-text-centered'>JK</th><th class='has-text-centered'>Tempat Lahir</th><th class='has-text-centered'>Tgl. Lahir</th><th class='has-text-centered'>Status Hb.Kel.</th><th class='has-text-centered'>Status Kawin</th><th class='has-text-centered'>Agama</th><th class='has-text-centered'>Pendidikan Akh.</th><th class='has-text-centered'>Jenis Pkrjn.</th><th class='has-text-centered'>RW</th><th class='has-text-centered'>RT</th><th class='has-text-centered'></th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
        document.getElementById('datatablecontainer').innerHTML = _tableDOM;
        _loaderModal.classList.remove('is-active');
        _loaderContainer.innerHTML = ``;
        components._individualDataTable('individualdatatable');
      };
      xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getIndividualBySubDistrict');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(_payload);
    } else {
      alert('Pemilihan lingkup data harus lengkap!');
    }
  });
};

modules._applyRegionalDataFamilyList = function(){
  components._populateDistrictSelector();
  components._applyDistrictSelectorAction();
  components._applySubDistrictSelectorAction();
};

modules._applyDistrictDataFamilyList = function(){
  components._populateSubDistrictSelector();
  components._applySubDistrictSelectorAction();
};

modules._applySubDistrictDataFamilyList = function(){
  components._populateLocalBlockSelector();
};

modules._applyLocalBlockDataFamilyList = function(){
  
};

modules._applySubLocalBlockDataFamilyList = function(){
  
};

modules._applyRegionalDataIndividualList = function(){
  components._populateDistrictSelector();
  components._applyDistrictSelectorAction();
  components._applySubDistrictSelectorAction();
};

modules._applyDistrictDataIndividualList = function(){
  components._populateSubDistrictSelector();
  components._applySubDistrictSelectorAction();
};

modules._applySubDistrictDataIndividualList = function(){
  components._populateLocalBlockSelector();
};

modules._applyLocalBlockDataIndividualList = function(){
  
};

modules._applySubLocalBlockDataIndividualList = function(){
  
};

modules._applySteeringCommiteeUserManagement = function(){
  components._populateProvinceSelector();
  components._applyProvinceSelectorAction();
  components._applyRegionSelectorAction();
  components._applyDistrictSelectorAction();
  components._applySubDistrictSelectorAction();
  modules._applyAllUsersManagementForm();
};

modules._applyAllUsersManagementForm = function(){
  let _dataForm = document.getElementById('steeringcommiteeusermanagement');
  _dataForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    let _kdprov = document.getElementById('kdprov').value;
    let _kdkab = document.getElementById('kdkab').value;
    let _kdkec = document.getElementById('kdkec').value;
    let _kdkel = document.getElementById('kdkel').value;
    let _kdrw = document.getElementById('norw').value;
    let _newuserrealname = document.getElementById('newuserrealname').value;
    let _newusername = document.getElementById('newusername').value;
    if(_newuserrealname.length > 5 && _newusername.length > 5){
      if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length > 0){
        /* scope: RW */
        document.getElementById('datatablecontainer').innerHTML = ``;
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let _payload = JSON.stringify({"context":"LOKAL BLOK DATA KOLEKTOR","realname":_newuserrealname,"username":_newusername,"module":"localblock-data","province":_kdprov,"region":_kdkab,"district":_kdkec,"subdistrict":_kdkel,"localblock":_kdrw,"sublocalblock":"UNDEFINED"});
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            modules._reloadAllUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/addUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length == 0){
        /* scope: subdistrict */
        document.getElementById('datatablecontainer').innerHTML = ``;
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let _payload = JSON.stringify({"context":"SUBDISTRIK DATA KOLEKTOR","realname":_newuserrealname,"username":_newusername,"module":"subdistrict-data","province":_kdprov,"region":_kdkab,"district":_kdkec,"subdistrict":_kdkel,"localblock":"UNDEFINED","sublocalblock":"UNDEFINED"});
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            modules._reloadAllUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/addUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length == 0 && _kdrw.length == 0){
        /* scope: district */
        document.getElementById('datatablecontainer').innerHTML = ``;
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let _payload = JSON.stringify({"context":"DISTRIK ADMINISTRATOR DATA","realname":_newuserrealname,"username":_newusername,"module":"district-data","province":_kdprov,"region":_kdkab,"district":_kdkec,"subdistrict":"UNDEFINED","localblock":"UNDEFINED","sublocalblock":"UNDEFINED"});
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            modules._reloadAllUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/addUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length == 0 && _kdkel.length > 0 && _kdrw.length == 0){
        /* scope: regional */
        document.getElementById('datatablecontainer').innerHTML = ``;
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let _payload = JSON.stringify({"context":"REGIONAL ADMINISTRATOR DATA","realname":_newuserrealname,"username":_newusername,"module":"regional-data","province":_kdprov,"region":_kdkab,"district":"UNDEFINED","subdistrict":"UNDEFINED","localblock":"UNDEFINED","sublocalblock":"UNDEFINED"});
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function(){
          let responseObj = xhr.response;
          if(responseObj.status == 201){
            modules._reloadAllUsersData();
            _loaderModal.classList.remove('is-active');
            _loaderContainer.innerHTML = ``;
            let noticeContainer = document.getElementById('notice-create-user');
            let noticeElement = document.querySelector('.create-user-notification');
            noticeElement.innerHTML = `<div class='notification is-success is-size-6 is-radiusless'>Status: `+responseObj.status+`. `+responseObj.message+`</div>`;
            noticeContainer.classList.remove('is-hidden');
            setTimeout(function(){
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/addUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        alert('Pemilihan area pengguna harus lengkap!');
      }
    } else {
      alert('Nama lengkap dan username minimal 6 karakter.');
    }
  });
};

modules._loadAllUsersData = function(){
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
      if(_dataarray[i].status=='0'){
        _datarows += `<tr class='has-background-grey'><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].realname+`</td><td class=''>`+_dataarray[i].username+`</td><td class=''>`+_dataarray[i].module+`</td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-warning password-reset-button'><i class='fa fa-refresh'></i></a></td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-primary activate-user-button'><i class='fa fa-user-plus'></i></a></td></tr>`;
      } else {
        _datarows += `<tr><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].realname+`</td><td class=''>`+_dataarray[i].username+`</td><td class=''>`+_dataarray[i].module+`</td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-warning password-reset-button'><i class='fa fa-refresh'></i></a></td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-danger deactivate-user-button'><i class='fa fa-recycle'></i></a></td></tr>`;
      }
      _rowcount++;
    }
    let _tableDOM = `<table id='usersdatatable' class='table is-bordered is-striped is-size-7'><thead><tr><th class='has-text-centered'>No.</th><th class='has-text-centered'>Nama Lengkap Pengguna</th><th class='has-text-centered'>Nama Pengguna [Username]</th><th class='has-text-centered'>Modul</th><th class='has-text-centered' colspan='2'></th></tr></thead><tbody>`+_datarows+`</tbody></table>`;
    document.getElementById('datatablecontainer').innerHTML = _tableDOM;
    _loaderModal.classList.remove('is-active');
    _loaderContainer.innerHTML = ``;
    components._allUsersDataTable('usersdatatable');
  };
  xhr.open('GET', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/listAllUsers');
  xhr.send();
};

modules._reloadAllUsersData = function(){
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
        _datarows += `<tr class='has-background-grey'><td>`+_rowcount+`.</td><td class=''>`+_dataarray[i].realname+`</td><td class=''>`+_dataarray[i].username+`</td><td class=''>`+_dataarray[i].module+`</td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-warning password-reset-button'><i class='fa fa-refresh'></i></a></td><td class='has-text-centered'><a href='#' id='`+_dataarray[i].id+`' class='button is-small is-primary activate-user-button'><i class='fa fa-user-plus'></i></a></td></tr>`;
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

modules._loadRegionalUsersData = function(){
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

modules._applyRegionalUserManagement = function(){
  components._populateDistrictSelector();
  components._applyDistrictSelectorAction();
  components._applySubDistrictSelectorAction();
  modules._applyRegionalUsersManagementForm();
};

modules._applyRegionalUsersManagementForm = function(){
  let _dataForm = document.getElementById('regionalusermanagement');
  _dataForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    let _kdprov = document.getElementById('kdprov').value;
    let _kdkab = document.getElementById('kdkab').value;
    let _kdkec = document.getElementById('kdkec').value;
    let _kdkel = document.getElementById('kdkel').value;
    let _kdrw = document.getElementById('norw').value;
    let _newuserrealname = document.getElementById('newuserrealname').value;
    let _newusername = document.getElementById('newusername').value;
    if(_newuserrealname.length > 5 && _newusername.length > 5){
      if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length > 0){
        /* scope: RW */
        document.getElementById('datatablecontainer').innerHTML = ``;
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let _payload = JSON.stringify({"context":"LOKAL BLOK DATA KOLEKTOR","realname":_newuserrealname,"username":_newusername,"module":"localblock-data","province":_kdprov,"region":_kdkab,"district":_kdkec,"subdistrict":_kdkel,"localblock":_kdrw,"sublocalblock":"UNDEFINED"});
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/addUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length == 0){
        /* scope: subdistrict */
        document.getElementById('datatablecontainer').innerHTML = ``;
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let _payload = JSON.stringify({"context":"SUBDISTRIK DATA KOLEKTOR","realname":_newuserrealname,"username":_newusername,"module":"subdistrict-data","province":_kdprov,"region":_kdkab,"district":_kdkec,"subdistrict":_kdkel,"localblock":"UNDEFINED","sublocalblock":"UNDEFINED"});
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/addUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length == 0 && _kdrw.length == 0){
        /* scope: district */
        document.getElementById('datatablecontainer').innerHTML = ``;
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let _payload = JSON.stringify({"context":"DISTRIK ADMINISTRATOR DATA","realname":_newuserrealname,"username":_newusername,"module":"district-data","province":_kdprov,"region":_kdkab,"district":_kdkec,"subdistrict":"UNDEFINED","localblock":"UNDEFINED","sublocalblock":"UNDEFINED"});
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/addUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        alert('Pemilihan area pengguna harus lengkap!');
      }
    } else {
      alert('Nama lengkap dan username minimal 6 karakter.');
    }
  });
};

modules._loadDistrictUsersData = function(){
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

modules._applyDistrictUserManagement = function(){
  components._populateSubDistrictSelector();
  components._applySubDistrictSelectorAction();
  modules._applyDistrictUsersManagementForm();
};

modules._applyDistrictUsersManagementForm = function(){
  let _dataForm = document.getElementById('districtusermanagement');
  _dataForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    let _kdprov = document.getElementById('kdprov').value;
    let _kdkab = document.getElementById('kdkab').value;
    let _kdkec = document.getElementById('kdkec').value;
    let _kdkel = document.getElementById('kdkel').value;
    let _kdrw = document.getElementById('norw').value;
    let _newuserrealname = document.getElementById('newuserrealname').value;
    let _newusername = document.getElementById('newusername').value;
    if(_newuserrealname.length > 5 && _newusername.length > 5){
      if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length > 0){
        /* scope: RW */
        document.getElementById('datatablecontainer').innerHTML = ``;
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let _payload = JSON.stringify({"context":"LOKAL BLOK DATA KOLEKTOR","realname":_newuserrealname,"username":_newusername,"module":"localblock-data","province":_kdprov,"region":_kdkab,"district":_kdkec,"subdistrict":_kdkel,"localblock":_kdrw,"sublocalblock":"UNDEFINED"});
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/addUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else if(_kdprov.length > 0 && _kdkab.length > 0 && _kdkec.length > 0 && _kdkel.length > 0 && _kdrw.length == 0){
        /* scope: subdistrict */
        document.getElementById('datatablecontainer').innerHTML = ``;
        let _loaderModal = document.getElementById('loadermodal'), 
          _loaderContainer = document.getElementById('loadercontainer');
        _loaderContainer.insertAdjacentHTML('afterbegin', templates._dataLoader());
        _loaderModal.classList.toggle('is-active');
        let _payload = JSON.stringify({"context":"SUBDISTRIK DATA KOLEKTOR","realname":_newuserrealname,"username":_newusername,"module":"subdistrict-data","province":_kdprov,"region":_kdkab,"district":_kdkec,"subdistrict":_kdkel,"localblock":"UNDEFINED","sublocalblock":"UNDEFINED"});
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
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
              document.getElementById('newuserrealname').value = '';
              document.getElementById('newusername').value = '';
              noticeElement.innerHTML = '';
              noticeContainer.classList.add('is-hidden');
            }, 3000);
          }
        };
        xhr.open('POST', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/addUser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(_payload);
      } else {
        alert('Pemilihan area pengguna harus lengkap!');
      }
    } else {
      alert('Nama lengkap dan username minimal 6 karakter.');
    }
  });
};

export default modules;