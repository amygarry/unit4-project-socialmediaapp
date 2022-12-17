//allows you to access information from your .env file
require('dotenv').config()
//has to do with json tokens.. not entirely sure what it does 
const jwt = require('jsonwebtoken')
//this gets our secret variable from the .env
const {SECRET} = process.env

//all of the follwoing is a function that can and eill be exported elsewhere 
module.exports = {
    //function takes in 3 parameters 
    isAuthenticated: (req, res, next) => {
        //sets the variable headerToken to the req.get autherization
        const headerToken = req.get('Authorization')
        //if the header token is not true or valid send a message in the console that says errrr in middle ware 
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }
        //define a variable for later 
        let token
        //somehow this is verifying the token with yoru secret variable 
        try {
            token = jwt.verify(headerToken, SECRET)
        } 
        //if it doesn't work get this err
        catch (err) {
            err.statusCode = 500
            throw err
        }
        //if the token is invalid send the message not authenticated 
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }
        //if it is then go to the next function 
        next()
    }
}

