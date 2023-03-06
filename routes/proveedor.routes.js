const express = require('express')
const routes = express.Router()

//Obtener todos los proveedores
routes.get('/proveedor', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM proveedor', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

//Ingresar un proveedor
routes.post('/proveedor', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO proveedor set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Proveedor registrado!')
        })
    })
})

//Borrar un proveedor
routes.delete('/proveedor/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('DELETE FROM proveedor WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Provedor eliminado!')
        })
    })
})

//Actualizar un proveedor
routes.put('/proveedor/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE proveedor set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('proveedor actualizado!')
        })
    })
})

module.exports = routes