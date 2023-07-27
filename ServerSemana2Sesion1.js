const express = require('express');
const app = express();
const db = require('./db/conn');

app.use(express.json());



// Imaginar un api de Animalitos 

// post  (Crear Animales)
// put (Actualizar Animales)
// get (retornar animales) select * from 
// delete (borrar animales)


app.post('/api/persona', (req, res) => {

    let datos = [

        req.body.nombre,
        req.body.apodo

    ];

    let sql = ` insert into tbl_persona 
                (nombre, apodo)
                values
                ($1, $2) returning id 
                `;

    db.one(sql, datos, event => event.id)
        .then(data => {

            const objetoCreado = {

                id: data,
                nombre: datos[0],
                apodo: datos[1]

            }

            res.json(objetoCreado);

        })
        .catch((error) => {

            res.json(error);

        });



});

app.get('/api/persona', (req, res) => {


    let sql = "select * from tbl_persona where activo = true";


    db.any(sql, e => e.id)
        .then(rows => {

            res.json(rows);

        })
        .catch((error) => {

            res.json(error);

        });


});


app.put('/api/persona/:id', (req, res) => {


    const parametros = [

        req.body.nombre,
        req.body.apodo,
        req.params.id

    ];

    let sql = ` update tbl_persona 
                set nombre =  $1, 
                    apodo = $2
                where id = $3 `;

    db.result(sql, parametros, r => r.rowCount)
        .then(data => {

            const objetoModificado = {  id : req.params.id, 
                                        nombre : req.body.nombre, 
                                        apodo : req.body.apodo  };
            
            res.json(objetoModificado);

        })
        .catch((error) => {
            res.json(error);
        });


});

app.delete('/api/persona/:id', (req, res) => {


    let sql = ` update tbl_persona 
                set activo = false , 
                    fecha_borrar = current_timestamp 
                where id = $1 `;

    db.result(sql, [req.params.id] ,   r => r.rowCount)
        .then(data => {

            const objetoBorrado     = {  id : req.params.id, 
                                        activo : false   };
            
            res.json(objetoBorrado);

        })
        .catch((error) => {
            res.json(error);
        });


});


app.listen(3000);