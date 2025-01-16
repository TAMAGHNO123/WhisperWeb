import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from '../routes/auth.route.js'
import messageRoutes from '../routes/message.route.js'
import { app, server } from '../lib/socket.js'
import { connectDB } from '../lib/db.js'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDB()
})