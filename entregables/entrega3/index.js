
import express from 'express'
import { ProductManager } from './prodmanager.js'

const app = express()
const PORT = 4000
const productos = new ProductManager();


app.get('/products', async (req, res) => {
    res.send(productos.getProducts())
})

app.listen(PORT, () => {
    console.log(`Server online on port: ${PORT}`)
})