import React, { Component } from 'react'
import {Route,BrowserRouter} from 'react-router-dom'
import Register from './register'
import Login from './login'
import Home from './home'
import Header from './header'
import ManageProducts from './productlist'
import Shop from './shop'
import ShoppingCart from './ShoppingCart'
import checkout from './check-out'
import Payment from './payment'
import ProductDetail from './productDetail'
import PaymentVerification from './paymentVerification'
import Footer from './footer'
import Mytransaction from './mytransaction'
import '../css/global.css'
//import Checkout from './checkOut'
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
            <div id='noxscroll'>
                <BrowserRouter>
                <Header/>
                <Route path='/' exact component={Home}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/home' component={Home}/>
                <Route path='/manage' component={ManageProducts}/>
                <Route path='/shop' component={Shop}/>
                <Route path='/shoppingcart' component={ShoppingCart}/>
                <Route path='/checkout' component={checkout}/>
                <Route path='/payment/:id' component={Payment}/>
                <Route path='/productdetail/:id' component={ProductDetail}/>
                <Route path='/paymentverification' component={PaymentVerification}/>
                <Route path='/mytransaction' component={Mytransaction}/>
                <Footer/>
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