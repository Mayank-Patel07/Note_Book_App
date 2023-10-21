console.log("Hello from Server")

const express = require('express')
var cors = require('cors')
const connectDB = require("./connectDB")
const app = express()
require("dotenv").config()
const port = 3000
connectDB()

app.use(cors())

// It is recommended to get a data from a request body.
app.use(express.json())



app.get('/', (req, res) => {
    res.send('hello world')
})

// Routes
app.use("/api/auth", require("./Routes/auth"))
app.use("/api/notes", require("./Routes/notes"))

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})

