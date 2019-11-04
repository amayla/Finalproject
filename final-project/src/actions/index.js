

export const onLoginUser =(id, username, email) => {
    return   {
        type: 'LOGIN_SUCCESS',
        payload: {
            id, username, email
    
        }

    }

}

export const keepLogin = (objUser) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username,
            email: objUser.email
        }
    }
}





export const onLogoutUser = () => {
    localStorage.removeItem('userData')
    return{
        type: 'LOGOUT_SUCCESS'
    }
}


export const onCart = (cart) => {

    return{
        type: "CART_UPDATED",
        payload: {
            cart
        }
    }
}

export const keepCart = (cart) => {
    return {
        type:'CART_UPDATED',
        payload:{
            cart
        }
    }
}