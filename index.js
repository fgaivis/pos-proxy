var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqalabs-integration-pos-facade-1.0/api-rest'}).listen(4040);
