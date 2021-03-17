const express = require('express')

const Users = require('../../models/Users')

let mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

class UserEntradas {
    async indexEntradas(req,res) {
        try {
    
            const {_id} = req.params
    
        await Users.aggregate([
    
            {
                $match: {
                    _id: ObjectId(_id)
                }
            },
            
            {
                $lookup: {
                    from: "entradas",
                    localField: "_id",
                    foreignField: "user",
                    as: "entradas",
                }
            }
        ], (err, result) => {
            if(err) {
                res.status(400).json(err)
            }
            else {
                res.status(200).json(result)
            }
        })
    
        }
        catch(err) {
            console.log(err)
            res.status(400).json({errBackend: 'Ocorreu um erro'})
        }
    }
    async indexEntradasLike(req,res) {
        try {
         const {_id} = req.params
         const {search} = req.query
    
         await Users.aggregate([
             {
                 $match: {
                     _id: ObjectId(_id)
                 }
             }, 
             {
                 $lookup: {
                     from: 'entradas',
                     localField: '_id',
                     foreignField: 'user',
                     as: 'entradas' 
                 }
             },
             {
                $unwind: "$entradas"
            },
            
            {
                $match: {
                  "entradas.title": {$regex: search, $options: 'i'}
                }
            },
            {  // Concertar os objetos!!
            $group: {
                _id: 0,
                entradas: {$push: "$entradas" }
            }}
            
         
    
         ], (err, result) => {
             if(err) {
                 console.log(err)
                 res.status(400).json(err)
             }
             else {
                 res.status(200).json(result)
             }
         })
        }
        catch(err) {
        console.log(err)
        }
    }
    async indexEntradasCount(req,res) {
        try {
    
        const {_id} = req.params
    
        await Users.aggregate([
    
            {
                $match: {
                    _id: ObjectId(_id)
                }
            },
            
            {
                $lookup: {
                    from: "entradas",
                    localField: "_id",
                    foreignField: "user",
                    as: "entradas",
                }
            },
            {
            $project: {
                _id:0, 
                entradasCount:{$size: "$entradas"},
              
            }
        }
        ], (err, result) => {
            if(err) {
                res.status(400).json(err)
            }
            else {
                res.status(200).json(result)
            }
        })
    
        }
        catch(err) {
            console.log(err)
            res.status(400).json({errBackend: 'Ocorreu um erro'})
        }
    }
    async indexEntradasSum(req,res) {
        try {
    
        const {_id} = req.params
    
        await Users.aggregate([
    
            {
                $match: {
                    _id: ObjectId(_id)
                }
            },
            
            {
                $lookup: {
                    from: "entradas",
                    localField: "_id",
                    foreignField: "user",
                    as: "entradas",
                }
            },
            {
            $project: {
                _id:0, 
                entradasSum:{$sum: "$entradas.value"},
              
            }
        }
        ], (err, result) => {
            if(err) {
                res.status(400).json(err)
            }
            else {
                res.status(200).json(result)
            }
        })
    
        }
        catch(err) {
            console.log(err)
            res.status(400).json({errBackend: 'Ocorreu um erro'})
        }
    }
    async SumMonth(req,res) {
        try {
            const {_id} = req.params
        await Users.aggregate([
            {
            $match: {
                _id: ObjectId(_id)
            }
            },
            {
                $lookup: {
                    from: "entradas",
                    localField: "_id",
                    foreignField: "user",
                    as: "entradas",
                }
            },
            {
            $unwind: '$entradas'
            },
            {
            $group: {
                _id: {
                  year: {$year: "$entradas.date"},
                  month: {$month: "$entradas.date"},
                  day: {$dayOfMonth: "$entradas.date"}
                },

                total: {$sum: "$entradas.value"}
            },

         
           
           
        }
        
        ], (err,result) => {
            if(err) {
                console.log(err)
                res.status(400).json(err)
            }
            else {
                res.status(200).json(result)
            }
        })
        }
        catch(err) {

        }
    }
    async SumMonthDash(req,res) {
        try {
            const {_id} = req.params
            
        await Users.aggregate([
            {
            $match: {
                _id: ObjectId(_id)
            }
            },
            {
                $lookup: {
                    from: "entradas",
                    localField: "_id",
                    foreignField: "user",
                    as: "entradas",
                }
            },
            {
            $unwind: '$entradas'
            },
          
            {
                $group: {
                    _id: {
                      year: {$year: "$entradas.date"},
                      month: {$month: "$entradas.date"},
                      day: {$dayOfMonth: "$entradas.date"},
                      
                    },
                   
                    
                    total: {$sum: "$entradas.value"},
                   
                },
               
             
                },
                {
                $project: {
                    year: "$_id.year",
                    month: "$_id.month",
                    day: "$_id.day",
                    total: "$_id.total",
                }
            }
                
            


        ], (err,result) => {
            if(err) {
                console.log(err)
                res.status(400).json(err)
            }
            else {
                res.status(200).json(result)
            }
        })
        }
        catch(err) {

        }
    }
}

module.exports = new UserEntradas



