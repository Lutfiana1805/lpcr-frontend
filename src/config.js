/*
 * isProduction set to: trulogix-geoweb-engine | datarelay/lpcr-frontend
 * isProduction set to: .. / trulogix-geoweb-engine | http://x.x.x.x / geodata
 * fileUploadEndPointBaseURL = http://x.x.x.x | ..
 * */
/* -- development/staging config -- */
var config = {
  "isProduction": true, 
  "documentTitle": "LPCR Dashboard", 
  "appTitle": "LPCR Dashboard", 
  "endPointBaseURL": "..", 
  "endPointBaseDirectory": "/dataservices", 
  "fileUploadEndPointBaseURL": "..", 
  "fileUploadEndPointBaseDirectoryTarget": "/dataservices", 
  "geodataEndPointBaseURL": "..", 
  "geodataEndPointBaseDirectory": "/dataservices", 
  "initialHash": "dde48c17af89002bce4810ffe7bb2309ba2c10da", 
  "frontpageRefreshTimeout": 1800000, 
  "dashboardRefreshTimeout": 1800000, 
  "applicationRefreshTimeout": 1000 * 60 * 30
};
/* -- production config -- */
/* var config = {
  "isProduction": true, 
  "documentTitle": "LPCR Dashboard", 
  "appTitle": "LPCR Dashboard", 
  "endPointBaseURL": "..", 
  "endPointBaseDirectory": "/dataservices", 
  "fileUploadEndPointBaseURL": "..", 
  "fileUploadEndPointBaseDirectoryTarget": "/dataservices", 
  "geodataEndPointBaseURL": "..", 
  "geodataEndPointBaseDirectory": "/dataservices", 
  "initialHash": "dde48c17af89002bce4810ffe7bb2309ba2c10da", 
  "frontpageRefreshTimeout": 1800000, 
  "dashboardRefreshTimeout": 1800000, 
  "applicationRefreshTimeout": 1000 * 60 * 30
}; */

export default config;