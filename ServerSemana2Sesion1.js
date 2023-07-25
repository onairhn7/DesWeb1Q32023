const express = require('express');
const app = express();

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


app.listen(3000);