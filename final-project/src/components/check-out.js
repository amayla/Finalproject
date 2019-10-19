import React, {Component} from "react"
import axios from 'axios'
//klo mau ambil data dr redux state, pakai connect
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"




//fung render butuh data, ambil data di comp. did mount, runningnya kedua setelah data diambil pertama kali
class checkout extends Component{
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
            

        cartList = () => {
            //  render list
            
            return this.state.carts.map((cart,index) => {
               return (
                <tr key = {index}>
                    <td>{cart.product_id}</td>
                    <td>{cart.product_name}</td>
                    <td>{cart.product_desc}</td>
                    <td>{cart.product_qty}</td>
                    <td>Rp.{cart.product_price.toLocaleString('id')}</td>  
                </tr>
               )
            })
        }
    
   
    renderCheckoutFoot = () => {
        let total = 0

        this.state.carts.forEach((cart) => {
            total += (cart.product_qty * cart.product_price)
        })

        return (
            <tr>
                <th colSpan='4'>TOTAL</th>
                <td>Rp.{total.toLocaleString('id')}</td>
            </tr>
        )
    }

    renderShipping = () => {

        
    }

     
    render() {
        if(this.props.username){
            return(
                <div className= 'container'>
                <h1 className='display-4 text-center'>Check Out</h1>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>QTY</th>
                            <th>PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.cartList()}
                        {this.renderCheckoutFoot()}
                    </tbody>
                </table>
                <table className='table text-center col-6'>
                    <thead>
                        <th colSpan='6'>
                            Shipping
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input className='form-control'type='text'/></td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td><input className='form-control' type='text'/></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td><input className='form-control' type='text'/></td>
                        </tr>
                        <tr>
                            <td>District</td>
                            <td><input className='form-control' type='text'/></td>
                        </tr>
                        <tr>
                            <td>Postal Code</td>
                            <td><input className='form-control' type='text'/></td>
                        </tr>
                        <tr>
                            <td>Mobile Number</td>
                            <td><input className='form-control' type='text'/></td>
                        </tr>
                        <tr>
                            <td>Note</td>
                            <td><input className='form-control' type='text'/></td>
                        </tr>
                        <tr>
                            <td>Shipping Method</td>
                            <td>
                                <select>
                                    <option value="volvo">Reguler</option>
                                    <option value="saab">One Night Service</option>
                                    <option value="opel">Same Day Service</option>
                                    <option value="audi">Others..</option>
                                </select> 
                            </td>
                        </tr>
                    </tbody>
                    
                </table>

                <div className='text-right'>
                <button href='/payment' className='btn btn-primary'>Proceed To Payment</button>
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
export default connect(mstp)(checkout)

// onClick={this.onCheckoutClick}