var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
//httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqalabs-integration-pos-facade-1.0/api-rest'}).listen(4040);

var proxy = httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqalabs-integration-pos-facade-1.0/api-rest'});
proxy.on('proxyReq', function (proxyReq, req, res) {
  if(JSON.stringify(req.headers.origin) !== '"http://localhost:3000"') {
  	proxyReq.setHeader('Origin', 'localhost:4040');
  }
});
proxy.listen(4040);

//
// Modifying Headers to the RESPONSE.
//
/*
var proxy = httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqalabs-integration-pos-facade-1.0/api-rest'});
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Expose-Headers', 'Access-Control-Allow-Origin,Access-Control-Allow-Credentials');
  res.setHeader('Content-Type', 'application/json');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, DELETE, OPTIONS, CONNECT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
});
proxy.listen(4040);
*/
