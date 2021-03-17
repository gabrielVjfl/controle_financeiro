const express = require('express')

const Users = require('../../models/Users')

let mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

class UserSaidas {
    async indexSaidas(req,res) {
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
                    from: "saidas",
                    localField: "_id",
                    foreignField: "user",
                    as: "saidas",
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
    
    async indexSaidasLike(req,res) {
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
                        from: 'saidas',
                        localField: '_id',
                        foreignField: 'user',
                        as: 'saidas' 
                    }
                },
                {
                   $unwind: "$saidas"
               },
               
               {
                   $match: {
                     "saidas.title": {$regex: search, $options: 'i'}
                   }
               },
               {  // Concertar os objetos!!
               $group: {
                   _id: 0,
                   saidas: {$push: "$saidas" }
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
    
    async indexSaidasCount(req,res) {
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
                    from: "saidas",
                    localField: "_id",
                    foreignField: "user",
                    as: "saidas",
                }
            },
            {
            $project: {
                _id:0, 
                saidasCount:{$size: "$saidas"},
              
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
    async indexSaidasSum(req,res) {
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
                    from: "saidas",
                    localField: "_id",
                    foreignField: "user",
                    as: "saidas",
                }
            },
            {
            $project: {
                _id:0, 
                saidasSum:{$sum: "$saidas.value"},
              
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
    
    
    
    async SaidasAgendadas(req,res) {
        try {
    
            const {_id} = req.params
    
            Users.aggregate([
                {
    
                    $match: {
                        _id: ObjectId(_id),
                   
                        
                    }
                },
                {
                    $lookup: {
                    from: "saidas",
                    localField: "_id",
                    foreignField: "user",
                    as: "saidas", 
                    }
                },
                {
                    $unwind: "$saidas"
                },
                {
                    $match: {
                        "saidas.status": "AGENDADO"
                    }
                }
               
            ], (err,result) => {
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
        }
    }
    async SaidasPagos(req, res) {
        try {
            const {_id} = req.params
    
    Users.aggregate([
        {
            $match: {
                _id: ObjectId(_id)
            }
        },
        {
            $lookup: {
                from: "saidas",
                localField: "_id",
                foreignField: "user",
                as: "saidas", 
            }
        },
        {
            $unwind: "$saidas"
        },
        {
            $match: {
                "saidas.status": "PAGO"
            }
        }
    ], (err,result) => {
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
            res.status(400).json(err)
        }
    }
    
    async SaidasAtrasado(req, res) {
        try {
            const {_id} = req.params
    
    Users.aggregate([
        {
            $match: {
                _id: ObjectId(_id)
            }
        },
        {
            $lookup: {
                from: "saidas",
                localField: "_id",
                foreignField: "user",
                as: "saidas", 
            }
        },
        {
            $unwind: "$saidas"
        },
        {
            $match: {
                "saidas.status": "ATRASADO"
            }
        }
    ], (err,result) => {
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
            res.status(400).json(err)
        }
    }
    async SaidasPagoCount(req, res) {
        try {
            const {_id} = req.params
    
    Users.aggregate([
        {
            $match: {
                _id: ObjectId(_id)
            }
        },
        {
            $lookup: {
                from: "saidas",
                localField: "_id",
                foreignField: "user",
                as: "saidas", 
            }
        },
       
        {
            $unwind: "$saidas"
        },
       
        {
            $match: {
                "saidas.status": "PAGO"
            }
        },
        {
            $count: "saidas"
        }
      
       
    ], (err,result) => {
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
            res.status(400).json(err)
        }
    }
    
    async SaidasAgendadasCount(req,res) {
        try {
           const {_id} = req.params
    
           Users.aggregate([
               {
                   $match: {
                       _id: ObjectId(_id)
                   }
               }, 
               {
                   $lookup: {
                       from: "saidas",
                       localField: "_id",
                       foreignField: "user",
                       as: "saidas"
                   }
               }, 
               {
                   $unwind: "$saidas"
               },
               {
                   $match: {
                       "saidas.status": "AGENDADO"
                   }
               },
               {
                   $count: "saidas"
               }
           ], (err, result) => {
               if(err) {
                   res.status(400).json(err)
                   console.log(err)
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
    async SaidasAtrasadasCount(req,res) {
        try {
        const {_id} = req.params
    
        Users.aggregate([
            {
                $match: {
                    _id: ObjectId(_id)
                }
            },
            {
                $lookup: {
                    from: 'saidas',
                    localField: "_id",
                    foreignField: "user",
                    as: "saidas"
                }
            },
            {
                $unwind: "$saidas"
            },
            {
                $match: {
                    "saidas.status": "ATRASADO"
                }
            },
            {
            $count: "saidas"
            }
    
        ], (err, result) => {
            if(err) {
                res.status(400).json(err)
                console.log(err)
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
    async SaidasPagosValue(req,res) {
        try {
            const {_id} = req.params
    
         Users.aggregate([
             {
                 $match: {
                     _id: ObjectId(_id)
                 }
             },
             {
                 $lookup: {
                     from: "saidas",
                     localField: "_id",
                     foreignField: "user",
                     as: "saidas"
                 },
             },
             {
                 $unwind: "$saidas"
             },
             {
                 $match: {
                     "saidas.status": "PAGO"
                 }
             },
             {
                 $project: {
                     _id: 0,
                     sumTotalValue: {$sum: "$saidas.value"}
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
        }
    }
    
    async SaidasAgendadosValue(req,res) {
        try {
    const {_id} = req.params
    
    Users.aggregate([
        {
            $match: {
                _id: ObjectId(_id)
            }
        },
        {
            $lookup: {
                from: "saidas",
                localField: "_id",
                foreignField: "user",
                as: "saidas"
            }
        },
        {
            $unwind: "$saidas"
        },
        {
            $match: {
                "saidas.status":"AGENDADO"
            }
        },
        {
            $project: {
                _id: 0,
                sumAgendados: {$sum: "$saidas.value"}
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
        }
    }
    
    async SaidasAtrasadosValue(req, res) {
        try {
            const {_id} = req.params
            Users.aggregate([
                {
                 $match: {
    
                    _id: ObjectId(_id)
    
                  }
                },
                {
                    $lookup: {
                        from: "saidas",
                        localField: "_id",
                        foreignField: "user",
                        as: "saidas"
                    }
                },
                {
                    $unwind: "$saidas"
                },
                {
                    $match: {
                        "saidas.status": "ATRASADO"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        sumAtrasados: {$sum: "$saidas.value"}
                    }
                }
    
            ], (err,result) => {
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
        }
    }
    
}

module.exports = new UserSaidas