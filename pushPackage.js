var fs = require('fs'),
pushLib = require('safari-push-notifications');

var cert = fs.readFileSync('cert.pem'),
key = fs.readFileSync('key.pem'),
  intermediate = fs.readFileSync('intermediate.crt'),
  websiteJson = pushLib.websiteJSON(
      'My Site', // websiteName
      'web.com.mysite.news', // websitePushID
['http://push.mysite.com'], // allowedDomains
'http://mysite.com/news?id=%@', // urlFormatString
, // authenticationToken (zeroFilled to fit 16 chars)
'https://' + baseUrl + '/push' // webServiceURL (Must be https!)
);
pushLib.generatePackage(
websiteJson, // The object from before / your own website.json object
path.join('assets', 'safari_assets'), // Folder containing the iconset
cert, // Certificate
key, // Private Key
intermediate // Intermediate certificate
)
  .pipe(fs.createWriteStream('pushPackage.zip'))
  .on('finish', function () {
      console.log('pushPackage.zip is ready.');
  });