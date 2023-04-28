const express = require('express')
const routes = express.Router()

//Obtener todas las compras
routes.get('/historial', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM historial', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

//Ingresar un producto al historial
routes.post('/historial', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO historial set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto registrado!')
        })
    })
})

//Borrar un producto del historial
routes.delete('/historial/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('DELETE FROM historial WHERE idhistorial = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto eliminado!')
        })
    })
})


//Actualizar un producto del historial
routes.put('/historial/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE historial set ? WHERE idhistorial = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto actualizado!')
        })
    })
})

module.exports = routes