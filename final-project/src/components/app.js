import React, { Component } from 'react'
import {Route,BrowserRouter} from 'react-router-dom'
import Register from './register'
import Login from './login'
import Home from './home'
import Header from './header'
import ManageProducts from './productlist'
import Shop from './shop'
import { keepLogin } from '../actions/index'
import { connect } from  'react-redux'


import '../css/global.css'


class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            check : false
        }
    }
    

    componentDidMount(){
        //check local storage
       let userStorage = JSON.parse(localStorage.getItem(`userData`))

       if(userStorage){
           //kirim ke redux
           this.props.keepLogin(userStorage)
       }
       this.setState({check:true})
    }


    render(){
        if(this.state.check){
            return(
            <div>
                <BrowserRouter>
                <Header/>
                <Route path='/' exact component={Home}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/home' component={Home}/>
                <Route path='/manage' component={ManageProducts}/>
                <Route path='/shop' component={Shop}/>
                </BrowserRouter>
            </div>
                
            )

        }
        else{
            return <div><h1 className='text-center'>Loading</h1></div>
        }
    }
        
        }


export default connect (null,{keepLogin}) (App)