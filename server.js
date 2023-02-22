const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const routes = require('./routes')

const app = express()
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
app.use(express.json())

//Rutas
app.get('/', (req, res)=>{
    res.send('API funcionando')
})
app.use('/api', routes)

//Servidor corriendo
app.listen(app.get('port'), ()=>{
    console.log('servidor corriendo', app.get('port'))
})