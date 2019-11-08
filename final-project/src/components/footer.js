import React from 'react'
import "../css/footer.css"
import commoditea from '../images/logo/Commoditea-square-white.png' 


class Footer extends React.Component{
    


    render(){

        return(
            <div style={{background:'#cc9966', paddingTop:'10px'}}>
                    <div className='container' style={{background:'#cc9966'}}>
                    <div className="row">
                            <div className="col-xs-12 col-sm-3 ft-service" id='footer' style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                <img src={commoditea} alt="Commoditea Logo" style={{height:'150px',width:'150px', display:'block',marginLeft:'auto', marginRight:'auto'}}/>  
                            </div>
                            <div className="col-xs-12 col-sm-3 ft-service"  style={{paddingTop:'20px', paddingBottom:'20px'}} id='footer'>
                                <h6>Service <span className="glyphicon glyphicon-plus visible-xs"></span></h6>
                                <hr/>
                                <div className="row ft-service-content">
                                    <div className="col-xs-12 col-sm-6" id='footer'>
                                        <a href='/'>Contact Us</a><br/>
                                        <a href='/'>FAQs</a><br/>
                                        <a href='/'>Shipping</a><br/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6" id='footer'>
                                        <a href='/'>Track Order</a><br/>
                                        <a href='/'>Exchanges &amp; Returns</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-3 ft-contact" id='footer' style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                <h6>Company <span className="glyphicon glyphicon-plus visible-xs"></span></h6>
                                <hr/>
                                    <div className="row ft-contact-content">
                                        <div className="col-xs-12 col-sm-6">
                                            <a href='/'>About</a><br/>
                                            <a href='/'>Careers</a><br/>
                                        </div>
                                        <div className="col-xs-12 col-sm-6" id='footer'>
                                            <a href='/'>Wholesale</a><br/>
                                            <a href='/'>Catalogs</a><br/>
                                        </div>
                                    </div>
                            </div>
                            <div className="col-xs-12 col-sm-3 ft-contact" style={{paddingTop:'20px', paddingBottom:'20px'}} id='footer'>
                                <h6>Contact Us <span className="glyphicon glyphicon-plus visible-xs"></span></h6>
                                <hr/>
                                <div>
                                <a href='/'><img alt="Facebook"/></a>
                                <a href='/'><img alt="Instagram"/></a>
                                <a href='/'><img alt="Twitter"/></a>
                                <a href='/'><img alt="Youtube"/></a>
                            </div>
                        
                            <div id='footer'>
                                <br/>
                                <h6>Customer Service</h6>
                                <div>
                                    <a href='/'>+62 21 877 552-7977 | M-F 9AM-6PM </a> 
                                </div>
                            </div> 
                            </div>
                    </div>

                    <div className="row" id='footer'>
                        <div className="col-xs-12 col-sm-12 footer-disclaimer" id='footer' style={{paddingBottom:'20px'}}>
                            
                            <div id='footer'style={{textAlign:'center'}}> © 2019 Commoditea <span className="visible-xs"></span><br/>ALL RIGHTS RESERVED.</div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
            


           
        )
    }
}
export default Footer