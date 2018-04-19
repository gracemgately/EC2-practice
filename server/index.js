const createApp = () => {

    var AWS = require('aws-sdk')
    var express = require('express')
    var app = express()
    var bodyParser = require('body-parser')
    var port = process.env.PORT || 3000;
    var path = require('path')

    AWS.config.region = process.env.REGION

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    //Routes
    app.get('/here', (req, res) => {
        res.json('An API route')
    })

    //Static file serve
    app.use(express.static(path.join(__dirname, '..' , 'public')))
    
    //Serving index file
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..' ,'public/index.html'))
      })

    //Error-handling
    app.use((err, req, res, next) => {
        console.error(err)
        console.error(err.stack)
        res.status(err.status || 500).send(err.message || 'Internal server error.')
      })

    var server = app.listen(port, () => {
        console.log('Server running at:' + port)
    });

}

createApp()
