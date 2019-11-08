import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

  
// import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux';
import {onLogoutUser} from '../actions'
import "../css/header.css"
import headerLogo from '../images/logo/Comoditea.png'
import cartIcon from '../images/shopping_cart.png'


//import {Link,NavLink} from 'react-router-dom'
class Header extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    onButtonClick = () => {
      this.props.onLogoutUser()
    }
    render() {
      if(!this.props.username){
        return (

              <div style={{borderBottom:'1px solid #d5d8dc' }}>
                    <div id='promo-msg' style={{textAlign:'center', color:'white', backgroundColor:'#CC9966'}}>
                        <div className='container'style={{textAlign:'center', color:'#CC9966', backgroundColor:'#CC9966', fontSize:'7px'}}>
                          ::before
                            <h6 style={{textAlign:'center', color:'white', backgroundColor:'#CC9966', marginTop:'3px'}}>Free domestic shipping with minimum purchase of IDR 50k</h6>
                          ::after
                        </div>
                    </div>
                    <div className='container' style={{backgroundColor:'#ffff'}}>
                        <Navbar light expand="md" style={{backgroundColor:'#ffff',border: '1px solid white'}}>
                            <NavbarBrand href="/" style={{color:'#BEAC74'}}>
                                <img src={headerLogo} height="70" alt="text here"/>
                            </NavbarBrand>
                              <NavbarToggler onClick={this.toggle} />
                              <Collapse isOpen={this.state.isOpen} navbar>
                                  <Nav className="ml-auto" navbar>
                                      <NavItem>
                                            <NavLink className = 'ml-4' href="/register" style= {{fontFamily:'Comfortaa'}}>Register</NavLink>
                                      </NavItem>
                                      <NavItem>
                                            <NavLink className = 'ml-4' href="/login" style= {{fontFamily:'Comfortaa'}}>Log In</NavLink>
                                      </NavItem>
                                  </Nav>
                              </Collapse>
                        </Navbar>
                    </div>
              </div>
                    
        );
      } else if (this.props.username === 'admin'){
        return(
          
              <div style={{borderBottom:'1px solid #d5d8dc' }}>
                  <div id='promo-msg' style={{textAlign:'center', color:'white', backgroundColor:'#CC9966'}}>
                      <div className='container'style={{textAlign:'center', color:'#CC9966', backgroundColor:'#CC9966', fontSize:'7px'}}>
                        ::before
                          <h6 style={{textAlign:'center', color:'white', backgroundColor:'#CC9966', marginTop:'3px'}}>
                              Free domestic shipping with minimum purchase of IDR 50k</h6>
                        ::after
                      </div>
                  </div>
                  <div className='container'>
                    <Navbar light expand="md" style={{backgroundColor:'#ffff',border: '1px solid white'}}>
                        <NavbarBrand href="/" style={{color:'#BEAC74'}}>
                            <img src={headerLogo} height="70" alt="text here"/>
                        </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                      <Nav className="ml-auto" navbar>
                                          <NavItem>
                                              <NavLink href="/shoppingcart">
                                              <img src={cartIcon} height="20" alt="text here"/>
                                              </NavLink>
                                          </NavItem>
                                          <NavItem>
                                              <NavLink className = 'ml-4' href="/shop" style= {{fontFamily:'Comfortaa'}}>Shop
                                              </NavLink>
                                          </NavItem>
                                          <NavItem>
                                              <NavLink className = 'ml-4' href="/" style= {{fontFamily:'Comfortaa'}}>Blog
                                              </NavLink>
                                          </NavItem>
                                          <NavItem>
                                              <UncontrolledDropdown>
                                                  <DropdownToggle className = 'ml-4' nav caret style= {{fontFamily:'Comfortaa'}}>
                                                  hello, {this.props.username}
                                                  </DropdownToggle> 
                                                    <DropdownMenu right>
                                                        <DropdownItem style= {{fontFamily:'Comfortaa'}}>
                                                          Account
                                                        </DropdownItem>
                                                        <DropdownItem href="/paymentverification" style= {{fontFamily:'Comfortaa'}}>
                                                          Payment Verification
                                                        </DropdownItem>
                                                        <DropdownItem/>
                                                        <DropdownItem href="/manage" style= {{fontFamily:'Comfortaa'}}>
                                                          Manage Products
                                                        </DropdownItem>
                                                        <DropdownItem divider />
                                                        <DropdownItem style= {{fontFamily:'Comfortaa'}} onClick={this.onButtonClick}>
                                                          Log Out
                                                        </DropdownItem>
                                                  </DropdownMenu>   
                                              </UncontrolledDropdown>
                                          </NavItem>
                                      </Nav>
                                </Collapse>
                        </Navbar>
                    </div>
              </div>
                  
              

        )
      }
      else{
        return (
              <div style={{borderBottom:'1px solid #d5d8dc' }}>
                  <div id='promo-msg' style={{textAlign:'center', color:'white', backgroundColor:'#CC9966'}}>
                        <div class='container'style={{textAlign:'center', color:'#CC9966', backgroundColor:'#CC9966', fontSize:'7px'}}>
                          ::before
                            <h6 style={{textAlign:'center', color:'white', backgroundColor:'#CC9966'}}>
                              Free domestic shipping with minimum purchase of IDR 50k</h6>
                          ::after
                        </div>
                    </div>
                    <div style={{backgroundColor:'#ffff'}} className='container'>
                      <Navbar light expand="md" style={{backgroundColor:'#ffff',border: '1px solid white'}}>
                          <NavbarBrand href="/" style={{color:'#BEAC74'}}>
                              <img src={headerLogo} height="70" alt="text here"/>
                          </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                              <Collapse isOpen={this.state.isOpen} navbar>
                                  <Nav className="ml-auto" navbar>
                                      <NavItem>
                                          <NavLink href="/shoppingcart">
                                              <img src={cartIcon} height="20" alt="text here"/>
                                          </NavLink>
                                      </NavItem>
                                      <NavItem>
                                          <NavLink className = 'ml-4' href="/shop" style= {{fontFamily:'Comfortaa'}}>Shop</NavLink>
                                      </NavItem>
                                      <NavItem>
                                          <NavLink className = 'ml-4' href="/" style= {{fontFamily:'Comfortaa'}}>Blog</NavLink>
                                      </NavItem>   
                                      <NavItem>
                                          <UncontrolledDropdown>
                                            <DropdownToggle className = 'ml-4' nav caret style= {{fontFamily:'Comfortaa'}}>
                                                hello, {this.props.username}
                                            </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem style= {{fontFamily:'Comfortaa'}} href="/mytransaction">
                                                      My Transaction
                                                    </DropdownItem>
                                                    <DropdownItem style= {{fontFamily:'Comfortaa'}}>
                                                      Account
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem style= {{fontFamily:'Comfortaa'}} onClick={this.onButtonClick}>
                                                      Log Out
                                                    </DropdownItem>
                                                </DropdownMenu>
                                        </UncontrolledDropdown>
                                      </NavItem>
                                  </Nav>
                              </Collapse>
                      </Navbar>
                  </div>
              </div>
              
        )
      }
      
    }
  }

  const mapStateToProps = state => {
    return {
      username : state.auth.username,
      email: state.auth.email
    }
  }
  
  
  export default connect(mapStateToProps,{onLogoutUser})(Header)


/* <div className = 'col-4'>
<a className="navbar-brand" href="/" style={{color:'#BEAC74'}}>
<img src={require("./Commoditea-square-bw.svg")} 
height="120" width="120" alt="text here" />
</a>
</div> */