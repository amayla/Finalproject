import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom' 



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
        selectedStock:''


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
        // komponen buat sendiri => klo bawaan (){}
        //Ambil data dari text input
        let data_name = this.name.value
        let data_desc = this.desc.value
        let data_price = this.price.value
        let data_picture = this.pict.value
        let data_stock = this.stock.value

        // taruh (Post) database ke JSON
        axios.post(
            'http://localhost:1001/products',
            {
                product_name:data_name,
                product_desc:data_desc,
                product_price:data_price,
                product_image:data_picture,
                product_stock:data_stock
            }
        ).then((res)=>{
            alert('Berhasil')
            this.getData()
            // mengambil data
        
        }).catch((err)=>{
            console.log(err)
            alert('Gagal,coba buka console')
        })

        

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
                        <img style={{width: "100px", height:"100px"}}src={product.product_image} alt={product.product_desc}/>
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
        console.log(this.state.products)
        
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
                            <td> <input ref={(input) => {this.name= input}}className="form-control" type="text"/></td>
                            <td> <input ref={(input) => {this.desc= input}}className="form-control" type="text"/></td>
                            <td> <input ref={(input) => {this.price= input}}className="form-control" type="text"/></td>
                            <td> <input ref={(input) => {this.stock= input}}className="form-control" type="text"/></td>
                            <td> <input ref={(input) => {this.pict= input}}className="form-control" type="text"/></td>
                            
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
