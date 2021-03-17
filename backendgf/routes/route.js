const express = require('express')

let route = express.Router()

const UsersControllers = require('../controllers/UsersControllers')
const EntradasControllers = require('../controllers/EntradasControllers')
const SaidasControllers = require('../controllers/SaidasControllers')

const UsersEntradas = require('../controllers/users/UsersEntradas')
const UserSaidas = require('../controllers/users/UsersSaidas')


const UserAuthParams = require('../secure/private/UserParams')
const UserSecure = require('../secure/private/UserSecure')

route.post('/users/create', UsersControllers.create)
route.post('/users/login', UsersControllers.login)
route.post('/users/changename', UsersControllers.ChangeName)
route.post('/users/changepassword/:_id', UsersControllers.ChangePassword)


// SAIDAS
route.get('/users/list/saidas/total/:_id', UserAuthParams, UserSaidas.indexSaidas)
route.get('/users/list/saidas/total/like/:_id', UserAuthParams, UserSaidas.indexSaidasLike)
route.get('/users/list/saidas/count/:_id', UserAuthParams, UserSaidas.indexSaidasCount)
route.get('/users/list/saidas/sum/:_id', UserSaidas.indexSaidasSum)
route.get('/users/list/saidas/agendadas/:_id', UserAuthParams, UserSaidas.SaidasAgendadas)
route.get('/users/list/saidas/pagos/:_id', UserAuthParams, UserSaidas.SaidasPagos)
route.get('/users/list/saidas/atrasado/:_id', UserAuthParams, UserSaidas.SaidasAtrasado)
route.get('/users/list/saidas/pago/count/:_id', UserAuthParams, UserSaidas.SaidasPagoCount)
route.get('/users/list/saidas/agendadas/count/:_id', UserAuthParams, UserSaidas.SaidasAgendadasCount)
route.get('/users/list/saidas/atrasadas/count/:_id', UserAuthParams, UserSaidas.SaidasAgendadasCount)
route.get('/users/list/saidas/total/pago/:_id', UserAuthParams, UserSaidas.SaidasPagosValue)
route.get('/users/list/saidas/total/agendado/:_id', UserAuthParams, UserSaidas.SaidasAgendadosValue)
route.get('/users/list/saidas/total/atrasados/:_id', UserAuthParams, UserSaidas.SaidasAtrasadosValue)
route.post('/saidas/create', SaidasControllers.create)


route.get('/users/list/entradas/total/:_id', UserAuthParams, UsersEntradas.indexEntradas)
route.get('/users/list/entradas/total/like/:_id',UserAuthParams, UsersEntradas.indexEntradasLike)
route.get('/users/list/entradas/count/:_id', UserAuthParams, UsersEntradas.indexEntradasCount)
route.get('/users/list/entradas/sum/:_id', UserAuthParams, UsersEntradas.indexEntradasSum)
route.post('/entradas/create', EntradasControllers.create)
route.get('/entradas/like', EntradasControllers.entradasLike)

route.get('/users/sum/entradas/month/:_id', UsersEntradas.SumMonth)
route.get('/users/sum/entradas/dash/:_id', UsersEntradas.SumMonthDash)

module.exports = route