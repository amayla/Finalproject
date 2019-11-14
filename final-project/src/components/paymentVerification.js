import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom' 
import {URL_API} from '../helpers/index'
import moment from 'moment'
import {Input} from 'reactstrap'



// import {connect} from 'react-redux'

class PaymentVerification extends Component{



    state = {
        
        transaction:[],
        detail_transaction:[],
        shipping_number:0
        

    }

    
    componentDidMount(){

     
     this.getData()  
     

    }

    getData = () => {
        axios.get('http://localhost:1001/transaction')
        .then((res)=>{
            
            this.setState({transaction:res.data.results})
            console.log(this.state.transaction)
        }).catch((err)=> {
            console.log(err)
        })
    }


   
    onApproveClick = (idTransaction) => {
        axios.patch(
            `http://localhost:1001/transaction/${idTransaction}`,
            {
                transaction_status: 'Approved'
            }
        ).then((res)=>{

            axios.get(`http://localhost:1001/transaction/${idTransaction}`
                    )
                    .then((res)=>{

                        let transaction_details = res.data.results[0].transaction_details

                        for(let i=0;i<transaction_details.length;i++){
                            axios.patch(
                                
                                `http://localhost:1001/checkoutqtyoffline`,{
                                
                                     product_id: transaction_details[i].product_id,
                                     product_qty: transaction_details[i].product_qty
                                    
                                    
                                })
                        }

                    })

            this.getData()
        }
        ).catch((err) => {
            console.log(err)
        })
    }

    onDeclineClick = (idTransaction, idUser) => {
        axios.patch(
            `http://localhost:1001/transaction/${idTransaction}`,
            {
                transaction_status: 'Decline'
            }
        
            ).then((res)=>{

                axios.get(`http://localhost:1001/transaction/${idTransaction}`
                    )
                    .then((res)=>{

                        let transaction_details = res.data.results[0].transaction_details

                        for(let i=0;i<transaction_details.length;i++){
                            axios.patch(
                                
                                `http://localhost:1001/returnqty`,{
                                
                                     product_id: transaction_details[i].product_id,
                                     product_qty: transaction_details[i].product_qty
                                    
                                    
                                })
                        }

                    })
            
            this.getData()
        }
        ).catch((err) => {
            console.log(err)
        })
    }

    addShipping = (idTransaction) => {
        axios.patch(
            `http://localhost:1001/transhipstatus/${idTransaction}`,
            {
                shipping_number: this.state.shipping_number,
                transaction_status: 'On Shipping Process',
                shipped:1
            }
        ).then((res)=>{
            this.getData()
        }
        ).catch((err) => {
            console.log(err)
        })
        

    }

    
    
    transactionList = () => {
   
        return this.state.transaction.map((transaction,index)=>{
            if(transaction.transaction_status==='Awaiting Admin Verification'){
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td><a href={`/payment/${transaction.transaction_id}`} target='blank'>View</a></td>
                        <td>{moment(transaction.transaction_date).format('DD-MM-YYYY, HH:mm')}</td>
                        <td>{transaction.transaction_amount}</td>
                        <td><a href={URL_API+`files/transferproof/`+ transaction.bank_transfer_proof} target='blank' id='transProof'>View</a></td>
                        <td>{transaction.transaction_status}</td>
                        <td>-</td>
                        <td>
                            <button className="btn btn-outline-success m-1"
                            style={{fontSize:'65%'}}
                            onClick= {() => {this.onApproveClick(transaction.transaction_id)}}> 
                                Approve
                            </button>
                            <button className="btn btn-outline-danger m-1"
                            style={{fontSize:'65%'}}
                            onClick= {() => {if(window.confirm(`Are you sure you wish to decline this transaction?`))
                                this.onDeclineClick(transaction.transaction_id, transaction.user_id)}}> 
                                Decline
                            </button>
                        </td>
                    </tr>
                )
            } else if (transaction.transaction_status==='Approved'){
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td><a href={`/payment/${transaction.transaction_id}`} target='blank'>View</a></td>
                        <td>{moment(transaction.transaction_date).format('DD-MM-YYYY, HH:mm')}</td>
                        <td>{transaction.transaction_amount}</td>
                        <td><a href={URL_API+`files/transferproof/`+ transaction.bank_transfer_proof} target='blank' id='transProof'>View</a></td>
                        <td>{transaction.transaction_status}</td>
                        <td><Input type='text' onChange={(e) =>{this.setState({shipping_number:e.target.value})}}/><button className='btn btn-link' 
                            onClick={() => {this.addShipping(transaction.transaction_id)}}>add</button>
                        </td>
                        <td>
                            <button className="btn btn-outline-success m-1"
                            style={{fontSize:'65%'}}
                            disabled={true}
                            onClick= {() => {this.onApproveClick(transaction.transaction_id)}}> 
                                Approve
                            </button>
                            <button className="btn btn-outline-danger m-1"
                            style={{fontSize:'65%'}}
                            disabled={true}
                            onClick= {() => {if(window.confirm(`Are you sure you wish to decline this transaction?`))
                                this.onDeclineClick(transaction.transaction_id)}}> 
                                Decline
                            </button>
                        </td>
                        
                    </tr>
                )
            } else {
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td><a href={`/payment/${transaction.transaction_id}`} target='blank'>View</a></td>
                        <td>{moment(transaction.transaction_date).format('DD-MM-YYYY, HH:mm')}</td>
                        <td>{transaction.transaction_amount}</td>
                        <td><a href={URL_API+`files/transferproof/`+ transaction.bank_transfer_proof} target='blank' id='transProof'>View</a></td>
                        <td>{transaction.transaction_status}</td>
                        <td>{transaction.shipping_number}</td>
                        <td>
                            <button className="btn btn-outline-warning m-1"
                            style={{fontSize:'65%'}}
                            onClick= {() => {this.onApproveClick(transaction.transaction_id)}}
                            disabled={true}
                            > 
                                Approve
                            </button>
                            <button className="btn btn-outline-danger m-1"
                            style={{fontSize:'65%'}}
                            disabled={true}
                            onClick= {() => {if(window.confirm(`Are you sure you wish to decline this transaction?`))
                                this.onDeclineClick(transaction.transaction_id)}}> 
                                Decline
                            </button>
                        </td>
                    </tr>
                )
            }
        })
        
    }

    
    
    
    render(){
        console.log(this.state.transaction)
        if(this.props.username ==='admin'){

            return(
                <div className="container">
                    <h1 className="text-center mt-3 mb-3">Transaction List</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>Invoice</th>
                            <th>Transaction Date</th>
                            <th>Amount</th>
                            <th>Payment Proof</th>
                            <th>Transaction Status</th>
                            <th>Shipping No.</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.transactionList()}
                            
                        </tbody>
                    </table>
    
                   
    
                </div>
            )

        } else {
            return(
                <Redirect to='/home'/>
            )
        }
        
    }


}
const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
  }
  export default connect(mapStateToProps)(PaymentVerification)
