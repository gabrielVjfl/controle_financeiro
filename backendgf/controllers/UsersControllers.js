const express = require('express')

const Users = require('../models/Users')

const Bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const authSecret = require('../secure/auth.json')

let mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

const Saidas = require('../models/Saidas')

class UsersControllers {
   async create(req,res) {
       try {

        if (req.body.name == "") {
            res.status(400).json({ errBackend: "Nome vázio" });
          } else if (req.body.name.length < 4) {
            res.status(400).json({ errBackend: "Nome: Minimo 4 Caracteres!" });
          } else if (req.body.email == "") {
            res.status(400).json({ errBackend: "Email vázio" });
          } else if (req.body.email.length < 5) {
            res.status(400).json({ errBackend: "Email: Minimo 5 caracteres" });
          } else if (req.body.password == "") {
            res.status(400).json({ errBackend: "Senha vázia" });
          } else if (req.body.password.length < 5) {
            res.status(400).json({ errBackend: "Senha: Minimo 5 caracteres" });

          } else {

       const salt = await Bcryptjs.genSalt()

       const hashedPassword = await Bcryptjs.hash(req.body.password, salt)

       req.body.password = hashedPassword

       const {
       name,
       email,
       password
       } = req.body

       if(email.indexOf('@') == -1) { //se não tiver o @
        res.status(400).send({errBackend: 'Email tem que ter um @'})
      }

       let existsEmail = await Users.findOne().where({email:email})

       if(existsEmail) {
           res.status(401).json({errBackend: 'Email já cadastrado!'})
       }
       else {

       let user = await Users.create(req.body)

       user.password = undefined

       // jwt
       const token = jwt.sign({_id: user._id}, authSecret.secret, {
           expiresIn: 86400
       })


       //res.cookie('userToken', token, { httpOnly: true });

       res.status(200).json({user, token})
       }
       }
       }
       catch(err) {
       console.log(err)
       res.status(401).json({errBackend: 'Deu erro'})
       }
   }

   async login(req,res) {
       try {

      
           if (req.body.email == "") {
            res.status(400).json({ errBackend: "Email vázio" });
          } else if (req.body.email.length < 5) {
            res.status(400).json({ errBackend: "Email: Minimo 5 caracteres" });
          } else if (req.body.password == "") {
            res.status(400).json({ errBackend: "Senha vázia" });
          } else if (req.body.password.length < 5) {
            res.status(400).json({ errBackend: "Senha: Minimo 5 caracteres" });
          } else {



       const {
       name,
       email,
       password
       } = req.body

       let user = await Users.findOne().where({email: email})

       if(!user) {
           res.status(401).json({errBackend: 'Usuário não está cadastrado!'})
       }
       
           if(!await Bcryptjs.compare(password, user.password)) {
               res.status(401).json({errBackend: 'Senha incorreta'})
       }
             const token = jwt.sign({_id: user._id}, authSecret.secret, {
                 expiresIn: 86400
             })

             //res.cookie('userToken', token, { httpOnly: true });

             user.password = undefined

             res.status(200).send({user, token})
            }
   }
   catch(err) {
       console.log(err)
       res.status(401).json({errBackend: 'Ocorreu um erro'})
   }
}
async ChangeName(req,res) {
  try {

    //const {_id} = req.params

  const {
    _id,
    name,
    nameNew
  } = req.body

  let user = await Users.findOne().where({_id: _id, name: name})

  if(!user) {
    res.status(400).json({errBackend: 'O nome está errado!'})
  }
  else {

   await Users.updateOne({name: nameNew})
   
  user.save()

  res.status(200).json({sucBackend: 'Ok trocado'})
  }
  

  }
  catch(err) {
  console.log(err)
  res.status(400).json({errBackend: 'O nome está errado!'})
  }
}
async ChangePassword(req,res) {
  try {
    const {_id} = req.params

  const {
    password,
    passwordNew,
    confPasswordNew
  } = req.body

  let user = await Users.findOne().where({_id: _id})

  if(!user) {
    res.status(400).json({errBackend: 'Não tem usuario'})
  }


  if(!await Bcryptjs.compare(password, user.password)) {
    res.status(400).json({errBackend: 'Senha incorreta!'})
  }

  if(req.body.passwordNew !== req.body.confPasswordNew) {
    res.status(400).json({errBackend: 'Senhas não batem!'})
  }

  else {
    let salt = await Bcryptjs.genSalt()

    let hashedPassword = await Bcryptjs.hash(passwordNew, salt)

    req.body.passwordNew = hashedPassword

    console.log('Senha hasheada', req.body.passwordNew)

    await Users.updateOne({password: hashedPassword})
   
  user.save()

  res.status(200).json({sucBackend: 'Senha alterada com sucesso!'})

  }
  }
  catch(err) {
  console.log(err)
  res.status(400).json({errBackend: 'Ocorreu um erro'})
  }
}
}
module.exports = new UsersControllers()