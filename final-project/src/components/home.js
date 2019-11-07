import React from 'react'
import '../css/home.css'
import { Jumbotron, Button } from 'reactstrap'
// import bodyLeft from '../images/image-left.jpg'
// import bodyRight from '../images/home-right.jpg'



const Home = (props) => {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3 container" style={{fontFamily:'Comfortaa', textAlign:'center'}}>Hello, World!</h1>
          <p className="lead container" >This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        
        
          <div className="container text-center">
            <Button style={{background:"#258472"}}>Learn More</Button>
          </div>
        </Jumbotron>
        <div className='container'>
        <section id="promos" class="row">
          <div className="col-xs-12 col-sm-6" id="custom-grabber-1">
              <a href="" title="Turmeric Tea" >
                <img src="https://s3.amazonaws.com/cdn.rishi-tea.com/images/Promo/Turmeric-Tea-Promo.jpg" id="image" alt="Turmeric Tea" style={{width:'100%'}}/>
                <div class="promo-overlay">
                </div>
                <h3 id='h3'>Turmeric Tea</h3>
              </a>        
          </div>
          <div className="col-xs-12 col-sm-6">
              <a href="" title="Fall Favorites Tea">
                <img src="https://s3.amazonaws.com/cdn.rishi-tea.com/images/Promo/Fall-Favorites-2019.png"  id="image" alt="Fall Favorites Tea" style={{width:'100%'}}/>
                <div class="promo-overlay">
                </div>
                <h3 id='h3'>Fall Favorites</h3>
              </a>
          </div>
          <div style={{marginTop:'2%'}}>
          <div className="col-xs-12 col-sm-12">
              <a href="" title="Curated Brewing Vessels">
                <img src="https://s3.amazonaws.com/cdn.rishi-tea.com/images/Promo/TeapotPromo.jpg" alt="Form and Function" style={{width:'100%'}}/>
                <div class="promo-overlay">
                </div>
                <h3 id='h3'>Form and Function</h3>
              </a>
          </div>

          </div>
          
      </section>

        </div>
        
      </div>
    )
  }
  


export default Home