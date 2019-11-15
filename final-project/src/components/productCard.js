import React,{Component} from 'react';
import axios from 'axios'
import {
  Card, CardImg, CardText, CardBody,
 CardSubtitle, Button
} from 'reactstrap';
import '../css/product.css'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'

//import {ProductDesc} from './productDesc'
//import Productlist from './productlist'
class ProductCard extends Component{

  state = {
    product_qty: 0,
    def_value:1
  }
  onAddClick = (product_id) => {
    console.log(this.props.user_id);
    
    if(!this.props.user_id){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please log in first'
        
      })
      
    } else {
      
      console.log(product_id)
     axios.get( 
        'http://localhost:1001/carts',
        {
            params: {
                user_id: this.props.user_id,
                product_id: product_id

            }
        }
    ).then((res) => {
        console.log(res.data)
        // Check apakah data ditemukan
        if(res.data.results.length === 0){
            // post cart baru
            axios.post(
                'http://localhost:1001/carts',
                {
                  user_id: this.props.user_id,
                  product_id: this.props.barang.product_id,
                  product_qty :this.state.product_qty
                }
            ).then(res =>{
              this.successAlert()
            })


               
        }else {
            // edit qty
            // res.data[0] = {id, productId, productName, ..., qty} / cart
            // this.qty.value = data dari textboxt
            let newQty = res.data.results[0].product_qty + parseInt(this.state.product_qty)

            axios.patch(
                `http://localhost:1001/carts`,
                {
                    cart_id: `${res.data.results[0].cart_id}`,
                    product_qty: newQty
                }
            ).then(res =>{
              this.successAlert()
            })
        }
    })


    }
    

     
 }   

 successAlert = () => {
  Swal.fire({
    position: 'auto',
    icon: 'success',
    title: 'Cart Added',
    showConfirmButton: false,
    timer: 1500
  })
  
 }
  
render(){
  let{product_id, product_name, product_price, product_stock, product_image} = this.props.barang
  console.log(product_id)
  console.log(this.state.product_qty)
  return (
      
      <div className='col-3 p-2 card-product' style={{borderColor:'#ffff'}} key={product_id}>
      <Card className='row'>
        <CardImg style={{width:"250px",height:"250px",margin:"auto"}} src={'http://localhost:1001/files/products/' + product_image} alt="Card image cap" />
        <CardBody>
          <div>
          <a  href ={`/productdetail/${product_id}`} color='link' style={{color:'black'}}><h6 style={{textAlign:'left'}}>{product_name}</h6></a>
          </div>
           
          <CardSubtitle><h6>IDR {product_price}</h6></CardSubtitle> 
          <div className = 'row'>
          <div className='col-4'>
          <CardText style={{fontSize:'12px', textAlign:'auto'}}>Stock : {product_stock}</CardText>
            </div>
          </div>
          <div className = 'row'>
          <div className = 'col-4 pr-0'>
              <input className='form-control' type="number" min='1' ref= 'productQty'  onChange={e =>this.setState({product_qty:parseInt(e.target.value)})}/> 
          </div>  
              <div className = 'col-8'>
                  <Button className='btn btn-block' onClick={()=>{this.onAddClick(product_id)}}
                      style={{backgroundColor:'#258472', color:'#ffff', textAlign:'center'}}>
                    Add To Cart
                  </Button>    
              </div>
          </div>
        </CardBody>
      </Card>

    </div>
  );
};
}

const mapStateToProps = state => {
  return {
      user_id: state.auth.id
  }
}


export default connect(mapStateToProps)(ProductCard)


//<Button style={{backgroundColor:'#258472', color:'#ffff'}}>Add To Cart</Button>
//<CardText className= 'mr-3'style={{textAlign:'justify'}}>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>