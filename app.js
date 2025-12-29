const express = require('express')
require('dotenv').config()
const userRoute = require('./routes/userRoutes')
const appointmentRoute = require('./routes/appointmentRoute')

const {testConnection} = require('./config/db')
testConnection()


const app = express()
const port = process.env.PORT || 7000

app.use(express.json())
// app.use(cors())

app.use('/api/user', userRoute)
app.use('/api/appointment', appointmentRoute)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// {"name":"Admin", "email":"admin@gmail.com","password":"admin", "contactNumber":"9876543210","address":"Pune"}