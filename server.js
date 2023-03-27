const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const ProductoRoutes = require('./routes/producto.routes')
const ProveedorRoutes = require('./routes/proveedor.routes')
const cors = require('cors')
const jwt = require('jsonwebtoken')

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

//Autenticación
const TOKEN_KEY = "x4TvnErxRETbVcqaLl5dqMI115eNlp5y";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);
    if(token==null)
        return res.status(401).send("Token requerido");
    jwt.verify(token, TOKEN_KEY, (err, user)=>{
        if(err) return res.status(403).send("Token invalido");
        console.log(user);
        req.user = user;
        next();
    });
}

app.post("/user/login", (req, res)=>{
    const usuario = req.body.usuario;
    const clave = req.body.clave;

    if(usuario=='admin' && clave=='admin123'){
        const datos = {
            id: "123",
            nombre: "Admin 1",
            email: "admin123@gmail.com"
        }
        const token = jwt.sign(
            {userId:datos.id, email:datos.email},
            TOKEN_KEY,
            {expiresIn: "3h"}
        )
        let nDatos = {...datos, token};
        res.status(200).json(nDatos);
    }else{
        res.status(400).send("Credenciales incorrectas")
    }
})

//Verificar el token para dar acceso: verifyToken 
//Rutas
app.get('/', (req, res)=>{
    res.send('API funcionando')
})

app.use('/api', ProductoRoutes)
app.use('/api', ProveedorRoutes)

//Servidor corriendo
app.listen(app.get('port'), ()=>{
    console.log('servidor corriendo', app.get('port'))
})