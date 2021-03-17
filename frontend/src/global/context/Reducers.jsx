export const InitialState = {
name: '',
_id: '',
email: '',
token: '',
auth: localStorage.getItem('userToken'),

}
export const UserReducer = (state, action) => {
    console.log('Meu token', action.payload.token)
    console.log('Meus dados', action.payload.data)
    switch(action.type) {   
        
        case 'SETid':
            return {
                ...state,
                _id: action.payload._id
            }
        case 'SETemail':
            return {
                ...state,
                email: action.payload.email
            }
        case 'SETtoken':
            return {
                ...state,
                token: action.payload.token
            }
        case 'SETauth':
            return {
                ...state,
                auth: action.payload.auth
            }
        case 'SETname':
            return {
                ...state,
                name: action.payload.name
            }
        break;
            default:
                return state
            }
    }
  