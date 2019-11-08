import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom' 
import { Input, Label} from 'reactstrap'
import { URL_API} from '../helpers'


// import {connect} from 'react-redux'

class ManageProducts extends Component{


    state = {
        // ditaruh di state
        products:[],
        selectedId:0,
        selectedName: '',
        selectedDesc: '',
        selectedPrice: '',
        selectedPict: '',
        selectedStock:'',
        selectedFile:[],
        product_name:'',
        product_desc:'',
        product_price:'',
        product_stock:'',


    }

    //ketiga
    componentDidMount(){

     
     this.getData()  
     console.log(this.state.products) 

    }

     
     getData = () => {
        axios.get('http://localhost:1001/products')
        .then((res)=>{
            
            this.setState({
                products:res.data.results,
                selectedId:0
            })
        }).catch((err)=> {
            console.log(err)
        })
    }
    // edit patch data
    onSaveClick = (idProduct) => {
        // axios.patch
        // http://localhost:2019/products/(id product)
        axios.patch(
            `http://localhost:1001/products/${idProduct}`,
            {
                product_name: this.state.selectedName,
                product_desc: this.state.selectedDesc,
                product_price: this.state.selectedPrice,
                product_image: this.state.selectedPict,
                product_stock: this.state.stock
            }
        ).then((res)=>{
            this.getData()
        }
        ).catch((err) => {
            console.log(err)
        })
    }

    onEditClick = (idProduct, product) => {
        this.setState(
            {
           
            selectedId: idProduct,
            selectedName: product.product_name,
            selectedDesc: product.product_desc,
            selectedPrice: product.product_price,
            selectedPict: product.product_image,
            selectedStock: product.product_stock
        } )
    }

    onCancelClick = () => {
        this.setState({selectedId: 0})
    }
    
    // Add Product. ada on nya krn berhubungan dengan event handler
    onAddProduct = () =>{
        let data = {
            product_name : this.state.product_name,
            product_desc : this.state.product_desc,
            product_price : this.state.product_price,
            product_stock : this.state.product_stock
        }

        if (this.state.selectedFile){
            let fd = new FormData()
            console.log(this.state.selectedFile)

            fd.append('browse_file', this.state.selectedFile, this.state.selectedFile.name)
            fd.append('data', JSON.stringify(data))

            axios.post(
                `http://localhost:1001/products/`, fd
            ).then(res => {
                alert('product successfully added')
                this.getData()
                console.log(res.data.results)
                console.log(this.state.selectedFile)
                
                // this.props.history.push("/complete")

            }).catch(err => {
                console.log(err)
            })
        } else {
            alert('Please select an image')
        }
    } 
        

    

    onDeleteItem = (idProduct) => {
        axios.delete(`http://localhost:1001/products/${idProduct}`)
        .then(() => {
            this.getData()
            // console.log(`barang berhasil dihapus `)
        })
        
    }

   

    // List product
    productList = () => {
        // Map data object menjadi list. data didapat dr component didmount
        // products=[{},{},{}]array
        // product = {name.desc,price,picture}object
        //hasilRender = [<tr></tr>,<tr></tr>,<tr></tr>]

        
        return this.state.products.map((product)=>
        { if (product.product_id!==this.state.selectedId){
            return (
                <tr key={product.product_id}>
                    <td>{product.product_name}</td>
                    <td>{product.product_desc}</td>
                    <td>{product.product_price}</td>
                    <td>{product.product_stock}</td>
                    <td>
                        <img style={{width: "100px", height:"100px"}}src={URL_API+ 'files/products/' + product.product_image} alt={product.product_desc}/>
                    </td>
                    <td>
                        <button className="btn btn-outline-warning m-1"
                        // anonymous function
                        onClick= {() => {this.onEditClick(product.product_id, product)}}> 
                            Edit
                        </button>
                        <button className="btn btn-outline-danger m-1"
                        // anonymous function
                        onClick= {(e) => {if(window.confirm(`Are you sure you wish to delete this item?`))
                            this.onDeleteItem(product.product_id)}}> 
                            Delete
                        </button>
                    </td>
                </tr>
            )
        } 
        else{
            // di render sebagai textbox
            return(
                <tr key={product.product_id}>
               
                    <td><input type='text' 
                    className= 'form-control' 
                    size={8} 
                    defaultValue={this.state.selectedName} 
                    onChange={(e) => {this.setState({selectedName:e.target.value})}}/>
                    </td>

                    <td><input type='text' 
                    className= 'form-control' 
                    size={8} 
                    defaultValue={this.state.selectedDesc}
                    onChange={(e) => {this.setState({selectedDesc:e.target.value})}}/></td>
                    
                    <td><input type='text' 
                    className= 'form-control' 
                    size={8} 
                    defaultValue={this.state.selectedPrice}
                    onChange={(e) => {this.setState({selectedPrice:e.target.value})}}/></td>

                    <td><input type='text' 
                    className= 'form-control' 
                    size={8} 
                    defaultValue={this.state.selectedStock}
                    onChange={(e) => {this.setState({selectedPrice:e.target.value})}}/></td>
                    
                    <td><input type='text' 
                    className= 'form-control' 
                    size={8} 
                    defaultValue={this.state.selectedPict}
                    onChange={(e) => {this.setState({selectedPict:e.target.value})}}/></td>
                    
                    <td>
                        <button className='btn btn-outline-danger mb-2'
                         onClick= {this.onCancelClick}>
                        Cancel
                        </button>
                    
                    
                        <button className='btn btn-outline-primary'
                         onClick={() => {this.onSaveClick(product.product_id)}}>
                         Save 
                        </button>
                    </td>
                </tr>
            )
        }
        })
        
    }


    
    //kedua dan keempat
    render(){
        console.log('render')
        console.log(this.state.selectedFile)
        
        if(this.props.username){

            return(
                <div className="container">
                    {/* RENDERING LIST DATA */}
                    <h1 className="text-center mt-3 mb-3">List Of Products</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Desc</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Picture</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.productList()}
                            
                        </tbody>
                    </table>
    
                    {/* INPUT DATA */}
                    <h1 className="text-center mt-3 mb-3">Input Products</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Desc</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Picture</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td> <input onChange={e => {this.setState({product_name:e.target.value})}} className="form-control" type="text"/></td>
                            <td> <input onChange={e => {this.setState({product_desc:e.target.value})}} className="form-control" type="text"/></td>
                            <td> <input onChange={e => {this.setState({product_price:e.target.value})}} className="form-control" type="text"/></td>
                            <td> <input onChange={e => {this.setState({product_stock:e.target.value})}} className="form-control" type="text"/></td>
                            <td> 
                                <input onChange={e => this.setState({selectedFile: e.target.files[0]})} className='form-control' type="file" name="file" id="selectedFile" />
                            </td>
                            
                            <td> 
                                <button className="btn btn-outline-success"
                                onClick={this.onAddProduct}>
                                
                                Add</button></td>
                            </tr>
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
  export default connect(mapStateToProps)(ManageProducts)
