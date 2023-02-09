import { Router } from 'express'
import { CartManager } from '../controllers/cartmanager.js'

const cartmanager = new CartManager()
const routerCart = Router()

routerCart.post('/carts', async (req, res) => {
    //console.log(req.body)       // esto debe pushearse a un array
    cartmanager.addProduct(req.body.products)
    res.send('ok')
})

routerCart.get('/carts/:cid', async (req, res) => {
    const productsByCid = await cartmanager.getCartById(parseInt(req.params.cid))
    res.send(productsByCid)
})

export default routerCart