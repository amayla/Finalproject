import React,{Component} from 'react';
import axios from 'axios'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import '../css/product.css'
import Quicklook from './quicklook'
import {connect} from 'react-redux'

//import {ProductDesc} from './productDesc'
//import Productlist from './productlist'
class ProductCard extends Component{

  state = {
    product_qty: 0
  }
  onAddClick = (product_id) => {
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
            )
               
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
            )
        }
    })

     
 }   
  
render(){
  let{product_id, product_name, product_price, product_stock, product_picture} = this.props.barang
  console.log(this.state.product_qty)
  return (
      
      <div className='col-3 p-2 card-product' style={{borderColor:'#ffff'}} key={product_id}>
      <Card className='row'>
        <CardImg style={{width:"250px",height:"250px",margin:"auto"}} src={product_picture} alt="Card image cap" />
        <CardBody>
          <CardTitle style= {{textAlign:'auto'}}><h6>{product_name}</h6></CardTitle>
          <CardSubtitle><h6>IDR {product_price}</h6></CardSubtitle> 
          <div className = 'row'>
          <div className='col-4'>
          <CardText style={{fontSize:'12px', textAlign:'auto'}}>Stock : {product_stock}</CardText>
            </div>
            <div className='col-4' style={{fontSize:'12px', textAlign:'auto'}}>
             <Quicklook/>
            </div>
            <div className='col-4'>
            <CardText><Button className='btn-block mb-2'href ={`/productdetail/${product_id}`} color='link' style={{color:'black', fontSize:'12px'}}>Description</Button></CardText>
            </div>
          </div>
          <div className = 'row'>
          <div className = 'col-4 pr-0'>
              <input className='form-control' type="number" min='0' ref= 'productQty' onChange={e =>this.setState({product_qty:parseInt(e.target.value)})}/> 
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