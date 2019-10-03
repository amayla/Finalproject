import React from 'react'
import '../css/home.css'
import { Jumbotron, Button } from 'reactstrap'
//import { Container, Row, Col } from 'reactstrap'
// import { Button } from 'react-bootstrap'



const Home = (props) => {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3" style={{fontFamily:'Comfortaa'}}>Hello, World!</h1>
          <p className="lead" >This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        
        
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>
        </Jumbotron>
      </div>
    );
  };
  


export default Home