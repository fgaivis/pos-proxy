var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
//httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqalabs-integration-pos-facade-1.0/api-rest'}).listen(4040);
//var proxy = httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqalabs-integration-pos-facade-1.0/api-rest'});
//var proxy = httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqapos/api-rest'});
//var proxy = httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqapossec'});

var proxy = httpProxy.createProxyServer({target:'http://prime.mqa-labs.com:8080/mqapos/api-rest'});

proxy.on('proxyReq', function (proxyReq, req, res) {
    if(JSON.stringify(req.headers.origin) !== '"http://localhost:3000"') {
    	proxyReq.setHeader('Origin', 'localhost:4040');
    }

    if(JSON.stringify(req.headers.origin) === '"http://localhost:3000"' && JSON.stringify(req.headers.referer) === '"http://localhost:3000/login"') {
      if(req.method === 'OPTIONS'){
        var encrypted = new Buffer('mqaposclient:teamHybris2016').toString('base64')
        proxyReq.setHeader('Authorization', 'Basic ' + encrypted);
      }
    }
});

proxy.on('proxyRes', function (proxyRes, req, res) {
    if(JSON.stringify(req.headers.origin) === '"http://localhost:3000"') {
      if(req.method === 'OPTIONS'){
        res.oldWriteHead = res.writeHead;
        res.writeHead = function(statusCode, headers) {
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
          res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
          res.oldWriteHead(200, headers);
        }
        /*console.log('Preflight successfully proxied');*/
      } /*else {
        //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        //res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
        //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
        //console.log('Actual Request successfully proxied');
      }*/
    }
});

proxy.on('error', function (err, req, res) {
    console.log('An Error Ocurred...');
});

proxy.on('close', function (res, socket, head) {
    console.log('Client disconnected');
});

proxy.listen(4040);
