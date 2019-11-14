import React, {Component} from "react"
import axios from 'axios'
//klo mau ambil data dr redux state, pakai connect
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import { URL_API} from '../helpers'
import '../css/global.css'


//import Checkout from './checkOut'


//fung render butuh data, ambil data di comp. did mount, runningnya kedua setelah data diambil pertama kali
class ShoppingCart extends Component{
    constructor(props){
        super(props)
        this.state= {
            
                // ditaruh di state
                carts:[],
                checkout:null
                
        
            }
        }
        
        componentDidMount(){
            this.getData()
           
        }

        // onCheckoutClick = () => {
        //     this.setState((state) => {
        //         return {
        //             checkout: this.state.carts
        //         }
        //     })
        //     axios.patch(
        //     'http://localhost:1001/carts',
        //     {
        //         params: {
        //             product_id: this.state.carts.product_id
        //         }
        //     }).then(
        //         (res)=>{
        //         this.getData()
        //     }
        //     ).catch((err) => {
        //         console.log(err)
        //     })
        // }
    

        //if cart empty, do not run get data function.
        getData = () => {
            axios.get(
                'http://localhost:1001/carts',
                {
                    params: {
                        user_id: this.props.user_id
                    }
                }
            ).then(res => {
               
                this.setState({carts: res.data.results})
            })
        }
            
        

        onDeleteProduct= (cart_id)=>{
            console.log(cart_id)
            axios.delete(
                'http://localhost:1001/carts',{
                    data:{
                        cart_id:cart_id
                    }
                }
            ).then(res => {
                this.getData()
            })
            
        }

        cartList = () => {  
            
            console.log(this.state.carts)
            return this.state.carts.map((cart,index) => {
               return (
                <tr key = {index}>
                    
                    <td>{index+1}</td>
                    <td>{cart.product_name}</td>
                    <td>Rp.{cart.product_price.toLocaleString('id')}</td>
                    {/* <td><input type='number' value={cart.product_qty} onChange={(e) =>this.changeQty(e.target.value, cart.cart_id)}/></td> */}
                    <td>{cart.product_qty}</td>
                    <td>
                        <img style = {{width:"100px"}} className='list' src={URL_API+ 'files/products/'+cart.product_image} alt=""/>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={()=>{this.onDeleteProduct(cart.cart_id)}}>Delete</button>
                    </td>
                </tr>
               )
            })
        }
    

        // change = (id, val) => {
        //     let z = this.state.products;
        //     for (let i = 0; i < z.length; i++) {
        //         if(z[i].id === id){
        //             z[i].qtyproduct = val
        //         }           
        //     }
        //     this.setState({'products': z})
        // }

        changeQty = (e, id) => {
            let result = this.state.carts.find(product=> product.cart_id === id)
            if(result.product_qty){
                let sum = result.product_qty = e
                this.setState({...this.state.carts, product_qty:sum})

            }
        }

        Total= () => {
            let total = 0
            let array = this.state.products
            for (let i = 0; i<array.length; i++){
                total += array[i].price * array[i].qtyproduct
            
            }
            return  total.toLocaleString('id')
        }

     
    render() {
       
        if(this.props.username){
            if(this.state.carts.length===0){
                return(
                    <div className='container' id='page-container'>
                    <div id='content-wrap'>
                    <h4 style={{padding:20}}>Shopping Cart</h4>
                    
                        <h5 style={{textAlign:'center'}}>Your cart is empty.</h5>
                        
                    
                    </div>       
                </div>
                )    
            }
            else{
                return(
                    <div className='container' id='page-container'>
                    <div id='content-wrap'>
                    <h4 style={{padding:20}}>Shopping Cart</h4>
                    <table className='table text-center'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Picture</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.cartList()}
                        </tbody>
                    </table>
                    <div className='text-center'>
                        <a href='/checkout'><button className='btn mb-2 mr-2 'style={{backgroundColor:'#CC9966',color:'white'}} >Checkout</button></a>
                    </div>
    
                    </div>     
                    
                </div>
                )    
            }
        } else{
            return <Redirect to='/login'/>
        }
}
}   

  const mstp = (state) => {
      return{
          user_id : state.auth.id,
          username: state.auth.username
      }
  }
export default connect(mstp)(ShoppingCart)
//<Checkout carts={this.state.checkout} /> 
// onClick={this.onCheckoutClick}