import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import resumeRouter from './routes/resumeRoute.js'
dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 6002

app.get('/', (req, res) => {
    res.send("Resume Service Started")
})

app.use('/', resumeRouter)


app.listen(PORT, () => {
    console.log(`Resume Service started on ${PORT}`)
    connectDB()
})