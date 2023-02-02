
import express from 'express'
import { ProductManager } from './prodmanager.js'

const app = express()
const PORT = 4000
const productos = new ProductManager();


app.get('/products', async (req, res) => {
    const allProducts = await productos.getProducts()
    let limite = parseInt(req.query.limit)
    if(limite){
        console.log(`Displaying ${limite} products`)
        for (let key in allProducts) {
            if(key < limite){
            console.log(allProducts[key]);
            }
        }
    } else{
        console.log('All products: ', allProducts)
        res.send(productos.getProducts())
    }
})

app.get('/products/:id', async (req, res) => {
    console.log(`Producto con id: ${req.params.id}`)
    res.send(productos.getProductsById(parseInt(req.params.id)))
})

app.listen(PORT, () => {
    console.log(`Server online on port: ${PORT}`)
})