const express = require('express')
const cors = require('cors')
const jwtCheck = require('./middleware/jwtCheck')
const checkPermissions = require('./middleware/checkPermissions')

var jwtAuthz = require('express-jwt-authz');
const axios = require('axios')

const app = express()

app.use(cors())

app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello from index route")
})

//app.use(jwtCheck)

app.get('/protected', jwtCheck, async (req, res) => {
    // the user obj will attach automatically by jwtCheck
    //res.send(req.user) // contains payload settings

    // call the special Auth0 server api to verify and retrieve the user info
    try {
        // retrieve access token from req header
        const accessToken = req.headers.authorization.split(' ')[1]
        const response = await axios.get('https://dev-tndjgd-8.us.auth0.com/userinfo', {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        const userInfo = response.data
        console.log(userInfo)

        res.send(userInfo)
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/protectedwithperm', jwtCheck, checkPermissions, async (req, res) => {
    res.send("You have the right permission")
})

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res) => {
    const status = error.status || 5000
    const message = error.message || 'Internal Server Error'

    res.status(status).send(message)
})

app.listen(4000, () =>
    console.log("Server running on port 4000"))