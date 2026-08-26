import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectDB } from './configs/db.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 6004

app.get('/', (req, res) => {
    res.send("Interview Roadmap Started")
})


app.listen(PORT, () => {
    console.log(`Roadmap Service started on ${PORT}`)
    connectDB()
})