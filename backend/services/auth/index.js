import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './configs/db.js'
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 6001

app.get('/', (req, res) => {
    res.send("Auth Service Started")
})

app.use('/', authRouter)


app.listen(PORT, () => {
    console.log(`Auth Service started on ${PORT}`)
    connectDB()
})