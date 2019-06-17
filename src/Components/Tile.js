import React, { Component } from 'react';
import './Tile.css';
class Tile extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:this.props.x+"  "+this.props.y,
            mine:false,
            visible:true
        }
    }
    handleClick(e){
      this.props.click(this.props.x, this.props.y);
    }
    text(){
      console.log(this.props.number);
      if(this.props.isVisible){return this.props.isMine ? "M":this.props.number;} else {return "X"}
    }
    render() {
    
    return (
      //<div className="Tile" onClick={(e) => {e.preventDefault(); this.handleClick(); }} style={{background:!this.props.isVisible?'#C2DFFF':this.props.isMine?this.props.endGame?'red':'white':'white'}}>{this.props.isVisible? (this.props.number == 0 || this.props.number == -1)?'':this.props.number:this.props.isMine?"M":"-"}</div>
      <div className="Tile" onClick={(e) => {e.preventDefault(); this.handleClick(); }} style={{background:!this.props.isVisible?'#38ACEC':this.props.isMine?this.props.endGame?'red':'white':'white'}}>{this.props.isVisible? (this.props.number == 0 || this.props.number == -1)?'':this.props.number:""}</div>
    );
    
  }
}

export default Tile;
