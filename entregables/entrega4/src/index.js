import express from 'express'
import router from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import __dirname from './path.js'
import { engine } from 'express-handlebars' // engine es una función que recibe un objeto con las opciones de configuración
import * as path from 'path'
import { Server } from 'socket.io'



const app = express()
const PORT = 4000
const server = app.listen(PORT, () => {
    console.log(`Server online on port: ${PORT}`)
})

const io = new Server(server)

io.on('connection', (socket) => {
    console.log('New client connected')
    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", engine())
app.set("view engine", "handlebars") // seteo el motor de plantillas
//app.set("views", __dirname + "/views") // anda
app.set("views", path.resolve(__dirname, "./views")) // seteo la carpeta donde están las plantillas


// routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api', router)
app.use('/api', routerCart)

// app.get('/static', (req, res) => {
//     res.render('home', { 
//         title: 'This is home title',
//         message: 'This is home message'
//     })
// })



