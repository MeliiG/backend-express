const express = require ('express');


const {programacion} = require('../datos/cursos').infoCursos;//

const routerProgramacion = express.Router();

//Middleware
routerProgramacion.use(express.json());

//Programación
routerProgramacion.get('/',(req,res)=>{
    res.send(JSON.stringify(programacion));
});


routerProgramacion.get('/:lenguaje',(req,res)=>{
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(curso=> curso.lenguaje === lenguaje);
    

    if(resultados.length === 0){
        return res.status(404).send(`No se encontro cursos de ${lenguaje}.`);
    }

    if(req.query.ordenar === 'vistas'){
        return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)));
    }

    res.send(JSON.stringify(resultados));
});


routerProgramacion.get('/:lenguaje/:nivel',(req,res)=>{
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados = programacion.filter(curso=>curso.lenguaje === lenguaje && curso.nivel === nivel);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron curso de ${lenguaje} de nivel ${nivel}`)
    }

    res.send(JSON.stringify(resultados));
});
/--------------------------------------------------------------------------/
routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.json(programacion);
  });
  
  routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
  
    const indice = programacion.findIndex(curso => curso.id == id);
  
    if (indice >= 0) {
      programacion[indice] = cursoActualizado;
    }
    res.json(programacion);
  });
  
  routerProgramacion.patch('/:id', (req, res) => {
    const infoNueva = req.body;
    const id = req.params.id;
  
    const indice = programacion.findIndex(curso => curso.id == id);
  
    if (indice >= 0) {
      const cursoAModificar = programacion[indice];
      Object.assign(cursoAModificar, infoNueva);
    }
    res.json(programacion);
  });
  
  routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
  
    if (indice >= 0) {
      programacion.splice(indice, 1);
    }
    res.json(programacion);
  });

module.exports = routerProgramacion;