import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import billingRouter from './routes/billingRoute.js'
dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 6005

app.get('/', (req, res) => {
    res.send("Billing Service Started")
})

app.use("/", billingRouter)

app.listen(PORT, () => {
    console.log(`Billing Service started on ${PORT}`)
    connectDB()
})