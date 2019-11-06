import React from 'react'
import "../css/footer.css"
import commoditea from '../images/logo/Commoditea-square-white.png' 


class Footer extends React.Component{
    


    render(){

        return(
            <div style={{background:'#cc9966', paddingTop:'10px'}}>
                    <div className='container' style={{background:'#cc9966'}}>
                    <div class="row">
                            <div class="col-xs-12 col-sm-3 ft-service" id='footer' style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                <img src={commoditea} alt="Commoditea Logo" style={{height:'150px',width:'150px', display:'block',marginLeft:'auto', marginRight:'auto'}}/>  
                            </div>
                            <div class="col-xs-12 col-sm-3 ft-service"  style={{paddingTop:'20px', paddingBottom:'20px'}} id='footer'>
                                <h6>Service <span class="glyphicon glyphicon-plus visible-xs"></span></h6>
                                <hr/>
                                <div class="row ft-service-content">
                                    <div class="col-xs-12 col-sm-6" id='footer'>
                                        <a>Contact Us</a><br/>
                                        <a>FAQs</a><br/>
                                        <a>Shipping</a><br/>
                                    </div>
                                    <div class="col-xs-12 col-sm-6" id='footer'>
                                        <a>Track Order</a><br/>
                                        <a>Exchanges &amp; Returns</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-12 col-sm-3 ft-contact" id='footer' style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                <h6>Company <span class="glyphicon glyphicon-plus visible-xs"></span></h6>
                                <hr/>
                                    <div class="row ft-contact-content">
                                        <div class="col-xs-12 col-sm-6">
                                            <a>About</a><br/>
                                            <a>Careers</a><br/>
                                        </div>
                                        <div class="col-xs-12 col-sm-6" id='footer'>
                                            <a>Wholesale</a><br/>
                                            <a>Catalogs</a><br/>
                                        </div>
                                    </div>
                            </div>
                            <div class="col-xs-12 col-sm-3 ft-contact" style={{paddingTop:'20px', paddingBottom:'20px'}} id='footer'>
                                <h6>Contact Us <span class="glyphicon glyphicon-plus visible-xs"></span></h6>
                                <hr/>
                                <div>
                                <a><img alt="Facebook"/></a>
                                <a><img alt="Instagram"/></a>
                                <a><img alt="Twitter"/></a>
                                <a><img alt="Youtube"/></a>
                            </div>
                        
                            <div id='footer'>
                                <br/>
                                <h6>Customer Service</h6>
                                <div>
                                    <a>+62 21 877 552-7977 | M-F 9AM-6PM </a> 
                                </div>
                            </div>
                            </div>
                    </div>

                    <div className="row" id='footer'>
                        <div className="col-xs-12 col-sm-12 footer-disclaimer" id='footer' style={{paddingBottom:'20px'}}>
                            
                            <div id='footer'style={{textAlign:'center'}}> © 2019 Commoditea <span class="visible-xs"></span><br/>ALL RIGHTS RESERVED.</div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
            


           
        )
    }
}
export default Footer