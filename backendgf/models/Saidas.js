const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Saidas = new Schema({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['PAGO', 'ATRASADO', 'AGENDADO']
    },
   
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // tabela de referencia
        require: true
        },
        // se for vários coloca [{}]
    date: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('Saidas', Saidas)