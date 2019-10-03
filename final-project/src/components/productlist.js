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

     console.log('DidMount')
        
        //Ambil semua data produk (get)
     this.getData()  
     console.log(this.state.products) 

    }


    // edit patch data
    onSaveClick = (idProduct) => {
        // axios.patch
        // http://localhost:2019/products/(id product)
        axios.patch(
            `http://localhost:1001/products/${idProduct}`,
            {
                name: this.state.selectedName,
                description: this.state.selectedDesc,
                price: this.state.selectedPrice,
                picture: this.state.selectedPict,
                stock:this.state.stock
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
            selectedName: product.name,
            selectedDesc: product.description,
            selectedPrice: product.price,
            selectedPict: product.picture,
            selectedStock: product.stock
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
                name:data_name,
                description:data_desc,
                price:data_price,
                picture:data_picture,
                stock:data_stock
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

    // mengambil data dari database
    getData = () => {
        axios.get('http://localhost:1001/products')
        .then((res)=>{
            
            this.setState({products:res.data.results,
            selectedId:0})
        }).catch((err)=> {
            console.log(err)
        })
    }

    // List product
    productList = () => {
        // Map data object menjadi list. data didapat dr component didmount
        // products=[{},{},{}]array
        // product = {name.desc,price,picture}object
        //hasilRender = [<tr></tr>,<tr></tr>,<tr></tr>]

        
        return this.state.products.map((product)=>
        { if (product.id!==this.state.selectedId){
            return (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.desc}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                        <img style={{width: "100px", height:"100px"}}src={product.picture} alt={product.desc}/>
                    </td>
                    <td>
                        <button className="btn btn-outline-warning m-1"
                        // anonymous function
                        onClick= {() => {this.onEditClick(product.id, product)}}> 
                            Edit
                        </button>
                        <button className="btn btn-outline-danger m-1"
                        // anonymous function
                        onClick= {(e) => {if(window.confirm(`Are you sure you wish to delete this item?`))
                            this.onDeleteItem(product.id)}}> 
                            Delete
                        </button>
                    </td>
                </tr>
            )
        } 
        else{
            // di render sebagai textbox
            return(
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td><input type='text' 
                    className= 'form-control' 
                    size={8} 
                    value={this.state.selectedName} 
                    onChange={(e) => {this.setState({selectedName:e.target.value})}}/>
                    </td>

                    <td><input type='text' 
                    className= 'form-control' 
                    size={8} 
                    value={this.state.selectedDesc}
                    onChange={(e) => {this.setState({selectedDesc:e.target.value})}}/></td>
                    
                    <td><input type='text' 
                    className= 'form-control' 
                    size={8} 
                    value={this.state.selectedPrice}
                    onChange={(e) => {this.setState({selectedPrice:e.target.value})}}/></td>

                    <td><input type='text' 
                    className= 'form-control' 
                    size={8} 
                    value={this.state.selectedStock}
                    onChange={(e) => {this.setState({selectedPrice:e.target.value})}}/></td>
                    
                    <td><input type='text' 
                    className= 'form-control' 
                    size={8} 
                    value={this.state.selectedPict}
                    onChange={(e) => {this.setState({selectedPict:e.target.value})}}/></td>
                    
                    <td>
                        <button className='btn btn-outline-danger mb-2'
                         onClick= {this.onCancelClick}>
                        Cancel
                        </button>
                    
                    
                        <button className='btn btn-outline-primary'
                         onClick={() => {this.onSaveClick(product.id)}}>
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
