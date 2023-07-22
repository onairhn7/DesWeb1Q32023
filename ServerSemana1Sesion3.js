var http = require('http');
var fs = require('fs');
var url = require('url');
var saludo = require('./saludo');

http.createServer( (req,res)=>{

    
    var dataUrl = url.parse(req.url, true); // Es un arreglo {host, pathname, search, query}
    var datoParametros = dataUrl.query;

    //http://localhost:8080/default.htm?year=2017&month=february
    // host : localhost
    // pathname : /default.html
    // query : {  year = 2017, month = february }
    

    // Ejemplo de Ruteos

    /*
    fs.readFile(
        "." + dataUrl.pathname, 
        (err, data)=>{

            if(err){

                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");

            }

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end( data );
        }

    );*/

    /* Ejemplo para leer parametros */

    /*
    let a = parseFloat(datoParametros.num1);
    let b =  parseFloat(datoParametros.num2);   
    var suma = saludo.Sumar(  a , b );
    res.end(suma.toString());

    */

    /* Ejemplo avanzado de rutas */

    let resultado = 0;

    console.log( "pathname : "+ dataUrl.pathname);
    console.log( "path : " +dataUrl.path);

    switch (dataUrl.pathname){

        case "/suma":
            resultado = parseFloat(datoParametros.num1) + parseFloat( datoParametros.num2);
            break;
        case "/resta":
            resultado  = parseFloat(datoParametros.num1) - parseFloat( datoParametros.num2);
            break;
        case "/division":
            resultado  = parseFloat(datoParametros.num1) / parseFloat( datoParametros.num2);
            break;
        case "/multiplicacion":
            resultado  = parseFloat(datoParametros.num1) * parseFloat( datoParametros.num2);
            break;
        default:
            break;

    }
    
    res.end(resultado.toString());

}).listen(3000);