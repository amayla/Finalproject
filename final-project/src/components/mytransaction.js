import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom' 
import {Table} from 'reactstrap' 
import { URL } from '../helpers'
import '../css/global.css'




// import {connect} from 'react-redux'

class Mytransaction extends Component{



    state = {
        
        transaction:[]
        

    }

    
    componentDidMount(){

     
     this.getData()  
     

    }

    getData = () => {
        axios.get(`http://localhost:1001/transactionbyuser`,{
            params:{
                user_id:this.props.user_id
            }
        })
        .then((res)=>{
            
            this.setState({transaction:res.data.results})
            console.log(this.state.transaction)
        }).catch((err)=> {
            console.log(err)
        })
    }


    



    
    
    transactionList = () => {
   
        return this.state.transaction.map((transaction,index)=>{
            if(transaction.transaction_status===null){
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td><a href={URL+'payment/'+transaction.transaction_id} target='blank'>{transaction.transaction_id}</a></td>
                        <td>{transaction.transaction_date}</td>
                        <td>{transaction.transaction_amount}</td>
                        <td>{transaction.transaction_status}</td>
                    </tr>
                )
            } else if (transaction.transaction_status==='Approved'){
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td><a href={URL+'payment/'+transaction.transaction_id} target='blank'>{transaction.transaction_id}</a></td>
                        <td>{transaction.transaction_date}</td>
                        <td>{transaction.transaction_amount}</td>
                        <td>{transaction.transaction_status}</td>
                    </tr>
                )
            } else {
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td><a href={URL+'payment/'+transaction.transaction_id} target='blank'>View</a></td>
                        <td>{transaction.transaction_date}</td>
                        <td>{transaction.transaction_amount}</td>
                        <td>{transaction.transaction_status}</td>
                    </tr>
                )
            }
        })
        
    }

    
    
    
    render(){
        console.log(this.state.transaction)
        if(this.props.username){

            return(
                <div className="container" id='page-container'>
                    <div id='content-wrap'> 
                    <h1 className="text-center mt-3 mb-3">My Transaction</h1>
                    <Table className="table text-center">
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>Invoice</th>
                            <th>Transaction Date</th>
                            <th>Amount</th>
                            <th>Transaction Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.transactionList()}
                            
                        </tbody>
                    </Table>

                    </div>
                      
    
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
        username: state.auth.username,
        user_id:state.auth.id
    }
  }
  export default connect(mapStateToProps)(Mytransaction)
