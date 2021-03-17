const express = require('express')

const jwt = require('jsonwebtoken')
const authSecret = require('../auth.json')

module.exports = function UserAuthParams(req, res, next) {
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(400).json({errBackend: 'Token invalido'})
    }
    
    const token = authorization.replace('Bearer', '').trim()

    try {

      const data = jwt.verify(token, authSecret.secret)

     //console.log(data)

        const {_id} = data

        // Validar o params :id para o usuario acessar só o dele
        
        if(_id == req.params._id || _id == req.query._id) {

        req.userId = _id

        return next()
        }

        else {
            res.status(401).send('Sem autorização!, Token Inválido!')
        }
        

       
   
        
    }
    catch(err) {
    console.log(err)
    
    }

    
}