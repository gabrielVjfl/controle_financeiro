const mongoose = require( 'mongoose')

const Schema = mongoose.Schema

const Entradas = new Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    // Relacionamento
    user: { // pertence a um usuario essa entrada
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('Entradas', Entradas)