var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
//httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqalabs-integration-pos-facade-1.0/api-rest'}).listen(4040);
//var proxy = httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqalabs-integration-pos-facade-1.0/api-rest'});
//var proxy = httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqapos/api-rest'});
//var proxy = httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqapossec'});

function processWebRequest(req, res) {
  console.log("On Function");
  /*res.writeHead(200, {'Access-Control-Allow-Origin': 'http://localhost:3000', 
                            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
                            'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding'});
  res.end();*/
}

var proxy = httpProxy.createProxyServer({});
var server = http.createServer(function(req, res) {
  proxy.web(req, res, {
      target: 'http://elchiguirebipolar.com'
    }, processWebRequest(req, res));
});
console.log("listening on port 4040")
server.listen(4040);
