import { Router } from 'express'
import { CartManager } from '../controllers/cartmanager.js'

const cartmanager = new CartManager()
const routerCart = Router()

routerCart.post('/carts', async (req, res) => {
    //console.log(req.body)       // esto debe pushearse a un array
    cartmanager.addProduct(req.body.products)
    res.send('ok')
})

export default routerCart