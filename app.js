require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const mainRoute = require('./routes/main')

app.use(express.json())
app.use(express.static('./public'))


app.use('/api/v1',mainRoute)




app.use(notFound)
app.use(errorHandler)



const port = process.env.PORT || 3000

const start = async()=>{
    try {
        app.listen(port, console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
