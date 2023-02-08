import express from 'express'
import router from './routes/products.routes.js'


const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)



app.listen(PORT, () => {
    console.log(`Server online on port: ${PORT}`)
})