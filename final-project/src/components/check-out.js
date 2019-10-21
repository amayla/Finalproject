import React, {Component} from "react"
import axios from 'axios'
//klo mau ambil data dr redux state, pakai connect
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import { Card, Button, CardHeader, CardBody,
    CardTitle, CardText } from 'reactstrap'




//fung render butuh data, ambil data di comp. did mount, runningnya kedua setelah data diambil pertama kali
class checkout extends Component{
    constructor(props){
        super(props)
        this.state= {
            
                // ditaruh di state
                carts:[],
                checkout:null,
                recipient_name:'',
                recipient_address:'',
                recipient_pcode:'',
                recipient_city:'',
                recipient_district:'',
                recipient_phone:'',
                recipient_note:''
                
        
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
    
   
    renderPurchase = () => {
        let purchase = 0

        this.state.carts.forEach((cart) => {
            purchase += (cart.product_qty * cart.product_price)
        })

        return (
            <tr>
                <td colSpan='4'>Purchase</td>
                <td>Rp.{purchase.toLocaleString('id')}</td>
            </tr>
        )
    }

    renderShipping = () => {
        let shipping = 0
        return (
            <tr>
                <td colSpan='4'>Shipping</td>
                <td>Rp.{shipping.toLocaleString('id')}</td>
            </tr>
        )
        
    }
    // renderContactcard = () => {
    //     return (
    //         <div>
    //           <Card>
    //             <CardHeader>Shipping Details</CardHeader>
    //             <CardBody>
    //               <CardTitle>{this.recipient_name}</CardTitle>
    //               <CardText>
    //                   {this.recipient_address}
    //                   {this.recipient_province}
    //                   {this.recipient_city}
    //                   {this.recipient_district}
    //                   {this.recipient_pcode}
    //                   {this.recipient_phone}
    //               </CardText>
    //               <Button>Go somewhere</Button>
    //             </CardBody>
    //           </Card>
    //         </div>
    //       );
    // }
    


     
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
                        {this.renderPurchase()}
                        {this.renderShipping()}
                    </tbody>
                </table>
                <div className='row'>
                        <table className='table text-center col-8'>
                            <thead>
                                <th colSpan='6'>
                                    SHIPPING DETAILS
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td><input ref={(input)=>{this.recipient_name = input}} className='form-control'type='text'/></td>
                                    <td>Mobile Number</td>
                                    <td><input ref={(input)=>{this.recipient_phone= input}}  className='form-control' type='text'/></td>
                                </tr>
                                <tr>
                                    <td >Address</td>
                                    <td colSpan='6'><input ref={(input)=>{this.recipient_address = input}} className='form-control' type='text'/></td>
                                </tr>
                                <tr>
                                    <td>Province</td>
                                    <td><input ref={(input)=>{this.recipient_city= input}} className='form-control' type='text'/></td>
                                    <td>City</td>
                                    <td><input ref={(input)=>{this.recipient_city= input}} className='form-control' type='text'/></td>
                                </tr>
                                <tr>
                                    <td>District</td>
                                    <td><input ref={(input)=>{this.recipient_district= input}} className='form-control' type='text'/></td>
                                    <td>Postal Code</td>
                                    <td><input ref={(input)=>{this.recipient_pcode= input}} className='form-control' type='text'/></td>
                                </tr>
                                <tr>
                                    <td>Note</td>
                                    <td colSpan='6'><input ref={(input)=>{this.recipient_note= input}} className='form-control' type='text'/></td>
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
                                    <td><button className='btn btn-secondary'>Confirm Address</button></td>
                                </tr>
                            </tbody>
                            
                        </table>

                        <div className='col-4'>
                        <h1>TEST</h1>
                        </div>
                </div>
                
                

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