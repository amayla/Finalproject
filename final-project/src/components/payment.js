import React, {Component} from "react"
import axios from 'axios'
//klo mau ambil data dr redux state, pakai connect
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
// import { Card, CardHeader, CardBody,
//     CardTitle, CardText } from 'reactstrap'

// import moment from 'moment'




//fung render butuh data, ambil data di comp. did mount, runningnya kedua setelah data diambil pertama kali
class Payment extends Component{
    constructor(props){
        super(props)
        this.state= {
            
                // ditaruh di state
                transaction:'',
                // user_id:'',
                // recipient_name:'',
                // recipient_address:'',
                // recipient_province:'',
                // recipient_pcode:'',
                // recipient_city:'',
                // recipient_district:'',
                // recipient_phone:'',
                // recipient_note:''
                // province_list:[],
                // city_list:[],
                // province_id:''
                
                
        
            }
        
        }
        
    componentDidMount(){
            this.getData()
            //this.getProvince()
   
           
        }

    
        //if cart empty, do not run get data function.
    getData = () => {
            axios.get(
                `http://localhost:1001/checkout`,
                {
                    params: {
                        transaction_id: this.props.match.params.id
                    }
                }
            ).then(res => {
                console.log(res.data.results[0])
                this.setState({transaction: res.data.results[0]})
            })
        }
            

    cartList = () => {
            //  render list      
            if(this.state.transaction.transaction_details){
                return this.state.transaction.transaction_details.map((cart,index) => {
                    return (
                     <tr key = {index}>
                         <td>{index+1}</td>
                         <td>{cart.product_name}</td>
                         <td>{cart.product_qty}</td>
                         <td>Rp.{cart.product_price.toLocaleString('id')}</td>  
                     </tr>
                    )
                 })
            }else{
                return null
            }
            
        }
    
   
    renderPurchase = () => {
        let purchase = 0
        let shipping = 0
       
        if(this.state.transaction.transaction_details){
            this.state.transaction.transaction_details.forEach((cart) => {
                purchase += (cart.product_qty * cart.product_price)
                
            })
            
            return (
               <> 
                    <tr>
                        <td colSpan='3'>Purchase</td>
                        <td>Rp.{purchase.toLocaleString('id')}</td>
                    </tr>
                    <tr>
                        <td colSpan='3'>Shipping</td>
                        <td>Rp.{shipping.toLocaleString('id')}</td>
                    </tr>
                    <tr style={{fontWeight:'bold'}}>
                        <td colSpan='3'>Total</td>
                        <td>Rp.{`${purchase + shipping}`.toLocaleString('id')}</td>
                    </tr>
                </>
                
      
            )
        }
        
        }



    renderContactcard = () => {
       
        return (
            <div className='container' style ={{paddingLeft:'20px', marginBottom:'2px'}}>
              
                    {this.state.transaction.recipient_name}<br/>
                    {this.state.transaction.recipient_phone}<br/>
                    {this.state.transaction.recipient_address}<br/>
                    {this.state.transaction.recipient_province + ', ' +
                    this.state.transaction.recipient_city + ', ' +
                    this.state.transaction.recipient_pcode}
                 
            </div>
          );
          
        }




   
    
     
    render() {
    
        if(this.props.username){
            return(
                <div className= 'container'>
                <h4 style={{paddingTop:20,paddingLeft:20,paddingRight:20,paddingBottom:1}}>Invoice No. 2K19-CMDT-0{this.state.transaction.transaction_id}</h4>
                <div className='row'>
                <div className='col-5'>
                {this.renderContactcard()}
                </div>
                </div>
                
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.cartList()}
                        {this.renderPurchase()}
                        
                    </tbody>
                </table>
                <div className='row container'>
                    <div className='col-6'>
                        <p>Bank Account Transfer</p>
                        <img src={require("../images/Bank_Central_Asia.png")} alt='Bank BCA' style={{height:'40px'}} ></img>
                        <br/>
                        <p>12345678910<br/>PT.Commoditea Indonesia</p>
                        
                    </div>
                    <div className='col-6 container' style={{textAlign:'center'}}>Upload Payment Transaction</div>

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
export default connect(mstp)(Payment)

// onClick={this.onCheckoutClick}