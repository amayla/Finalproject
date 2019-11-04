import React, {Component} from "react"
import axios from 'axios'
//klo mau ambil data dr redux state, pakai connect
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import { Card, Button, CardHeader, CardBody,
    CardTitle, CardText } from 'reactstrap'

import moment from 'moment'




//fung render butuh data, ambil data di comp. did mount, runningnya kedua setelah data diambil pertama kali
class checkout extends Component{
    constructor(props){
        super(props)
        this.state= {
            
                // ditaruh di state
                carts:[],
                
                recipient_name:'',
                recipient_address:'',
                recipient_province:'',
                recipient_pcode:'',
                recipient_city:'',
                recipient_district:'',
                recipient_phone:'',
                recipient_note:''
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
                'http://localhost:1001/carts',
                {
                    params: {
                        user_id: this.props.user_id
                    }
                }
            ).then(res => {
                console.log(res.data.results)
                this.setState({carts: res.data.results})
            })
        }
            

    cartList = () => {
            //  render list        
            return this.state.carts.map((cart,index) => {
               return (
                <tr key = {index}>
                    <td></td>
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
        let shipping = 0
       

        this.state.carts.forEach((cart) => {
            purchase += (cart.product_qty * cart.product_price)
            
        })
        
        return (
           <> 
                <tr>
                    <td colSpan='4'>Purchase</td>
                    <td>Rp.{purchase.toLocaleString('id')}</td>
                </tr>
                <tr>
                    <td colSpan='4'>Shipping</td>
                    <td>Rp.{shipping.toLocaleString('id')}</td>
                </tr>
                <tr style={{fontWeight:'bold'}}>
                    <td colSpan='4 '>Total</td>
                    <td>Rp.{`${purchase + shipping}`.toLocaleString('id')}</td>
                </tr>
            </>
            
  
        )
        }

    onProceedtoPaymentCLick = () => {

        axios.post(
            'http://localhost:1001/checkout',
            {
                transaction_id:0,
                user_id:this.props.user_id,
                recipient_address:this.state.recipient_address,
                recipient_phone:this.state.recipient_phone,
                transaction_date: moment(new Date()).format('YYYY-MM-DD kk:mm:ss.SSS'),
                recipient_name:this.state.recipient_name,
                recipient_province:this.state.recipient_province,
                recipient_city:this.state.recipient_city,
                recipient_pcode:this.state.recipient_pcode,
                recipient_note:this.state.recipient_note,
                carts:this.state.carts

            }
        ).then((res)=>{
            alert('Berhasil')
           
            
            axios.delete(
                `http://localhost:1001/checkout`, {
                    data: {
                        user_id: this.props.user_id
                    }
            }).then( res2 => {
                this.props.history.push(`/payment/${res.data.results.insertId}`)
            })

                
          
        
        }).catch((err)=>{
            console.log(err)
            alert('Gagal,coba buka console')
        })

    }

    onSaveAddress = () => {

        axios.post(
            'http://localhost:1001/address',
            {
                user_id:this.props.user_id,
                recipient_address:this.state.recipient_address,
                recipient_phone:this.state.recipient_phone,
                recipient_name:this.state.recipient_name,
                recipient_note:this.state.recipient_note,

            }
        ).then((res)=>{
            alert('Berhasil')
            
            .then(() => {
                console.log(`your address is saved `)
            })
        
        }).catch((err)=>{
            console.log(err)
            alert('Check console')
        })

    }


    // renderShipping = () => {
    //     let shipping = 0
    //     // if(purchase <200000){shipping==10000}
    //     // else if(purchase>200000){
    //     //     shipping == 0
    //     // }
    //     return (
    //         <tr>
    //             <td colSpan='4'>Shipping</td>
    //             <td>Rp.{shipping.toLocaleString('id')}</td>
    //         </tr>
    //     )
        
    //     }


    renderContactcard = () => {
       
        return (
            <div>
              <Card>
                <CardHeader>Shipping Details</CardHeader>
                <CardBody>
                  <CardTitle>{this.state.recipient_name}</CardTitle>
                  <CardText>
                    {this.state.recipient_phone}<br/>
                    <br/>
                    {this.state.recipient_address}<br/>
                    {this.state.recipient_province}<br/>
                    {this.state.recipient_city}<br/>
                    {this.state.recipient_pcode}<br/>
                  </CardText>
                  <Button style={{backgroundColor:'#258472'}}>Save Address</Button>
                  <Button style={{marginLeft:2,backgroundColor:'#CC9966'}} onClick={this.onProceedtoPaymentCLick}>Proceed To Payment</Button>
                      
                  
                </CardBody>
              </Card> 
            </div>
          );
          
        }


    // getProvince = () => {
    //     axios.get(
    //         `http://api.shipping.esoftplay.com/province`,
            
                
    //     ).then(res => {
            
    //         this.setState({
    //             // province_id:res.data.province_id,
    //             province_list:res.data.result
    //         })
    //     })
    //     }
        

    // provinceList = () => {
    //     return this.state.province_list.map((data,index) => {
           
    //         return(
                
    //                 <option value={JSON.stringify(data)} data={data.province} key={index}>{data.province}</option>
                
    //         )
    //     })

    //     }

    // getCity = () => {
    //     axios.get(
    //         `http://api.shipping.esoftplay.com/city/${this.state.province_id}`,
           
                
    //     ).then(res => {
    //         // console.log(res.data)
    //         this.setState({
    //             // province_id:res.data.province_id,
    //             city_list:res.data.result
    //         })
    //     })

    //     }

    // cityList = () => {

    //     return this.state.city_list.map((data,index) => {
    //         return(
                
    //                 <option value={JSON.stringify(data)} key={index}>{data.city_name}</option>
                
    //         )
    //     })

    //     }
        

    // pcodeList = () => {

    //     return this.state.city_list.map((data,index) => {
    //         return(
                
    //                 <option value={data.postal_code} key={index}>{data.postal_code}</option>
                
    //         )
    //     })

    //     }

    saveAddress = () => {
        axios.post(
            'http://localhost:1001/products',
            {
                id_transaksi:1,
                user_id:this.state.auth.id,
                user_address:JSON.parse(this.state.recipient_address+this.state.recipient_province),
                mobile_phone:this.state.recipient_phone,
                transaction_date: Date.now(),
                recipient_name:this.state.recipient_name,
                address_remark:this.state.recipient_note
            }
        ).then((res)=>{
            alert('Berhasil')
        
        }).catch((err)=>{
            console.log(err)
            alert('Gagal,coba buka console')
        })

    }

    shippingForm = () => {
        return(
            
                        <div className = 'col-7'>
                            <Card className='row'>
                            <CardHeader>Shipping Form</CardHeader>
                                <CardBody>
                                
                                    <div className='row p-2'>

                                        <div className='col-4 pr-0'>
                                        Name :
                                        </div>
                                            <input onChange = {event => 
                                            this.setState({ recipient_name: event.target.value })}
                                            className='form-control col-8'type='text'/>
                                            <br/>

                                    </div>
                                    <div className='row p-2'>
                                        <div className='col-4 pr-0'>
                                        Phone :
                                        </div> 

                                            <input onChange = {event => 
                                            this.setState({ recipient_phone: event.target.value })}
                                            className='form-control col-8'type='text'/>
                                            <br/>     

                                    </div>
                                        <div className='row p-2'>
                                            <div className='col-4 pr-0'>
                                            Address :
                                            </div> 
                                            <input onChange = {event => 
                                            this.setState({ recipient_address: event.target.value })}
                                            className='form-control col-8'type='text'/>
                                            <br/>

                                        </div>
                                        <div className='row p-2'>
                                            <div className='col-4 pr-0'>
                                            Province: 
                                            </div> 
                                            <input onChange = {event => 
                                            this.setState({ recipient_province: event.target.value })}
                                            className='form-control col-8'type='text'/>
                                            <br/>
                                        </div>
                                
                                        <div className='row p-2'>
                                            <div className='col-4 pr-0'>
                                            City : 
                                            </div> 
                                            <input onChange = {event => 
                                            this.setState({ recipient_city: event.target.value })}
                                            className='form-control col-8'type='text'/>
                                            <br/>
                                        </div>
                                        <div className='row p-2'>
                                            <div className='col-4 pr-0'>
                                            Postal Code : 
                                            </div> 
                                            <input onChange = {event => 
                                            this.setState({ recipient_pcode: event.target.value })}
                                            className='form-control col-8'type='text'/>
                                            <br/>
                                        </div>
                                        <div className='row p-2'>
                                            <div className='col-4 pr-0'>
                                            Note : 
                                            </div> 
                                            <input onChange = {event => 
                                            this.setState({ recipient_note: event.target.value })}
                                            className='form-control col-8'type='text'/>
                                            <br/>
                                        </div>
                                
                                </CardBody>

                            </Card>
                        </div>

                        
        )
        

    }

    
     
    render() {
    
        if(this.props.username){
            return(
                <div className= 'container'>
                <h4 style={{padding:20}}>Check Out</h4>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>QTY</th>
                            <th>PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.cartList()}
                        {this.renderPurchase()}
                        
                    </tbody>
                </table>
                <div className='row'>
                        {this.shippingForm()}

                        <div className='col-5'>
                        {this.renderContactcard()}
                        </div>
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