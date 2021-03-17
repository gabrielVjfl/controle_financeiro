import {useState, useEffect} from 'react';

import {useHistory} from 'react-router-dom'

import Axios from 'axios'
export default function useAuth() {

    const history = useHistory()
    
    const [auth, setAuth] = useState(false)
    const [ loading, setLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   useEffect(() => {
       const token = localStorage.getItem('token')

       if(token) {
       Axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
       setAuth(true)
       }

       setLoading(false)
   }, [])

   const HandleRegistre = async(e) => {
       e.preventDefault()

       const response = await Axios.post('http://localhost:8040/api/users/create', {
          
           email: email,
           password: password
       })

       if(response.data.token) {

        alert('Tem token')
           
           let token = response.data.token

           localStorage.setItem('token', JSON.stringify(token))
           Axios.defaults.headers.Authorization = `Bearer ${token}`
           setAuth(true)

           history.push('/home')
       }

       const HandleLogout = () => {
           setAuth(false)
           localStorage.removeItem('token')
           Axios.defaults.headers.Authorization = undefined
           history.push('/')
       }

       return {auth, setEmail, setPassword, setEmail, password, loading, HandleRegistre, HandleLogout}


   }
}