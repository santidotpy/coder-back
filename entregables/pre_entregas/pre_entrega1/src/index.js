import express from 'express'
import router from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'

const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use('/api', routerCart)



app.listen(PORT, () => {
    console.log(`Server online on port: ${PORT}`)
})