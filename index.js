// Importing Libraries
const express = require("express")

// Initializing App
const app = express()

// Setting the PORT
const PORT = "8080"

app.get("/", (req,res) => {
    res.send("Running JWT App")
})

app.listen(PORT, () => 
                    console.log(`Server is up an running at ${PORT}`)
)

const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")

// Impout Routes
const authRoute = require("./route/auth")

// Accessing the Environment Variables
dotenv.config()

// Connecting the database

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true})
.then(() => {
    console.log('Database Connected')
}).catch(err => console.log(err))
// Middlewares 
app.use(express.json(),cors())

// Route Middleware
app.use("/api/users",authRoute)