import React,{Component} from 'react'
import Axios from 'axios';
import ProductCard from './productCard'
import {Button} from 'reactstrap'

//import Link from 'react-router-dom'


class Shop extends Component{
    state = {
        products: [],
        searchProducts:[]
    }

    //ngambil data
    componentDidMount(){
        Axios.get(
           'http://localhost:1001/products' 
        )
        .then(res=>{
            this.setState({
                products: res.data.results,
                searchProducts: res.data.results,

            })
            console.log(res.data.results)
        }).catch((err)=> {
            console.log(err)
        })
    }

    
    
    onResetClicked = () => {
        this.setState((prevState)=>{
            return{
                searchProducts:prevState.products
            }
        })
    }


    onSearchClicked = () => {
        let input_name = this.name.value
        let min = parseInt(this.minimum.value)
        let max = parseInt(this.maximum.value)
        if (isNaN (min)){
                min = 0
        }
        if (isNaN(max)){
            max = Infinity
        }

        let hasilFilter = this.state.products.filter((product) => {
            
                return product.name.toLowerCase().includes(input_name.toLowerCase())&&(min<=product.price)&&(max>=product.price)
            
        })
        this.setState({searchProducts: hasilFilter})
    }

    onSelectChange = (e) => {
        let hasilSort 
        if (e.target.value ==='nameAsc'){
            console.log('sort nama')
            hasilSort = this.state.searchProducts.sort((a,b) => {
                if(a.name>b.name){
                    return 1
                }else if(a.name<b.name){
                    return -1
                }else{
                    return 0
                }
            })
        }

        else if (e.target.value === 'priceHighest'){
            console.log('sort by the highest price first')
            hasilSort = this.state.searchProducts.sort((a,b) => {
                return (b.price - a.price)
            })
        }

        else if(e.target.value === 'priceLowest'){
            console.log('sort by the lowest price first')
            hasilSort = this.state.searchProducts.sort((a,b) => {
                return (a.price - b.price)
            })
        }
        this.setState({searchProducts: hasilSort})
    }

    // membuat list, akan menggunakan map

    renderList = () => {
        //ambil data berupa array
        //apabila products isinya array of object
        // products = [{},{},{}]
        return this.state.searchProducts.map((product,index) => {
        
         return <ProductCard barang={product} key={index}/>   
               
         
        })
        
    }
    render() {
        return (
            
            <div className='container' style={{textAlign:"left"}}>
                <div>   
                    <div className='form p-3 border-bottom border-secondary card-title'>
                        <div className='border-bottom border-secondary card-title'>
                            <h4>Search</h4>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-6'>
                                <h5 className= 'm-2'>Name</h5>
                                <input 
                                ref={(input)=>{this.name = input}}
                                type='text' 
                                className='mb-2 flex col-12'/>
                            </div>
                            <div className='col-6'>
                                    <div className='row'>
                                    <div className='col-12'>
                                        <h5 className='m-2'>Price</h5>
                                    </div>
                                    <div className='col-6'>
                                        <input ref={(input)=>{this.minimum= input}} 
                                        type='text' 
                                        placeholder='Minimum' 
                                        className='mb-2 flex col-12'/>
                                    </div>
                                     <div className='col-6 flex'>
                                        <input ref={(input)=>{this.maximum= input}} 
                                        type='text' 
                                        placeholder='Maximum'
                                        className='mb-2 flex col-12'/>
                                     </div>
                             </div>
                            </div>
                        </div>
                        <div className='row'>
                        <div className='col-6'> 
                        <div className='row'>
                        <Button className='mb-2 mr-2 col-4 'style={{backgroundColor:'#CC9966'}} 
                            onClick={this.onSearchClicked}>
                            Search
                        </Button>
                        <Button className='mb-2 col-4' style={{backgroundColor:'#258472'}}
                            onClick={this.onResetClicked}>
                            Reset
                        </Button>
                        </div>
                        
                        </div>
                        <div className = 'col-6'>
                        <h5 className = 'm-2'
                            style={{textAlign:"Left"}}>
                            Sort by : </h5>
                            <select name='sortComponent'
                                onChange={this.onSelectChange}>
                                <option style = {{color:"gray",fontSize:"11px",textDecoration:"italic"}} >Please Select</option>
                                <option value='nameAsc'>Name A-Z</option>
                                <option value= 'priceLowest'>Lowest Price First</option>
                                <option value= 'priceHighest'>Highest Price First</option>
                            </select>
                        </div>
                        </div>
                    
                    </div>
                <div className='row col-12'style={{borderColor:'#ffff'}}>
                    {this.renderList()}
                </div>
            </div>
            </div>
        )
    }
}

export default Shop