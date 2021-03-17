const express = require('express')

const Entradas = require('../models/Entradas')
const Users = require('../models/Users')

const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId;

class EntradasControllers {
   async create(req, res) {
       try {
   const {
      title,
      value,
      date,
      user,
      
   } = req.body

   let response = await Entradas.create(req.body)

   res.status(201).json(response)

    }

    catch(err) {
       res.status(401).json({errBackend: 'Ocorreu um erro'})
    }

   }
   async entradasLike(req,res) {
      try {

         const {search} = req.query

      let response = await Entradas.find({title: {$regex: search, $options: 'i'}})

      res.status(200).json(response)
      
      }
      catch(err) {
         console.log(err)
      }
   }
}
module.exports = new EntradasControllers()