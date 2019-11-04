import React, { Component } from 'react'
import axios from 'axios'

import {connect} from "react-redux"
import {onCart} from '../actions'



class ProductDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            product: []
        }
    }

    

    componentDidMount() {
        axios.get(
            `http://localhost:1001/products/${this.props.match.params.id}` 

        ).then(res => {
            
            // res.data = {id, name, price, description, picture}
            this.setState({product: res.data.results})
            
            console.log(this.state.product)
        })
    }


    onAddToCartClick = (id,selectednumber) => {

        let cart = this.props.array

        let qty = parseInt(selectednumber.value)
        
        let flag = 0
        if(cart.length !== 0){
            for(let i = 0; i<cart.length; i++){
                if(id===cart[i].idproduct){
                    cart[i].qtyproduct += qty
                    flag = 1
                }
            }
        }

        if (flag===0){
            cart.push({
                idproduct: id,
                qtyproduct: qty
            })
        }
        

        this.props.onCart(cart)

    }

    renderDescription = () => {
        return this.state.product.map(product => {
            return (
                <div className='row'>
                    <div className="col-6 mt-5" style={{borderRight:'1px solid grey'}}>
                    <img className='card-img-top p-5' style={{marginLeft:'auto',marginRight:'auto', height:'450px',width:'450px',display:'block'}}alt='brg' src={product.product_picture}/>
                    <h5>Description</h5>
                    <p style={{marginTop:"20px"}}>{product.product_desc}</p>
                    </div>
        
                    <div className="col-6 mt-5">
                    <h4>{product.product_name}</h4>
                    
                    <p>Rp. {product.product_price.toLocaleString('id')}</p>
                    <input className='mb-2' type="number" min='0'ref={(input)=>{this.selectednumber = input}}/><br/>
                    <button className='btn btn-outline-success' onClick= {()=>{this.onAddToCartClick(this.state.product.id,this.selectednumber)}}>Add To Cart</button>
                    </div>
                </div>
                    
                
            )
         })
    }


    render() {
        // Ketika product bukan null
        if(this.state.product){
            return (
                // <div className='card col-5 mx-auto'>
                //     <div className='card-header mt-2'>
                //         <h2>{this.state.product.name}</h2>
                //     </div>
                //     <div className='card-body'>
                //         <img className='card-img-top' alt='brg' src={this.state.product.picture}/>
                //         <h3>Name: {this.state.product.name}</h3>
                //         <p>Description : {this.state.product.description}</p>
                //         <p>Harga : Rp.{this.state.product.price}</p>
                //     </div>
                //     <input className='form-control mb-2' type="number" min='0'ref={(input)=>{this.selectednumber= input}}/>
                //     <button className='btn btn-block btn-outline-success' onClick= {()=>{this.onAddToCartClick(this.state.product.id,this.selectednumber)}}>Add To Cart</button>
                // </div>

                <div className="container" >
                    {this.renderDescription()}

                </div>
            )
        } else {
            return <div><h1 className='text-center'>Loading</h1></div>
        }
    }
}
const mapStateToProps = state => {
    return {
      array: state.cart
    }
  }


export default connect (mapStateToProps,{onCart}) (ProductDetail)

// false
// '', 0, null, undefined