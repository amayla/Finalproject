import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom' 



// import {connect} from 'react-redux'

class PaymentVerification extends Component{


    state = {
        
        transaction:[]
        

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
        console.log(this.state.transaction.transaction_id)
        axios.patch(
            `http://localhost:1001/transaction/${idTransaction}`,
            {
                transaction_status: 'Approved'
            }
        ).then((res)=>{
            this.getData()
        }
        ).catch((err) => {
            console.log(err)
        })
    }

    onDeclineClick = (idTransaction) => {
        console.log(this.state.transaction.transaction_id)
        axios.patch(
            `http://localhost:1001/transaction/${idTransaction}`,
            {
                transaction_status: 'Decline'
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
            if(transaction.transaction_status===null){
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{transaction.user_id}</td>
                        <td>{transaction.transaction_id}</td>
                        <td>{transaction.transaction_date}</td>
                        <td>{transaction.amount}</td>
                        <td> 
                            {/* <img style={{width: "100px", height:"100px"}}src={transaction.proof} alt={transaction.transaction_id}/> */}
                        </td>
                        <td>{transaction.transaction_status}</td>
                        <td>
                            <button className="btn btn-outline-warning m-1"
                            // anonymous function
                            onClick= {() => {this.onApproveClick(transaction.transaction_id)}}> 
                                Approve
                            </button>
                            <button className="btn btn-outline-danger m-1"
                            // anonymous function
                            onClick= {() => {if(window.confirm(`Are you sure you wish to decline this transaction?`))
                                this.onDeclineClick(transaction.transaction_id)}}> 
                                Decline
                            </button>
                        </td>
                    </tr>
                )
            } else if (transaction.transaction_status==='Approved'){
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{transaction.user_id}</td>
                        <td>{transaction.transaction_id}</td>
                        <td>{transaction.transaction_date}</td>
                        <td>{transaction.amount}</td>
                        <td>
                            {/* <img style={{width: "100px", height:"100px"}}src={transaction.proof} alt={transaction.transaction_id}/> */}
                        </td>
                        <td>{transaction.transaction_status}</td>
                        <td>
                            <button className="btn btn-outline-warning m-1"
                            // anonymous function
                            disabled={true}
                            onClick= {() => {this.onApproveClick(transaction.transaction_id)}}> 
                                Approve
                            </button>
                            <button className="btn btn-outline-danger m-1"
                            // anonymous function
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
                        <td>{transaction.user_id}</td>
                        <td>{transaction.transaction_id}</td>
                        <td>{transaction.transaction_date}</td>
                        <td>{transaction.amount}</td>
                        <td>
                            {/* <img style={{width: "100px", height:"100px"}}src={transaction.proof} alt={transaction.transaction_id}/> */}
                        </td>
                        <td>{transaction.transaction_status}</td>
                        <td>
                            <button className="btn btn-outline-warning m-1"
                            // anonymous function
                            onClick= {() => {this.onApproveClick(transaction.transaction_id)}}> 
                                Approve
                            </button>
                            <button className="btn btn-outline-danger m-1"
                            // anonymous function
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
        if(this.props.username){

            return(
                <div className="container">
                    <h1 className="text-center mt-3 mb-3">Transaction List</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>User ID</th>
                            <th>Transaction ID</th>
                            <th>Transaction Date</th>
                            <th>Amount</th>
                            <th>Transaction Proof</th>
                            <th>Transaction Status</th>
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
                <Redirect to='/login'/>
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
