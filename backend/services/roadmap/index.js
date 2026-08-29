import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectDB } from './configs/db.js'
import roadmapRouter from './routes/roadmapRoute.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 6004

app.use("/", roadmapRouter)


app.listen(PORT, () => {
    console.log(`Roadmap Service started on ${PORT}`)
    connectDB()
})