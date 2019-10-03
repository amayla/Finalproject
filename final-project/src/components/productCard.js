import React,{Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import '../css/product.css'

//import {ProductDesc} from './productDesc'
//import Productlist from './productlist'
class ProductCard extends Component{
  
render(){
  let{id, name, price, stock, picture} = this.props.barang

  return (
    
      <div className='card col-3 p-2 flex-auto card-product' style={{borderColor:'#ffff'}} key={id}>
      <Card >
       
        <CardImg style={{width:"250px",height:"250px",margin:"auto"}} src={picture} alt="Card image cap" />
        <CardBody>
          <CardTitle style= {{textAlign:'auto'}}><h6>{name}</h6></CardTitle>
          <CardSubtitle><h6>IDR {price}</h6></CardSubtitle>
          <CardText style={{fontSize:'10px'}}>Stock : {stock}</CardText>
          <div>
          <Button href ={`/productdetail/${id}`} style={{backgroundColor:'#CC9966', color:'#ffff', textAlign:'center'}}>Description</Button>
          </div>
        </CardBody>
      </Card>

    </div>
  );
};
}

export default ProductCard;


//<Button style={{backgroundColor:'#258472', color:'#ffff'}}>Add To Cart</Button>
//<CardText className= 'mr-3'style={{textAlign:'justify'}}>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>