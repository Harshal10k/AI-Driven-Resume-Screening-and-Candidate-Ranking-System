import express, { json } from 'express'
import { config } from 'dotenv'
import connectDB from './config/db.js'

config()
connectDB()

const app = express()
app.use(json())

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})