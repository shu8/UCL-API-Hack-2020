import React from 'react';
import {
    Card,
    Button} from "react-bootstrap"

export default class Societies extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            societies:[{
                name: "s1",
                desc : "s1 desc"
            }, {
                name: "s2",
                desc: "s2 desc"
            }]
        }
    }
    componentDidMount(){

    }

    
    render(){
        return (

            <div>


                <title>
                    Societies
                </title>

                <h1 align="center">Societies</h1>


                 
                <img src= "images/societies-logo.png" width ="220" height= "130" align="middle"></img>
                
                {
                    this.state.societies.map(soc => {
                        return (
                            <Card style={{ width: '18rem' }}>
                               <Card variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>{soc.name}</Card.Title>
                                    <Card.Text> {soc.desc}: <br/>
                                    This is where the socity describtion will go. <br/>
                                    </Card.Text>
                                    <Button variant="primary"> Go to socity page </Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }

                
                
            </div>
            
            
           
        )
        

    }
}

