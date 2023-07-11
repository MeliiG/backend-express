const express = require ('express');
const app = express();

const {infoCursos} = require('./datos/cursos');//

//Routers

const routerProgramacion = require('./routers/programacion')
app.use('/api/cursos/programacion',routerProgramacion);

const routerMatematicas = require('./routers/matematicas')
app.use('/api/cursos/matematicas',routerMatematicas);


//routing
app.get('/',(req,res)=>{
 res.send('Mi servidor de cursos 💻😊');
});

app.get('/api/cursos',(req,res)=>{
    res.send(JSON.stringify(infoCursos));
});


const puerto = process.env.PORT || 3000;
app.listen(puerto,()=>{
    console.log(`El servidor esta escuchando en el puerto ${puerto}...`);
});