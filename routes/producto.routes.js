const express = require('express')
const routes = express.Router()

//Obtener todos los productos
routes.get('/producto', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM producto', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

//Ingresar un producto
routes.post('/producto', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO producto set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto registrado!')
        })
    })
})

//Borrar un producto
routes.delete('/producto/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('DELETE FROM producto WHERE idproducto = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto eliminado!')
        })
    })
})


//Actualizar un producto
routes.put('/producto/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE producto set ? WHERE idproducto = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto actualizado!')
        })
    })
})

module.exports = routes