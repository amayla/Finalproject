
const init = {

    id:'',
    username:'',
    email:''

}

 const AuthReducer = (state = init,action) => {
    switch (action.type){
// akan menyalin property di state untuk kemudian diubah 'id' dan 'username'
        case 'LOGIN_SUCCESS':
        return {...state,
            id: action.payload.id, 
            username:action.payload.username,
            email:action.payload.email
        }

        case 'LOGOUT_SUCCESS':
            return {...state,
                id: '',
                username:'',
                email: ''
            }
        ;

    default:
        
        return state

    }

}

export default AuthReducer

