import React, {Component} from "react"
import axios from 'axios'
//klo mau ambil data dr redux state, pakai connect
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

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

        onCheckoutClick = () => {
            this.setState((state) => {
                return {
                    checkout: this.state.carts
                }
            })
        }
    

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
            //  render list
            console.log(this.state.carts)
            return this.state.carts.map((cart,index) => {
               return (
                <tr key = {index}>
                    
                    <td>{cart.product_name}</td>
                    <td>{cart.product_desc}</td>
                    <td>Rp.{cart.product_price.toLocaleString('id')}</td>
                    <td>{cart.product_qty}</td>
                    <td>
                        <img style = {{width:"100px"}} className='list' src={cart.product_image} alt=""/>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={()=>{this.onDeleteProduct(cart.cart_id)}}>Delete</button>
                    </td>
                </tr>
               )
            })
        }
    

    change = (id, val) => {
        let z = this.state.products;
        for (let i = 0; i < z.length; i++) {
            if(z[i].id === id){
                z[i].qtyproduct = val
            }           
        }
        this.setState({'products': z})
    }

    Total= () => {
        let total = 0
        let array = this.state.products
        for (let i = 0; i<array.length; i++){
            total += array[i].price * array[i].qtyproduct
        
        }
        return total
    }

     
    render() {
        if(this.props.username){
            return(
                <div className='container'>
                <h4 style={{padding:20}}>Shopping Cart</h4>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>QTY</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.cartList()}
                    </tbody>
                </table>
                <div className='text-center'>
                    <a href='/checkout'><button className='btn mb-2 mr-2 col-4 'style={{backgroundColor:'#CC9966',color:'white'}} >Checkout</button></a>
                </div>
                
                
            </div>
            )    
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