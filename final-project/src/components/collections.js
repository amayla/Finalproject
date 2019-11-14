import React,{Component} from 'react'
import Axios from 'axios';
import ProductCard from './productCard'



//import Link from 'react-router-dom'


class Collections extends Component{
    state = {
        products: []
        
    }

    componentDidMount(){
        this.getData()
    }




    getData = () => {
        console.log(this.props.location)

        Axios.get(
            `http://localhost:1001/productscat`,
            {params:{
                category: this.props.location.pathname.split("/")[2]
            }} 

        ).then(res => {
            
            
            this.setState({
                products: res.data.results
            })
            
    
        })
        
    }

    renderList = () => {
        return this.state.products.map((val, index) => {
            return <ProductCard barang={val} key={index} />
        })
    }

    

    render() {
        if(this.state.products.length > 0){
            return (
            
                <div className='container' style={{textAlign:"left"}}>
                    <div>   
                        <div className='form p-3 card-title'>
                            <div className='border-bottom border-secondary card-title'>
                                <h4>Collections</h4>
                            </div>
                            <div className='border-bottom border-secondary card-title'>
                                <br/>
                                <p style={{textAlign:'center',width:'90%'}} className='container' >
                                People love floral inspired teas for the same reason they love flowers - the aroma. It’s scent 
                                as a tea is just as strong as it’s natural scent. And in terms of taste, people may not 
                                associate flowers with something that is eatable, but it is. Butterflies and birds are not the 
                                only species that can enjoy a flowers sweet nectar juices, humans can too! <br/>
                                Floral teas taste varies from very sweet to pretty mild or pungent. But it all depends on the type. So don’t be 
                                a shrinking violet, read below for specific flower types and find the perfect floral tea for you!
                                </p>
                                <br/>
                                
                            </div>
                        </div>
                    <div className='row col-12'style={{borderColor:'#ffff'}}>
                        {this.renderList()}
                    </div>
                </div>
                </div>
            )
        } else {
            return null
        }
    }
}

export default Collections