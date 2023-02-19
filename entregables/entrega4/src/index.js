import express from 'express'
import router from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import __dirname from './path.js'
import { engine } from 'express-handlebars' // engine es una función que recibe un objeto con las opciones de configuración
import * as path from 'path'
import { Server } from 'socket.io'
import { ProductManager } from './controllers/prodmanager.js'



const app = express()
const PORT = 4000
const server = app.listen(PORT, () => {
    console.log(`Server online on port: ${PORT}`)
})

const prodSocket = new ProductManager()

const io = new Server(server)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", engine(
    {
        layoutsDir: path.resolve(__dirname, "./views/layouts"),
        defaultLayout: "main.handlebars"
    }
))
app.set("view engine", "handlebars") // seteo el motor de plantillas
//app.set("views", __dirname + "/views") // anda
app.set("views", path.resolve(__dirname, "./views")) // seteo la carpeta donde están las plantillas


io.on('connection', (socket) => { // aca tendria que recibir el productos
    console.log('New client connected: ', socket.id)

    // socket.on('message', (data) => {
    //     console.log(data)
    //     })

    // socket.emit('message2', 'Hello from server')

    socket.on('disconnect', (socket) => {
        console.log('Client disconnected: ', socket.id)
    
    })

    socket.on('add-product', (product) => {
        prodSocket.addProduct(  product.title,
                                product.description,
                                product.price,
                                product.code,
                                product.stock,
                                product.status,
                                product.category,
                                product.thumbnail)
        io.emit('add-product', product)
    })


    socket.on('delete-product', async (product) => {
        const deleted = await prodSocket.deleteProducts(product.id)
        if (deleted) {
            io.emit('delete-product', product)
        } else {
            console.log('No se pudo eliminar el producto')
        }
        io.emit('delete-product', product)
    })
})





// routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api', router)
app.use('/api', routerCart)




app.get('/static/realtime', async (req, res) => {
    const allProducts = await prodSocket.getProducts()

    res.render('realTimeProducts', { 
        products: allProducts,
        productsStringify: JSON.stringify(allProducts)

    })
})



