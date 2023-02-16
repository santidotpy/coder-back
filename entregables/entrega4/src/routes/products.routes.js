import { Router } from 'express'
import { ProductManager } from '../controllers/prodmanager.js'

const prodmanager = new ProductManager()
const router = Router()

router.get('/products', async (req, res) => {
    const allProducts = await prodmanager.getProducts()
    let limite = parseInt(req.query.limit)
    if(limite){
        let products = []
        for (let key in allProducts) {
            if(key < limite){
                products.push(allProducts[key])
        }
    }
    res.send(products)
    } else{
        res.send(allProducts)
    }
})

router.get('/hbs/products', async (req, res) => {
    const allProducts = await prodmanager.getProducts()
    res.render('home', { 
        title: 'Products',
        products: allProducts,
        productsStringify: JSON.stringify(allProducts)
        //products: JSON.stringify(allProducts)
    })
})

// router.get('/hbs/realtimeproducts', async (req, res) => {
// })

router.get('/products/:id', async (req, res) => {
    const productsById = await prodmanager.getProductsById(parseInt(req.params.id))
    res.send(productsById)
})

router.post('/products', async (req, res) => {
    //console.log(req.body)       // esto debe pushearse a un array
    prodmanager.addProduct( req.body.title,
                            req.body.description,
                            req.body.price,
                            req.body.code,
                            req.body.stock,
                            req.body.status,
                            req.body.category,
                            req.body.thumbnail)
    res.send('ok')
})

router.put('/products', async (req, res) => {
    //console.log(req.body)       // esto debe pushearse a un array
    const updateProduct = await prodmanager.updateProduct({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        code: req.body.code,
        stock: req.body.stock,
        status: req.body.status,
        category: req.body.category,
        thumbnail: req.body.thumbnail,
        id: req.body.id
    })
    if (updateProduct){
        res.send('Product successfully modified')
    } else {
        res.send('Something went wrong')
    }
})

router.delete('/products/:id', async (req, res) => {
    //let id = parseInt(req.params.id)
    const productDeleted = await prodmanager.deleteProducts(parseInt(req.params.id))
    if (productDeleted) {
        res.send('Product successfully deleted')
    } else {
        res.send('Something went wrong')
    }
})

export default router