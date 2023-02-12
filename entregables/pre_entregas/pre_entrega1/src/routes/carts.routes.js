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

routerCart.post('/carts/:cid/product/:pid', async (req, res) => {
    // tomo el id de la url
    /*  enviando esto por la request
        {
		    "id": 0,
		    "quantity": 1
        }
        */ 

    const cart = req.body
    res.send(await cartmanager.addProductToCartById(cart,
                                                    parseInt(req.params.cid),
                                                    parseInt(req.params.pid)))
    
})

export default routerCart