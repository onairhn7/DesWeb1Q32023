const express = require('express');
const app = express();
const db = require('./db/conn');

app.use(express.json());

var arreglo = new Array();

// Imaginar un api de Animalitos 

// post  (Crear Animales)
// put (Actualizar Animales)
// get (retornar animales) select * from 
// delete (borrar animales)


app.post('/api/animales', (req, res)=>{


    let tmpAnimal = {

        nombre : req.body.nombre, 
        sonido : req.body.sonido

    };


    arreglo.push(tmpAnimal);
    console.log( JSON.stringify(arreglo) );

    res.json(tmpAnimal);

});

app.get('/api/animales', (req, res)=>{



    res.json(arreglo);



});


app.post('/api/persona', (req, res)=>{

    let datos = [ 

        req.body.nombre, 
        req.body.apodo

    ];

    let sql = ` insert into tbl_persona 
                (nombre, apodo)
                values
                ($1, $2) returning id 
                `;

    db.one(sql,datos, event => event.id)
    .then ( data =>{

        const objetoCreado = {  

            id : data, 
            nombre : datos[0], 
            apodo : datos[1]

        }

        res.json(objetoCreado);

    })
    .catch ( (error) =>{

        res.json(error);

    });
    


});

app.get('/api/persona', (req, res)=>{


    let sql = "select * from tbl_persona";


    db.any( sql , e => e.id )
    .then ( rows =>{

        res.json(rows);
    
    } )
    .catch ( (error)=>{

        res.json(error);

    });


});


app.listen(3000);