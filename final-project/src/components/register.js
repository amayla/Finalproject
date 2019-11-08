import React,{Component} from 'react'
import {withRouter,Redirect} from 'react-router-dom' 
import axios from 'axios'
import {connect} from 'react-redux'
import { URL_API } from '../helpers/index'

import "../css/register.css"

const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
  }

class Register extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            loading: '',
            error: '',
            success: ''
        }
    }

    onRegisterClick = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })

        let {username,  email, password, repeatPassword} = this.state

        if(!username|| !email || !password || !repeatPassword){
            this.setState({
                loading: false,
                error: 'Please fill all input forms.'
            })
            setTimeout(() => { 
                this.setState({
                    error: ''
                }) 
            }, 3000)
        }else {
            if(password === repeatPassword){
                axios.get(
                    URL_API + 'users', 
                    {
                        params: {
                            email: email
                        }
                    }
                    ).then((res) => {   
                        console.log(res.data)
                        if(res.data.status === 200){
                            this.setState({
                                loading: false,
                                error: 'Email address has already been used.'
                            })
                            setTimeout(() => { 
                                this.setState({
                                    error: ''
                                }) 
                            }, 3000)
                        } else {
                            axios.post(
                                URL_API + 'users', 
                                {
                                    username: username,
                                    email: email,
                                    password: password
                                }
                            ).then(() => {
                                this.setState({
                                    loading: false,
                                    success:'Registration successful. Redirecting you to login page.'
                                })
                                setTimeout(() => { 
                                    this.props.history.push("/login")
                                }, 3000) 
                            })
                        }
                    })
                } else{
                    this.setState({
                        loading: false,
                        error: 'Password did not match.'
                    })
                    setTimeout(() => { 
                        this.setState({
                            error: ''
                        }) 
                    }, 3000)
                }
            }
        }
        loadingButton = () => {
            if(this.state.loading){
                return (
                    <div className='spinner-grow' role='status'>
                        <span className='sr-only'></span>
                    </div>
                )
            }
    
            return (
                <button 
                    className="btn btn-block mt-4" 
                    style={{backgroundColor:'#CC9966',fontFamily:'arial',fontSize:'18px'}}
                    onClick={this.onRegisterClick}
                >
                    Register
                </button>
            )
    
        }

        notification = () => {
            if(this.state.error){
                return (
                    <div className='alert alert-danger mt-4'>
                        {this.state.error}
                    </div>
                )
    
            } else if(this.state.success){
                return (
                    <div className='alert alert-success mt-4'>
                        {this.state.success}
                    </div>
                )
    
            } else {
                return null
            }
        }
    

       
        
    
        
    
    render(){
        
            if(!this.props.username){
                return (
                    <div className= "background-register">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-md-4 mx-auto margin-register">
                                <div className="card-body">
                                    <div className="card-title">
                                        <h1 style={{color:'#CC9966',fontFamily:'comfortaa'}}>Register</h1>
                                    </div>
                                
                                    <form>
                                        <div className="input-group"><input 
                                        onChange={e => this.setState({username: e.target.value})} 
                                        type="text" className="form-control mt-3" 
                                        placeholder="Username"/></div>
                                        <div className="input-group"><input onChange={e => this.setState({email: e.target.value})} 
                                        type="email" className="form-control mt-3" placeholder="Email"/></div>
                                        <div className="input-group"><input onChange={e => this.setState({password: e.target.value})} 
                                        type="password" className="form-control mt-3" placeholder="Password"/></div>
                                        <div className="input-group"><input onChange={e => this.setState({repeatPassword: e.target.value})}
                                        type="password" className="form-control mt-3" placeholder=" Repeat Password"/></div>
                                        {this.loadingButton()}
                                    </form>
                                    {this.notification()}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                )
    
            } else {
                return <Redirect to='/'/>
                
            }
            
    }

}

//state=folder, auth= reducernya, username=propertiesnya

  export default withRouter(connect(mapStateToProps)(Register))





