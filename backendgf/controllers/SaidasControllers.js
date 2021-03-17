const express = require('express')

const Saidas = require('../models/Saidas')
const Users = require('../models/Users')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

class SaidasControllers {
   async create(req,res) {
       try {

        if(req.body.title == '') {
            res.status(400).json({errBackend: 'O titulo não pode ficar vázio!'})
        }
        else if(req.body.value == '') {
            res.status(400).json({errBackend: 'O valor não pode ficar vázio!'})
        }
        else if(req.body.status == '') {
            res.status(400).json({errBackend: 'O status não pode ficar vázio!'})
        }

        
       const {
           title,
           value,
           status,
           date,
           user
       } = req.body

       let response = await Saidas.create(req.body)

       res.status(201).json(response)

    }
    catch(err) {
        console.log(err)
        res.status(401).json({errBackend: 'Ocorreu um erro'})
    }
   }
   
}
module.exports = new SaidasControllers()