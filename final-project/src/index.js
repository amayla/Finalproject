import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

import {Provider} from 'react-redux'
import {createStore, combineReducers } from 'redux'
import authReducer from './reducers/index'

const reducers = combineReducers(
    {
        auth: authReducer
    }
)


const STORE = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
    
    )

ReactDOM.render(
<Provider store = {STORE}>
<App/>
</Provider>,
document.getElementById("root")

)