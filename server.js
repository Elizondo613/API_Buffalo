const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const ProductoRoutes = require('./routes/producto.routes')
const cors = require('cors')

const app = express()

//Puerto y conección con db
app.set('port', process.env.PORT || 4000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'abc123',
    database: 'buffalo'
}

//Middlewares
app.use(myconn(mysql, dbOptions, 'single'))
app.use(cors())
app.use(express.json())

app.post("/user/login", (req, res)=>{
    const usuario = req.body.usuario;
    const clave = req.body.clave;

    if(usuario=='admin' && clave=='admin123'){
        const datos = {
            id: "123",
            nombre: "Admin 1",
            email: "admin123@gmail.com"
        }
    }else{
        res.status(400).send("Credenciales incorrectas")
    }
})

//Rutas
app.get('/', (req, res)=>{
    res.send('API funcionando')
})

app.use('/api', ProductoRoutes)

//Servidor corriendo
app.listen(app.get('port'), ()=>{
    console.log('servidor corriendo', app.get('port'))
})