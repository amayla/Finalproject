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
                recipient_note:this.state.recipient_note,
                carts:this.state.carts

            }
        ).then((res)=>{
            alert('Berhasil')
            this.getData()
            
            axios.delete(
                `http://localhost:1001/checkout`, {
                    data: {
                        user_id: this.props.user_id
                    }
                })
            .then(() => {
                this.getData()
                // console.log(`barang berhasil dihapus `)
            })
        
        }).catch((err)=>{
            console.log(err)
            alert('Gagal,coba buka console')
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
                    phone : {this.state.recipient_phone}<br/>
                    Address : <br/>
                    {this.state.recipient_address}<br/>
                    {this.state.recipient_province}<br/>
                    {this.state.recipient_city}<br/>
                    {this.state.recipient_pcode}<br/>
                  </CardText>
                  <Button>Save Address</Button>
                  <Button style={{marginLeft:2}} onClick={this.onProceedtoPaymentCLick}>Proceed To Payment</Button>
                  
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
            <table className='table text-center col-7'>
                            <thead>
                                <tr>
                                <th colSpan='4'>
                                  SHIPPING FORM
                                </th>
                                </tr>
                               
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td><input onChange = {event => 
                                        this.setState({ recipient_name: event.target.value })}
                                        className='form-control'type='text'/>
                                    </td>
                                    <td>Mobile Number</td>
                                    <td><input onChange = {event => 
                                        this.setState({ recipient_phone: event.target.value })}
                                        className='form-control' type='text'/>
                                    </td>
                                </tr>
                                <tr>
                                    <td >Address</td>
                                    <td colSpan='4'>
                                        <input onChange = {event => 
                                        this.setState({ recipient_address: event.target.value })} 
                                        className='form-control' type='text'/>
                                    </td>
                                </tr>
                                <tr >
                                    <td>Province</td>
                                    <td>
                                    <input onChange = {event => 
                                        this.setState({ recipient_province: event.target.value })} 
                                        className='form-control' type='text'/>
                                        {/* <select className='form-control' onChange = {event => 
                                        this.setState({ province_id: JSON.parse(event.target.value).province_id,
                                                        recipient_province:JSON.parse(event.target.value).province})}>
                                            <option>Select Province</option>
                                            {this.provinceList()}
                                            {this.getCity()}
                                        </select> */}
                                        
                                    </td>
                                    <td>City</td>
                                    <td>
                                        <input onChange = {event => 
                                        this.setState({ recipient_city: event.target.value })} 
                                        className='form-control' type='text'/>
                                        {/* <select className='form-control' onChange = {event => 
                                        this.setState({city_id: JSON.parse(event.target.value).city_id,
                                                        recipient_city:JSON.parse(event.target.value).city_name})}>
                                             <option>Select City</option>
                                            {this.cityList()}
                                        </select> */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Postal Code</td>
                                    <td>
                                        <input onChange = {event => 
                                        this.setState({ recipient_pcode: event.target.value })} 
                                        className='form-control' type='text'/>

                                        {/* <select className='form-control' onChange = {event => 
                                        this.setState({recipient_pcode: event.target.value })}>
                                            <option>Select Postal Code</option>
                                            {this.pcodeList()}
                                        </select> */}
                                    </td>
                                    <td>Shipping Method</td>
                                    <td>
                                        <select>
                                            <option value="reguler">Reguler (3-5 days)</option>
                                            <option value="express">One Night Service</option>
                                            <option value="sameday">Same Day Service</option>
                                        </select> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>Note</td>
                                    <td colSpan='4'><input placeholder='example: Please deliver on working hours!' onChange = {event => 
                                        this.setState({ recipient_note: event.target.value })} 
                                        className='form-control' type='text'/>
                                    </td>
                                </tr>
                            </tbody>
                            
                        </table>
        )
        

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
                        {this.renderPurchase()}
                        
                    </tbody>
                </table>
                <div className='row'>
                        {this.shippingForm()}

                        <div className='col-4'>
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