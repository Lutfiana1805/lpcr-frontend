import config from './config';

var templates = {};

templates._topNavigation = function(){
  document.title = config.documentTitle;
  document.body.classList.add('has-navbar-fixed-top');
  let _sessionData = sessionStorage.getItem('_userdata');
  let _sessionDataObj = JSON.parse(_sessionData);
  if(_sessionDataObj.module=='steeringcommitee'){
    let dom = `<nav class='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
        <div class='navbar-brand'>
          <a class='navbar-item' href='./'><h1>`+ config.appTitle +`</h1></a>
          <a role='button' class='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarMainMenu'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>
        <div id='navbarMainMenu' class='navbar-menu'>
          <div class='navbar-start'>
            <a class='navbar-item' id='home'><span class='icon' style='margin-right:1px'><i class='fa fa-home'></i></span>Beranda</a>
            <a class='navbar-item' id='dataviz'><span class='icon' style='margin-right:1px'><i class='fa fa-eye'></i></span>Visualisasi Data</a>
            <div class='navbar-item has-dropdown is-hoverable'>
              <a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data Primer</a>
              <div class='navbar-dropdown'>
                <a class='navbar-item' id='steeringcommitee-primary-data-family-sync'><span class='icon' style='margin-right:1px'><i class='fa fa-random'></i></span>Sinkronisasi Data Keluarga</a>
                <a class='navbar-item' id='steeringcommitee-primary-data-individual-sync'><span class='icon' style='margin-right:1px'><i class='fa fa-random'></i></span>Sinkronisasi Data Individu</a>
                <a class='navbar-item' id='steeringcommitee-primary-data-family-list'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
                <a class='navbar-item' id='steeringcommitee-primary-data-individual-list'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
                <!-- <hr class='navbar-divider'>
                <a class='navbar-item'><span class='icon' style='margin-right:1px'><i class='fa fa-paper-plane'></i></span>Report an issue</a> -->
              </div>
            </div>
          </div>
          <div class='navbar-end'>
            <div class='navbar-item has-dropdown is-hoverable'>
              <a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-cogs'></i></span>`+ _sessionDataObj.realname +`</a>
              <div class='navbar-dropdown'>
                <a class='navbar-item' id='common-change-password'><span class='icon' style='margin-right:1px'><i class='fa fa-lock'></i></span>Password</a>
                <a class='navbar-item' id='steeringcommitee-user-management'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Manajemen Pengguna</a>
              </div>
            </div>
            <div class='navbar-item'>
              <div class='buttons'>
                <a id='logoffbutton' class='button has-background-dark has-text-light is-outlined is-radiusless is-fullwidth-mobile'><span class='icon' style='margin-right:1px;'><i class='fa fa-power-off'></i></span>Keluar</a>
              </div>
            </div>
          </div>
        </div>
      </nav>`;
    return dom;
  } else if(_sessionDataObj.module=='regional-data'){
    let dom = `<nav class='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
<div class='navbar-brand'>
<a class='navbar-item' href='./'><h1>`+ config.appTitle +`</h1></a>
<a role='button' class='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarMainMenu'>
<span aria-hidden='true'></span>
<span aria-hidden='true'></span>
<span aria-hidden='true'></span>
</a>
</div>
<div id='navbarMainMenu' class='navbar-menu'>
<div class='navbar-start'>
<a class='navbar-item' id='home'><span class='icon' style='margin-right:1px'><i class='fa fa-home'></i></span>Beranda</a>
<a class='navbar-item' id='dataviz'><span class='icon' style='margin-right:1px'><i class='fa fa-eye'></i></span>Visualisasi Data</a>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data Primer</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='regional-primary-data-family-list'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
<a class='navbar-item' id='regional-primary-data-individual-list'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
<!-- <hr class='navbar-divider'>
<a class='navbar-item'><span class='icon' style='margin-right:1px'><i class='fa fa-paper-plane'></i></span>Report an issue</a> -->
</div>
</div>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Geospasial Data</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='regional-map-family'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Peta Keluarga</a>
<hr class='navbar-divider'>
<a class='navbar-item' id='regional-map-digitize'><span class='icon' style='margin-right:1px'><i class='fa fa-map-marker'></i></span>Pendataan Lokasi Keluarga</a>
</div>
</div>
</div>
<div class='navbar-end'>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-cogs'></i></span>`+ _sessionDataObj.realname +`</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='common-change-password'><span class='icon' style='margin-right:1px'><i class='fa fa-lock'></i></span>Password</a>
<a class='navbar-item' id='regional-user-management'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Manajemen Pengguna</a>
<a class='navbar-item' id='regional-application-help'><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</a>
</div>
</div>
<div class='navbar-item'>
<div class='buttons'>
<a id='logoffbutton' class='button has-background-dark has-text-light is-outlined is-radiusless is-fullwidth-mobile'><span class='icon' style='margin-right:1px;'><i class='fa fa-power-off'></i></span>Keluar</a>
</div>
</div>
</div>
</div>
</nav>`;
    return dom;
  } else if(_sessionDataObj.module=='district-data'){
    let dom = `<nav class='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
<div class='navbar-brand'>
<a class='navbar-item' href='./'><h1>`+ config.appTitle +`</h1></a>
<a role='button' class='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarMainMenu'>
<span aria-hidden='true'></span>
<span aria-hidden='true'></span>
<span aria-hidden='true'></span>
</a>
</div>
<div id='navbarMainMenu' class='navbar-menu'>
<div class='navbar-start'>
<a class='navbar-item' id='home'><span class='icon' style='margin-right:1px'><i class='fa fa-home'></i></span>Beranda</a>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data Primer</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='district-primary-data-family-list'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
<a class='navbar-item' id='district-primary-data-individual-list'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
<!-- <hr class='navbar-divider'>
<a class='navbar-item'><span class='icon' style='margin-right:1px'><i class='fa fa-paper-plane'></i></span>Report an issue</a> -->
</div>
</div>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Geospasial Data</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='district-map-family'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Peta Keluarga</a>
<hr class='navbar-divider'>
<a class='navbar-item' id='district-map-digitize'><span class='icon' style='margin-right:1px'><i class='fa fa-map-marker'></i></span>Pendataan Lokasi Keluarga</a>
</div>
</div>
</div>
<div class='navbar-end'>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-cogs'></i></span>`+ _sessionDataObj.realname +`</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='common-change-password'><span class='icon' style='margin-right:1px'><i class='fa fa-lock'></i></span>Password</a>
<a class='navbar-item' id='district-user-management'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Manajemen Pengguna</a>
<a class='navbar-item' id='district-application-help'><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</a>
</div>
</div>
<div class='navbar-item'>
<div class='buttons'>
<a id='logoffbutton' class='button has-background-dark has-text-light is-outlined is-radiusless is-fullwidth-mobile'><span class='icon' style='margin-right:1px;'><i class='fa fa-power-off'></i></span>Keluar</a>
</div>
</div>
</div>
</div>
</nav>`;
    return dom;
  } else if(_sessionDataObj.module=='subdistrict-data'){
    let dom = `<nav class='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
<div class='navbar-brand'>
<a class='navbar-item' href='./'><h1>`+ config.appTitle +`</h1></a>
<a role='button' class='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarMainMenu'>
<span aria-hidden='true'></span>
<span aria-hidden='true'></span>
<span aria-hidden='true'></span>
</a>
</div>
<div id='navbarMainMenu' class='navbar-menu'>
<div class='navbar-start'>
<a class='navbar-item' id='home'><span class='icon' style='margin-right:1px'><i class='fa fa-home'></i></span>Beranda</a>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='subdistrict-primary-data-family-list'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
<a class='navbar-item' id='subdistrict-primary-data-individual-list'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
<!-- <hr class='navbar-divider'>
<a class='navbar-item'><span class='icon' style='margin-right:1px'><i class='fa fa-paper-plane'></i></span>Report an issue</a> -->
</div>
</div>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Geospasial Data</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='subdistrict-map-family'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Peta Keluarga</a>
<hr class='navbar-divider'>
<a class='navbar-item' id='subdistrict-map-digitize'><span class='icon' style='margin-right:1px'><i class='fa fa-map-marker'></i></span>Pendataan Lokasi Keluarga</a>
</div>
</div>
</div>
<div class='navbar-end'>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-cogs'></i></span>`+ _sessionDataObj.realname +`</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='common-change-password'><span class='icon' style='margin-right:1px'><i class='fa fa-lock'></i></span>Password</a>
<a class='navbar-item' id='subdistrict-application-help'><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</a>
</div>
</div>
<div class='navbar-item'>
<div class='buttons'>
<a id='logoffbutton' class='button has-background-dark has-text-light is-outlined is-radiusless is-fullwidth-mobile'><span class='icon' style='margin-right:1px;'><i class='fa fa-power-off'></i></span>Keluar</a>
</div>
</div>
</div>
</div>
</nav>`;
    return dom;
  } else if(_sessionDataObj.module=='localblock-data'){
    let dom = `<nav class='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
<div class='navbar-brand'>
<a class='navbar-item' href='./'><h1>`+ config.appTitle +`</h1></a>
<a role='button' class='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarMainMenu'>
<span aria-hidden='true'></span>
<span aria-hidden='true'></span>
<span aria-hidden='true'></span>
</a>
</div>
<div id='navbarMainMenu' class='navbar-menu'>
<div class='navbar-start'>
<a class='navbar-item' id='home'><span class='icon' style='margin-right:1px'><i class='fa fa-home'></i></span>Beranda</a>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='localblock-primary-data-family-list'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
<a class='navbar-item' id='localblock-primary-data-individual-list'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
<!-- <hr class='navbar-divider'>
<a class='navbar-item'><span class='icon' style='margin-right:1px'><i class='fa fa-paper-plane'></i></span>Report an issue</a> -->
</div>
</div>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Geospasial Data</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='localblock-map-family'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Peta Keluarga</a>
<hr class='navbar-divider'>
<a class='navbar-item' id='localblock-map-digitize'><span class='icon' style='margin-right:1px'><i class='fa fa-map-marker'></i></span>Pendataan Lokasi Keluarga</a>
</div>
</div>
</div>
<div class='navbar-end'>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-cogs'></i></span>`+ _sessionDataObj.realname +`</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='common-change-password'><span class='icon' style='margin-right:1px'><i class='fa fa-lock'></i></span>Password</a>
<a class='navbar-item' id='localblock-application-help'><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</a>
</div>
</div>
<div class='navbar-item'>
<div class='buttons'>
<a id='logoffbutton' class='button has-background-dark has-text-light is-outlined is-radiusless is-fullwidth-mobile'><span class='icon' style='margin-right:1px;'><i class='fa fa-power-off'></i></span>Keluar</a>
</div>
</div>
</div>
</div>
</nav>`;
    return dom;
  } else if(_sessionDataObj.module=='sublocalblock-data'){
    let dom = `<nav class='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
<div class='navbar-brand'>
<a class='navbar-item' href='./'><h1>`+ config.appTitle +`</h1></a>
<a role='button' class='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarMainMenu'>
<span aria-hidden='true'></span>
<span aria-hidden='true'></span>
<span aria-hidden='true'></span>
</a>
</div>
<div id='navbarMainMenu' class='navbar-menu'>
<div class='navbar-start'>
<a class='navbar-item' id='home'><span class='icon' style='margin-right:1px'><i class='fa fa-home'></i></span>Beranda</a>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='sublocalblock-primary-data-family-list'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
<a class='navbar-item' id='sublocalblock-primary-data-individual-list'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
<!-- <hr class='navbar-divider'>
<a class='navbar-item'><span class='icon' style='margin-right:1px'><i class='fa fa-paper-plane'></i></span>Report an issue</a> -->
</div>
</div>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Geospasial Data</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='sublocalblock-map-family'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Peta Keluarga</a>
<hr class='navbar-divider'>
<a class='navbar-item' id='sublocalblock-map-digitize'><span class='icon' style='margin-right:1px'><i class='fa fa-map-marker'></i></span>Pendataan Lokasi Keluarga</a>
</div>
</div>
</div>
<div class='navbar-end'>
<div class='navbar-item has-dropdown is-hoverable'>
<a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-cogs'></i></span>`+ _sessionDataObj.realname +`</a>
<div class='navbar-dropdown'>
<a class='navbar-item' id='common-change-password'><span class='icon' style='margin-right:1px'><i class='fa fa-lock'></i></span>Password</a>
<a class='navbar-item' id='sublocalblock-application-help'><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</a>
</div>
</div>
<div class='navbar-item'>
<div class='buttons'>
<a id='logoffbutton' class='button has-background-dark has-text-light is-outlined is-radiusless is-fullwidth-mobile'><span class='icon' style='margin-right:1px;'><i class='fa fa-power-off'></i></span>Keluar</a>
</div>
</div>
</div>
</div>
</nav>`;
    return dom;
  } else {
    let dom = `<nav class='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
        <div class='navbar-brand'>
          <a class='navbar-item' href='./'><h1>`+ config.appTitle +`</h1></a>
          <a role='button' class='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarMainMenu'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>
        <div id='navbarMainMenu' class='navbar-menu'>
          <div class='navbar-start'>
            
          </div>
          <div class='navbar-end'>
            <div class='navbar-item'>
              <div class='buttons'>
                <a id='logoffbutton' class='button has-background-dark has-text-light is-outlined is-radiusless is-fullwidth-mobile'><span class='icon' style='margin-right:1px;'><i class='fa fa-lock'></i></span>Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>`;
    return dom;
  }
};

templates._applicationFrontpage = function(){
  let dom = ``;
  return dom;
};

templates._loaderContainer = function(){
  let dom = `<div id='loadermodal' class='modal'>
      <div id='secondary_closer' class='modal-background'></div>
      <div id='loadercontainer' class='modal-content has-text-centered'></div>
    </div>`;
  return dom;
};

templates._dataLoader = function(){
  let dom = `<div class='lds-grid'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
  return dom;
};

templates._primaryDataFamilySync = function(){
  let dom = `<section class='section section-breadcrumb-top'>
<div class='container has-background-light is-padding-5'>
<nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
<ul>
<li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
<li class='is-active'>
<a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-random'></i></span>Sinkronisasi Data Keluarga</a>
</li>
</ul>
</nav>
</div>
</section>
<section class='section is-containing-datatable'>
<div class='container has-background-light is-padding-5'>
<form id='datasyncform' name='datasyncform'>
<div class='columns'>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdprov' name='kdprov' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Provinsi</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkab' name='kdkab' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kabupaten/Kota</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkec' name='kdkec' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kecamatan</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
</div>
</div>
<div class='column'>
<button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data' disabled>
<span class='icon'><i class='fa fa-random'></i></span><span>Sinkronisasi Data</span>
</button>
</div>
</div>
</form>
</div>
<div id='notice-data-sync' class='container is-hidden'>
<div class='data-sync-notification'></div>
</div>
</section>`;
  return dom;
};

templates._primaryDataIndividualSync = function(){
  let dom = `<section class='section section-breadcrumb-top'>
<div class='container has-background-light is-padding-5'>
<nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
<ul>
<li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
<li class='is-active'>
<a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-random'></i></span>Sinkronisasi Data Individu</a>
</li>
</ul>
</nav>
</div>
</section>
<section class='section is-containing-datatable'>
<div class='container has-background-light is-padding-5'>
<form id='datasyncform' name='datasyncform'>
<div class='columns'>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdprov' name='kdprov' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Provinsi</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkab' name='kdkab' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kabupaten/Kota</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkec' name='kdkec' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kecamatan</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
</div>
</div>
<div class='column'>
<button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data' disabled>
<span class='icon'><i class='fa fa-random'></i></span><span>Sinkronisasi Data</span>
</button>
</div>
</div>
</form>
</div>
<div id='notice-data-sync' class='container is-hidden'>
<div class='data-sync-notification'></div>
</div>
</section>`;
  return dom;
};

templates._primaryDataFamilyList = function(){
  let dom = `<section class='section section-breadcrumb-top'>
<div class='container has-background-light is-padding-5'>
<nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
<ul>
<li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
<li class='is-active'>
<a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
</li>
</ul>
</nav>
</div>
</section>
<section class='section is-containing-datatable'>
<div class='container has-background-light is-padding-5'>
<form id='datalistform' name='datalistform'>
<div class='columns'>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdprov' name='kdprov' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Provinsi</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkab' name='kdkab' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kabupaten/Kota</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkec' name='kdkec' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kecamatan</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
</div>
</div>
<div class='column'>
<button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
<span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
</button>
</div>
</div>
</form>
</div>
</section>
<section class='section is-containing-datatable'>
<div class='container has-background-light is-padding-5'>
<div class='columns'>
<div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
</div>
</div>
</section>
<div id='familyinfomodal' class='modal'>
<div class='modal-background'></div>
<div class='modal-card'>
<header class='modal-card-head'>
<p class='modal-card-title'></p>
<button class='delete familyinfomodal-close' aria-label='close'></button>
</header>
<section id='familyinfomodalbody' class='modal-card-body'></section>
<footer class='modal-card-foot custom-familyinfo-modal-footer'>
<button class='button is-black familyinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
</footer>
</div>
</div>`;
  return dom;
};

templates._primaryDataIndividualList = function(){
  let dom = `<section class='section section-breadcrumb-top'>
<div class='container has-background-light is-padding-5'>
<nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
<ul>
<li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
<li class='is-active'>
<a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Individu</a>
</li>
</ul>
</nav>
</div>
</section>
<section class='section is-containing-datatable'>
<div class='container has-background-light is-padding-5'>
<form id='datalistform' name='datalistform'>
<div class='columns'>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdprov' name='kdprov' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Provinsi</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkab' name='kdkab' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kabupaten/Kota</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkec' name='kdkec' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kecamatan</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
</div>
</div>
<div class='column'>
<div class='select is-fullwidth'>
<select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
</div>
</div>
<div class='column'>
<button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
<span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
</button>
</div>
</div>
</form>
</div>
</section>
<section class='section is-containing-datatable'>
<div class='container has-background-light is-padding-5'>
<div class='columns'>
<div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
</div>
</div>
</section>
<div id='individualinfomodal' class='modal'>
<div class='modal-background'></div>
<div class='modal-card'>
<header class='modal-card-head'>
<p class='modal-card-title'></p>
<button class='delete individualinfomodal-close' aria-label='close'></button>
</header>
<section id='individualinfomodalbody' class='modal-card-body'></section>
<footer class='modal-card-foot custom-individualinfo-modal-footer'>
<button class='button is-black individualinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
</footer>
</div>
</div>`;
  return dom;
};

templates._steeringCommiteeUserManagement = function(){
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-cog'></i></span>Pengaturan</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Manajemen Pengguna</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='steeringcommiteeusermanagement' name='steeringcommiteeusermanagement'>
          <div class='columns'>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdprov' name='kdprov' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Provinsi</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkab' name='kdkab' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kabupaten/Kota</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkec' name='kdkec' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kecamatan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column'>
              <div class='field'>
                <label class='label'>Nama Lengkap Pengguna</label>
                <div class='control'>
                  <input id='newuserrealname' class='input is-radiusless' type='text' placeholder='Nama Lengkap Pengguna'>
                </div>
              </div>
              <div class='field'>
                <label class='label'>Nama Pengguna [Username]</label>
                <div class='control'>
                  <input id='newusername' class='input is-radiusless' type='text' placeholder='Nama Lengkap Pengguna'>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-create-user'>
                <span class='icon'><i class='fa fa-plus'></i></span><span>Tambahkan Akun Pengguna</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div id='notice-create-user' class='container is-hidden'>
        <div class='create-user-notification'></div>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>`;
  return dom;
};

templates._regionalUserManagement = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-cog'></i></span>Pengaturan</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Manajemen Pengguna - Level Kabupaten/Kota</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='regionalusermanagement' name='regionalusermanagement'>
          <input type='hidden' id='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' value='`+_udObj.region+`'/>
          <div class='columns'>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkec' name='kdkec' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kecamatan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column'>
              <div class='field'>
                <label class='label'>Nama Lengkap Pengguna</label>
                <div class='control'>
                  <input id='newuserrealname' class='input is-radiusless' type='text' placeholder='Nama Lengkap Pengguna'>
                </div>
              </div>
              <div class='field'>
                <label class='label'>Nama Pengguna [Username]</label>
                <div class='control'>
                  <input id='newusername' class='input is-radiusless' type='text' placeholder='Nama Lengkap Pengguna'>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-create-user'>
                <span class='icon'><i class='fa fa-plus'></i></span><span>Tambahkan Akun Pengguna</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div id='notice-create-user' class='container is-hidden'>
        <div class='create-user-notification'></div>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>`;
  return dom;
};

templates._districtUserManagement = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-cog'></i></span>Pengaturan</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Manajemen Pengguna - Level Kecamatan</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='districtusermanagement' name='districtusermanagement'>
          <input type='hidden' id='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' value='`+_udObj.region+`'/>
          <input type='hidden' id='kdkec' value='`+_udObj.district+`'/>
          <div class='columns'>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column'>
              <div class='field'>
                <label class='label'>Nama Lengkap Pengguna</label>
                <div class='control'>
                  <input id='newuserrealname' class='input is-radiusless' type='text' placeholder='Nama Lengkap Pengguna'>
                </div>
              </div>
              <div class='field'>
                <label class='label'>Nama Pengguna [Username]</label>
                <div class='control'>
                  <input id='newusername' class='input is-radiusless' type='text' placeholder='Nama Lengkap Pengguna'>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-create-user'>
                <span class='icon'><i class='fa fa-plus'></i></span><span>Tambahkan Akun Pengguna</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div id='notice-create-user' class='container is-hidden'>
        <div class='create-user-notification'></div>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>`;
  return dom;
};

templates._primaryDataRegionalFamilyList = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='datalistform' name='datalistform'>
          <input type='hidden' id='kdprov' name='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' name='kdkab' value='`+_udObj.region+`'/>
          <div class='columns'>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkec' name='kdkec' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kecamatan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
              </div>
            </div>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
                <span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>
    <div id='familyinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'></p>
          <button class='delete familyinfomodal-close' aria-label='close'></button>
        </header>
        <section id='familyinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-familyinfo-modal-footer'>
          <button class='button is-black familyinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
        </footer>
      </div>
    </div>`;
  return dom;
};
templates._primaryDataDistrictFamilyList = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='datalistform' name='datalistform'>
          <input type='hidden' id='kdprov' name='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' name='kdkab' value='`+_udObj.region+`'/>
          <input type='hidden' id='kdkec' name='kdkec' value='`+_udObj.district+`'/>
          <div class='columns'>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
              </div>
            </div>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
                <span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>
    <div id='familyinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'></p>
          <button class='delete familyinfomodal-close' aria-label='close'></button>
        </header>
        <section id='familyinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-familyinfo-modal-footer'>
          <button class='button is-black familyinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
        </footer>
      </div>
    </div>`;
  return dom;
};
templates._primaryDataSubDistrictFamilyList = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='datalistform' name='datalistform'>
          <input type='hidden' id='kdprov' name='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' name='kdkab' value='`+_udObj.region+`'/>
          <input type='hidden' id='kdkec' name='kdkec' value='`+_udObj.district+`'/>
          <input type='hidden' id='kdkel' name='kdkel' value='`+_udObj.subdistrict+`'/>
          <div class='columns'>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
              </div>
            </div>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
                <span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>
    <div id='familyinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'></p>
          <button class='delete familyinfomodal-close' aria-label='close'></button>
        </header>
        <section id='familyinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-familyinfo-modal-footer'>
          <button class='button is-black familyinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
        </footer>
      </div>
    </div>`;
  return dom;
};
templates._primaryDataLocalBlockFamilyList = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='datalistform' name='datalistform'>
          <input type='hidden' id='kdprov' name='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' name='kdkab' value='`+_udObj.region+`'/>
          <input type='hidden' id='kdkec' name='kdkec' value='`+_udObj.district+`'/>
          <input type='hidden' id='kdkel' name='kdkel' value='`+_udObj.subdistrict+`'/>
          <input type='hidden' id='norw' name='norw' value='`+_udObj.localblock+`'/>
          <div class='columns'>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
                <span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>
    <div id='familyinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'></p>
          <button class='delete familyinfomodal-close' aria-label='close'></button>
        </header>
        <section id='familyinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-familyinfo-modal-footer'>
          <button class='button is-black familyinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
        </footer>
      </div>
    </div>`;
  return dom;
};
templates._primaryDataSubLocalBlockFamilyList = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-users'></i></span>Daftar Data Keluarga</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='datalistform' name='datalistform'>
          <input type='hidden' id='kdprov' name='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' name='kdkab' value='`+_udObj.region+`'/>
          <input type='hidden' id='kdkec' name='kdkec' value='`+_udObj.district+`'/>
          <input type='hidden' id='kdkel' name='kdkel' value='`+_udObj.subdistrict+`'/>
          <input type='hidden' id='norw' name='norw' value='`+_udObj.localblock+`'/>
          <input type='hidden' id='nort' name='nort' value='`+_udObj.sublocalblock+`'/>
          <div class='columns'>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
                <span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>
    <div id='familyinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'></p>
          <button class='delete familyinfomodal-close' aria-label='close'></button>
        </header>
        <section id='familyinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-familyinfo-modal-footer'>
          <button class='button is-black familyinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
        </footer>
      </div>
    </div>`;
  return dom;
};
templates._primaryDataRegionalIndividualList = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='datalistform' name='datalistform'>
          <input type='hidden' id='kdprov' name='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' name='kdkab' value='`+_udObj.region+`'/>
          <div class='columns'>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkec' name='kdkec' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Kecamatan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
              </div>
            </div>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
                <span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>
    <div id='individualinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'></p>
          <button class='delete individualinfomodal-close' aria-label='close'></button>
        </header>
        <section id='individualinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-individualinfo-modal-footer'>
          <button class='button is-black individualinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
        </footer>
      </div>
    </div>`;
  return dom;
};
templates._primaryDataDistrictIndividualList = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='datalistform' name='datalistform'>
          <input type='hidden' id='kdprov' name='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' name='kdkab' value='`+_udObj.region+`'/>
          <input type='hidden' id='kdkec' name='kdkec' value='`+_udObj.district+`'/>
          <div class='columns'>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='kdkel' name='kdkel' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih Desa/Kelurahan</option></select>
              </div>
            </div>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
              </div>
            </div>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
                <span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>
    <div id='individualinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'></p>
          <button class='delete individualinfomodal-close' aria-label='close'></button>
        </header>
        <section id='individualinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-individualinfo-modal-footer'>
          <button class='button is-black individualinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
        </footer>
      </div>
    </div>`;
  return dom;
};
templates._primaryDataSubDistrictIndividualList = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='datalistform' name='datalistform'>
          <input type='hidden' id='kdprov' name='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' name='kdkab' value='`+_udObj.region+`'/>
          <input type='hidden' id='kdkec' name='kdkec' value='`+_udObj.district+`'/>
          <input type='hidden' id='kdkel' name='kdkel' value='`+_udObj.subdistrict+`'/>
          <div class='columns'>
            <div class='column'>
              <div class='select is-fullwidth'>
                <select id='norw' name='norw' class='is-radiusless is-fullwidth-mobile'><option value=''>Pilih RW</option></select>
              </div>
            </div>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
                <span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>
    <div id='individualinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'></p>
          <button class='delete individualinfomodal-close' aria-label='close'></button>
        </header>
        <section id='individualinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-individualinfo-modal-footer'>
          <button class='button is-black individualinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
        </footer>
      </div>
    </div>`;
  return dom;
};
templates._primaryDataLocalBlockIndividualList = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='datalistform' name='datalistform'>
          <input type='hidden' id='kdprov' name='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' name='kdkab' value='`+_udObj.region+`'/>
          <input type='hidden' id='kdkec' name='kdkec' value='`+_udObj.district+`'/>
          <input type='hidden' id='kdkel' name='kdkel' value='`+_udObj.subdistrict+`'/>
          <input type='hidden' id='norw' name='norw' value='`+_udObj.localblock+`'/>
          <div class='columns'>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
                <span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>
    <div id='individualinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'></p>
          <button class='delete individualinfomodal-close' aria-label='close'></button>
        </header>
        <section id='individualinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-individualinfo-modal-footer'>
          <button class='button is-black individualinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
        </footer>
      </div>
    </div>`;
  return dom;
};
templates._primaryDataSubLocalBlockIndividualList = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</li>
            <li class='is-active'>
              <a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-user'></i></span>Daftar Data Individu</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <form id='datalistform' name='datalistform'>
          <input type='hidden' id='kdprov' name='kdprov' value='`+_udObj.province+`'/>
          <input type='hidden' id='kdkab' name='kdkab' value='`+_udObj.region+`'/>
          <input type='hidden' id='kdkec' name='kdkec' value='`+_udObj.district+`'/>
          <input type='hidden' id='kdkel' name='kdkel' value='`+_udObj.subdistrict+`'/>
          <input type='hidden' id='norw' name='norw' value='`+_udObj.localblock+`'/>
          <input type='hidden' id='nort' name='nort' value='`+_udObj.sublocalblock+`'/>
          <div class='columns'>
            <div class='column'>
              <button type='submit' class='button is-dark is-radiusless is-fullwidth is-fullwidth-mobile button-sync-data'>
                <span class='icon'><i class='fa fa-database'></i></span><span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'>
        <div class='columns'>
          <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
        </div>
      </div>
    </section>
    <div id='individualinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'></p>
          <button class='delete individualinfomodal-close' aria-label='close'></button>
        </header>
        <section id='individualinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-individualinfo-modal-footer'>
          <button class='button is-black individualinfomodal-close'><i class='fa fa-power-off'></i>&nbsp;Tutup</button>
        </footer>
      </div>
    </div>`;
  return dom;
};
templates._thematicMapContainer = function(){
  let dom = `<section class='section is-paddingless'><div class='container is-paddingless is-fluid is-fullwidth is-full-widescreen'><div id='map' class='map-container'></div></div></section><div id='featureimagedisplay' class='modal'><div class='modal-background'></div><div id='imagecontainer' class='modal-content'></div><button class='delete modal-close is-large' aria-label='close'></button></div>`;
  return dom;
};
templates._digitizeMapContainer = function(){
  let dom = `<section class='section is-paddingless'><div class='container is-paddingless is-fluid is-fullwidth is-full-widescreen'><div id='map' class='map-container'></div></div></section><div id='featureimagedisplay' class='modal'><div class='modal-background'></div><div id='imagecontainer' class='modal-content'></div><button class='delete modal-close is-large' aria-label='close'></button></div>
  <div id='familyselectormodal' class='modal'>
    <div class='modal-background'></div>
    <div class='modal-card'>
      <header class='modal-card-head'>
        <p class='modal-card-title'>Daftar Keluarga Belum Berlokasi</p>
        <button class='delete familyselectormodal-close' aria-label='close'></button>
      </header>
      <section class='modal-card-body'>
        <div class='container has-background-light is-padding-5'>
          <div class='columns'>
            <div id='datatablecontainer' class='column is-12-desktop is-12-mobile'></div>
          </div>
        </div>
      </section>
      <footer class='modal-card-foot custom-familyselector-modal-footer'>
        <input type='hidden' id='coordinates' name='coordinates' value=''/>
        <input type='hidden' id='objectid' name='objectid' value=''/>
        <span id='selecteditemnotification'></span>
        <div class='field has-addons'>
          <button type='button' class='button is-danger familyselectormodal-close'><i class='fa fa-exit'></i>&nbsp;Batalkan</button>
          <button type='button' class='button is-black apply-familyselect-button' disabled><i class='fa fa-floppy-o'></i>&nbsp;Simpan Data</button>
        </div>
      </footer>
    </div>
  </div>`;
  return dom;
};

templates._loginBox = function(){
  let dom = `<section class='hero is-light is-fullwidth is-fullheight'>
    <div class='hero-body'>
      <div class='container has-text-centered'>
        <div class='column is-4 is-offset-4'>
          <h3 class='title has-text-black'>Login</h3>
          <hr class='login-hr'>
          <figure class='avatar' style='margin-bottom:15px;'>
            <img src='./img/lpcr.png'>
          </figure>
          <div class='box is-radiusless'>
            <form id='loginform' name='loginform'>
              <div class='field'>
                <div class='control'>
                  <input name='username' class='input is-large is-radiusless username-field-input' type='text' placeholder='Username' autofocus=''>
                </div>
              </div>
              <div class='field'>
                <div class='control'>
                  <input name='password' class='input is-large is-radiusless password-field-input' type='password' placeholder='Password'>
                </div>
              </div>
              <p id='loginnotice' class='subtitle has-text-black'>Masukkan <span class='is-italic'>username</span> dan <span class='is-italic'>password</span> Anda.</p>
              <button type='submit' class='button is-block is-black is-large is-radiusless is-fullwidth'>Login <i class='fa fa-sign-in' aria-hidden='true'></i></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>`;
  return dom;
};

templates._changeAccessCredentials = function(){
  let _sessionData = sessionStorage.getItem('_userdata');
  let _sessionDataObj = JSON.parse(_sessionData);
  let _token = _sessionDataObj.sessionid;
  let _userid = _sessionDataObj.id;
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-cog'></i></span>Privasi dan Pengaturan</li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-lock'></i></span>Password</a></li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <form id='changepasswordform' name='changepasswordform'>
      <input type='hidden' id='userid' name='userid' value='`+ _userid +`'/>
      <div class='container has-background-light is-padding-5'>
        <p class='has-text-weight-bold is-size-6' style='margin-bottom:10px;'>Ganti/Update Password</p>
        <div class='columns'>
          <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
            <label class='label is-size-6'>Password Anda saat ini</label>
            <div class='field'>
              <div class='control is-expanded'>
                <input id='oldpassword' name='oldpassword' class='input is-radiusless is-fullwidth' type='password' value='`+ _token +`' placeholder='' autocomplete='off' readonly/>
              </div>
            </div>
          </div>
        </div>
        <div class='columns'>
          <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
            <label class='label is-size-6'>Password baru<sup class='has-text-weight-light'>[1]</sup></label>
            <div class='field'>
              <div class='control is-expanded'>
                <input id='newpassword' name='newpassword' class='input is-radiusless is-fullwidth' type='password' placeholder='' autocomplete='off'/>
              </div>
            </div>
            <p id='newpassword_notice' class='help has-text-grey-darker is-italic is-size-6'>[1] Password baru, minimal 5 (lima) karakter, [a-z][A-Z][0-9].</p>
          </div>
        </div>
        <div class='columns'>
          <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
            <label class='label is-size-6'>Konfirmasi password baru<sup class='has-text-weight-light'>[2]</sup></label>
            <div class='field'>
              <div class='control is-expanded'>
                <input id='cnfpassword' name='cnfpassword' class='input is-radiusless is-fullwidth' type='password' placeholder='' autocomplete='off'/>
              </div>
            </div>
            <p id='confirmpassword_notice' class='help has-text-grey-darker is-italic is-size-6'>[2] Konfirmasi password, harus sama dengan password baru.</p>
          </div>
        </div>
        <div class='columns' style='margin-bottom:0.25rem !important;'>
          <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
            <div class='buttons is-right'>
              <button type='submit' class='button is-dark is-radiusless button-process-change-password'>Ganti Password</button>
            </div>
          </div>
        </div>
      </div>
      </form>
      <div id='notice-change-password' class='container is-hidden'>
        <div class='change-password-notification'></div>
      </div>
    </section>`;
  return dom;
};

templates._regionalApplicationHelp = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Petunjuk Pengoperasian</a></li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'></div>
    </section>`;
  return dom;
};

templates._districtApplicationHelp = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Petunjuk Pengoperasian</a></li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'></div>
    </section>`;
  return dom;
};

templates._subDistrictApplicationHelp = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Petunjuk Pengoperasian</a></li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'></div>
    </section>`;
  return dom;
};

templates._localBlockApplicationHelp = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Petunjuk Pengoperasian</a></li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'></div>
    </section>`;
  return dom;
};

templates._subLocalBlockApplicationHelp = function(){
  let _udString = sessionStorage.getItem('_userdata');
  let _udObj = JSON.parse(_udString);
  let dom = `<section class='section section-breadcrumb-top'>
      <div class='container has-background-light is-padding-5'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Petunjuk Pengoperasian</a></li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section is-containing-datatable'>
      <div class='container has-background-light is-padding-5'></div>
    </section>`;
  return dom;
};

export default templates;