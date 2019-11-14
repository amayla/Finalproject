import React from 'react'
import '../css/home.css'
import { Jumbotron, Button } from 'reactstrap'
import PromoLeft from '../images/original.gif'
import PromoRight from '../images/306164665201201.jpg'
import PromoBottom from '../images/teas.jpg'
import bgimage from '../images/pattern5.png'
import {Link} from 'react-router-dom'
// import Banner from '../images/TEA_FOR_ALL.png'





const Home = (props) => {
    return (
      <div>
        <Jumbotron style={{ backgroundImage: `url(${bgimage})` }}>
            <h1 className="display-3 container" style={{fontFamily:'Comfortaa', textAlign:'center'}}>Hello, You!</h1>
            <p className="lead container" style={{textAlign:'center'}}>Find our best teas specially curated to suits your indulgence.</p> 
            <div className="container text-center">
              <Button style={{background:"#258472"}}>Shop Now </Button>
            </div>
        </Jumbotron>
        <div className='container'>
            <section id="promos" className="row">
                  <div className="col-xs-12 col-sm-6" id="custom-grabber-1">
                      <Link to="/collections/floral" title="Floral Tea">
                        <img src={PromoLeft} id="image" alt="Floral Tea" style={{width:'100%'}}/> 
                  <div>
                  </div>
                        <h3 id='h3'>Floral Teas</h3>
                        </Link>
                          
                  </div>
                  <div className="col-xs-12 col-sm-6">
                  <Link to="/collections/signature" title="Signature Tea">
                        <img src={PromoRight}  id="image" alt="Signature Tea" style={{width:'100%'}}/>
                  <div>
                  </div>
                        <h3 id='h3'>Signature Teas</h3>
                      </Link>
                  </div>
                  <div style={{marginTop:'2%'}}>
                  </div>
                  <div className="col-xs-12 col-sm-12" style={{marginTop:"3%"}}>
                  <Link to="/collections/fusion" title="Fusion Tea">
                          <img src={PromoBottom} alt="Fusion Teas" style={{width:'100%'}}/>
                  <div>
                  </div>
                          <h3 id='h3'>Fusion Teas</h3>
                  </Link>
                  </div>
    
          </section>

        </div>
        
      </div>
    )
  }
  


export default Home