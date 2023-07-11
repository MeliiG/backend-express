const express = require ('express');

const {matematicas} = require('../datos/cursos').infoCursos;//

const routerMatematicas = express.Router();

routerMatematicas.use(express.json());
//Matematicas
routerMatematicas.get('/',(req,res)=>{
    res.send(JSON.stringify(matematicas));
});

routerMatematicas.get('/:tema',(req,res)=>{
    const tema= req.params.tema;
    const resultados = matematicas.filter(curso=>curso.tema === tema);

    if(resultados.length === 0){
        return res.status(404).send(`No se encontro cursos de ${tema}`);
    }
    res.send(JSON.stringify(resultados));

});

routerMatematicas.post('/', (req, res) => {
    let cursoNuevo = req.body;
    matematicas.push(cursoNuevo);
    res.json(matematicas);
  });

module.exports = routerMatematicas