var http = require('http');
var saludo = require('./saludo');

http.createServer( (req,res)=>{

    res.writeHead(200, {'Content-Type': 'text/html'});
    //var resultado = saludo.Saludar( "Fernando" );
    var resultado = saludo.Sumar(5, 10);
    res.end( resultado.toString() );

}).listen(3000);