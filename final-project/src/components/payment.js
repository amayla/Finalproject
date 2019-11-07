import React, {Component} from "react"
import axios from 'axios'
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"




class Payment extends Component{
    constructor(props){
        super(props)
        this.state= {
        
                transaction:'',
                bankName:'',
                bankAccountName:'',
                bankAccountNumber:'',
                transferProof:''
                
        
            }
        
        }
        
    componentDidMount(){
            this.getData()
            
   
           
        }

           
    getData = () => {
            axios.get(
                `http://localhost:1001/transaction/${this.props.match.params.id}`
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

    renderUpload = () => {
            if(!this.state.transaction.bank_transfer_proof){
                if(this.state.transaction.status === "Cancelled"){
                    return (
                        <div className="col-12">
                            <p>Transaction cancelled.</p>
                        </div> 
                    )
                } else {
                    return (
                        <div className='row'>
                            <div>
                                <div className='row'>
                                    <div className='col-4'>
                                        <p style={{fontSize:'14px'}}>Bank Name</p>  
                                    </div>
                                    <div className='col-7'>
                                        <input onChange={e => this.setState({bankName: e.target.value})} className="form-control mb-2"/>
                                    </div>
                                    <div className='col-4'>
                                        <p style={{fontSize:'14px'}}>Account Name</p>   
                                    </div>
                                    <div className='col-7'>
                                        <input onChange={e => this.setState({bankAccountName: e.target.value})} type="text" className="form-control mb-2"/>
                                    </div>
                                    <div className='col-4'>
                                        <p style={{fontSize:'14px'}}>Account Number</p>   
                                    </div>
                                    <div className='col-7'>
                                        <input onChange={e => this.setState({bankAccountNumber: e.target.value})} type="text" className="form-control mb-2"/>
                                    </div>
                                    <div className='col-4'>
                                        <p style={{fontSize:'14px'}}>Proof of Transfer</p>
                                    </div>
                                    <div className='col-7'>
                                        <input onChange={e => this.setState({transferProof: e.target.files[0]})} type="file" className="form-control" style={{textAlign:'center', fontSize:'14px'}}/>
                                    </div> 
                                </div>
                            </div>
                            
                        </div>
                    )
                }
            } else {
                return (
                    <div className="col-12">
                        <p>Transfer proof Uploaded</p>
                        <div className="row">
                            <div className="col-5" style={{textAlign:'right'}}>
                                <a href={'http://localhost:1001/files/transferproof/' + this.state.transaction.bank_transfer_proof} target="_blank" rel="noopener noreferrer">
                                    View 
                                </a>
                            </div>
                            <div className="col-7">
                                <div style={{textAlign:'left', fontSize:'12px'}}>Bank Name: {this.state.transaction.bank_name}</div>
                                <div style={{textAlign:'left',fontSize:'12px'}}>Account Holder Name: {this.state.transaction.bank_account_name}</div>
                                <div style={{textAlign:'left',fontSize:'12px'}}>Account Number : {this.state.transaction.bank_account_number}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    
    renderButton = () => {
            if(!this.state.transaction.bank_transfer_proof){
                if(this.state.transaction.transaction_status === "Cancelled"){
                    return null
                } else {
                    return (
                        <div className = 'row'>
                        <div className = 'col-4'></div>
                        <div className = 'col-4'>
                        <button style={{marginBottom:'10px', fontSize:'12px', background:"#258472"}} onClick={() => this.onSubmitButton()} className="btn btn-dark btn-block mt-2">Submit</button>
                        </div>
                        <div className = 'col-4'></div>
                        </div>
                        
                    )
                }
            } else {
                return null
            }
        }
    
    onSubmitButton = () => {
            if(this.state.bankAccountName){
                if (this.state.transferProof){
                    let fd = new FormData()
                    let data = {
                        bank_name: this.state.bankName,
                        bank_account_name: this.state.bankAccountName,
                        bank_account_number: this.state.bankAccountNumber
                    }
    
                    fd.append('browse_file', this.state.transferProof, this.state.transferProof.name)
                    fd.append('data', JSON.stringify(data))
    
                    axios.patch(
                        `http://localhost:1001/transactionproof/${this.props.match.params.id}`, fd
                    ).then(res => {
                        alert('Upload proof success')
                        console.log(res.data.results)
                        console.log(this.state.transferProof)
                        
                        // this.props.history.push("/complete")
    
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    alert('Please select an image')
                }
            } else {
                alert('Please type account holder name')
            }
        }




   
    
     
    render() {
        console.log(this.state.transferProof)
        if(this.props.username){
            return(
                <div className= 'container'>
                <h4 style={{paddingTop:20,paddingLeft:20,paddingRight:20,paddingBottom:1}}>Invoice No. 2K19-CMDT-0{this.state.transaction.transaction_id}</h4>
                <h6 style={{paddingTop:1,paddingLeft:20,paddingRight:20,paddingBottom:1}}>Status : {this.state.transaction.transaction_status}</h6>
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
                <div className='row'>
                    <div className='container col-4'>
                        <p style={{textAlign:'center'}}>Bank Account Transfer</p>
                        <img src={require("../images/Bank_Central_Asia.png")} alt='Bank BCA' style={{height:'40px', display:'block', marginLeft:'auto', marginRight:'auto'}} ></img>
                        <br/>
            
                        <p style={{textAlign:'center'}}>12345678910<br/>PT.Commoditea Indonesia</p>
                        
                    </div>
                    <div className='col-4'></div>
                    <div className='col-4 container' style={{textAlign:'center'}}>
                        <p>Upload Payment Transaction</p>
                        {this.renderUpload()}
                        {this.renderButton()}
                
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
export default connect(mstp)(Payment)

// onClick={this.onCheckoutClick}