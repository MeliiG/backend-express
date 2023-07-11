const express = require ('express');
const app = express();

const {infoCursos} = require('./cursos');//

//routing
app.get('/',(req,res)=>{
 res.send('Mi servidor de cursos 💻😊');
});

app.get('/api/cursos',(req,res)=>{
    res.send(JSON.stringify(infoCursos));
});

app.get('/api/cursos/programacion',(req,res)=>{
    res.send(JSON.stringify(infoCursos.programacion));
});


//Programación
app.get('/api/cursos/programacion/:lenguaje',(req,res)=>{
    const lenguaje = req.params.lenguaje;
    const resultados = infoCursos.programacion.filter(curso=> curso.lenguaje === lenguaje);
    

    if(resultados.length === 0){
        return res.status(404).send(`No se encontro cursos de ${lenguaje}`);
    }
    res.send(JSON.stringify(resultados));
});


app.get('/api/cursos/programacion/:lenguaje/:nivel',(req,res)=>{
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados = infoCursos.programacion.filter(curso=>curso.lenguaje === lenguaje && curso.nivel === nivel);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron curso de ${lenguaje} de nivel ${nivel}`)
    }

    res.send(JSON.stringify(resultados));
})


//Matematicas

app.get('/api/cursos/matematicas',(req,res)=>{
    res.send(JSON.stringify(infoCursos.Matematicas));
});

app.get('/api/cursos/matematicas/:tema',(req,res)=>{
    const tema= req.params.tema;
    const resultados=infoCursos.Matematicas.filter(curso=>curso.tema === tema);

    if(resultados.length === 0){
        return res.status(404).send(`No se encontro cursos de ${tema}`);
    }
    res.send(JSON.stringify(resultados));

});



const puerto = process.env.PORT || 3000;
app.listen(puerto,()=>{
    console.log(`El servidor esta escuchando en el puerto ${puerto}...`);
});