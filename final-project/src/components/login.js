import React,{Component} from 'react'
import {Redirect} from 'react-router-dom' 
import {connect} from 'react-redux'
import axios from 'axios'
import { URL_API } from '../helpers'
import {onLoginUser} from '../actions'


class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            loading: '',
            error: ''
        }
    }

    onLoginClick = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        
        axios.get (
            URL_API + 'login',
            {
                params: {
                    username: this.username.value,
                    password: this.password.value
                }
            }
        ).then((res)=> {
            if (res.data.status === 404){
                this.setState({
                    loading: false,
                    error: 'Incorrect username or password.'
                })
                setTimeout(() => { 
                    this.setState({
                        error: ''
                    }) 
                }, 3000)
            } else {
                let {id, username,email} = res.data.results[0]
                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        id, username
                    })
                )
                this.props.onLoginUser(id,username,email)
            }
        })
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
            style={{backgroundColor:'#CC9966',fontFamily:'Comfortaa',fontSize:'18px', color:'#ffff'}} 
            onClick={this.onLoginClick}
        >
            Log in
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
                                    <h1 style={{color:'#CC9966',fontFamily:'Comfortaa'}}>Log In</h1>
                                </div>
                            
                                <form>
                                    <div className="input-group">
                                        <input ref={(input)=>{this.username = input}} 
                                        type="text" className="form-control mt-3" 
                                        placeholder="Username"/></div>
                                    
                                    <div className="input-group">
                                        <input ref={(input)=>{this.password = input}} 
                                        type="password" className="form-control mt-3" 
                                        placeholder="Password"/></div>

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
            return <Redirect to= '/'/>
            
        }
        
    }
}
const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
  }

    export default connect(mapStateToProps,{onLoginUser})(Login)
