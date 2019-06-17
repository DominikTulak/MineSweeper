import React, { Component } from 'react';
import Tile from './Tile';
import {connect} from "react-redux";
import './Game.css';
import { actionCreators } from '../store/Tiles';
let Tiles = [];
let Mines = [];
let w = 1;
let width = 10;
let height = 10;
let mineCount = 15
let revealedTiles = 0;

function TileClass(x,y, generateOutput) {
  this.x = x;
  this.generateOutput = generateOutput;
  this.y = y;
  this.mine = false;
  this.number = 0;
  this.visible = false;
  this.marked = false;
  this.endGame = false;
  
  this.computeNumber = function() {
    this.number = 0;
    if(this.mine){
      this.number = -1;
      return;
    }
    for(let i = -1; i <= 1; i++){
      for (let j = -1; j <= 1; j++){
        if(this.x+i < 0 || this.x+i >= width) {continue;}
        if(this.y+j < 0 || this.y+j >= height) {continue;}
        if(Tiles[this.y+j][this.x+i].mine){
          this.number++;
        }
      }
    }
  }

  this.contains = function(x,y){
    if(x >= this.x && x <= (this.x+1) && y >= this.y && y <= (this.y+1)){return true;}
    return false;
  }

  this.click = function(x,y){
    //console.log("click");
    if(this.marked) {return;}
    if(this.mine) {
      this.revealAll();
    }
    else {
      //revealedTiles++;
      if(this.number == 0){this.revealNeighbours();}
    }
    if(!this.visible && !this.isMine){revealedTiles++;}
    this.visible = true;
    Tiles[this.y][this.x].visible = true;
    this.generateOutput();
    //console.log(this.visible);
    if(revealedTiles == width*height-mineCount){alert("Vyhrál jsi!")}
    this.generateOutput();
  }
  this.revealAll = function() {
    this.visible = true;
    for(let i = 0; i < Tiles.length; i++){
      for (let j = 0; j < Tiles[i].length; j++){
        Tiles[i][j].visible = true;
        Tiles[i][j].endGame = true;
      }
    }
  }
  this.revealNeighbours = function(){   
    if(!this.visible){revealedTiles++;}
    this.visible = true;
    if(this.number == 0){
      for(let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
          if(this.x+i < 0 || this.x+i >= width) {continue;}
          if(this.y+j < 0 || this.y+j >= height) {continue;}
          if(Tiles[this.y+j][this.x+i].visible == true) {continue;}
          Tiles[this.y+j][this.x+i].revealNeighbours();
        }    
      }
    }
    this.generateOutput();
  }
  
  this.mark = function() {
    if(this.marked){
      this.marked = false;
    }
    else {
      this.marked = true;
    }
  }
}


class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            out: []
        }
    }
    componentDidMount(){
      this.generateTiles(this.generateOutput.bind(this));
    }
    generateTiles(generateOutput){
        for(let i = 0; i < height; i++){
          let tiles = [];
          for(let j = 0; j < width; j++){
             tiles[tiles.length] = new TileClass(j, i, generateOutput);
          }
          Tiles[Tiles.length] = tiles;
        }
        this.generateMines(mineCount);
        
    }
    generateOutput(){
        //console.log(Tiles);
        let outp = [];
        let out2 = [];
        let renderOut = [];
        for(let i = 0; i < Tiles.length; i++){
            out2 = [];
            for (let j = 0; j < Tiles[i].length; j++){
                Tiles[i][j].computeNumber();
                out2.push(<Tile number={Tiles[i][j].number} click={Tiles[i][j].click.bind(Tiles[i][j])} isVisible={Tiles[i][j].visible} isMine={Tiles[i][j].mine} endGame={Tiles[i][j].endGame} />);
                //renderOut[renderOut.length] = <Tile />
                //renderOut.push(<Tile number={Tiles[i][j].number} click={Tiles[i][j].click.bind(Tiles[i][j])} isVisible={Tiles[i][j].visible} isMine={Tiles[i][j].mine}/>);
            }
            outp.push(<div className="Row">{out2}</div>);
            
           // out[out.length] = {out2};
        }
        //console.log("tohle");
        //console.log(outp);
        //console.log("update");
        this.props.changeRender(outp);
    }
    
    
    generateMines(cnt){
        this.gen = function(){
          let mine = [Math.floor(Math.random()*width), Math.floor(Math.random()*height)]
          for(let m = 0; m < Mines.length; m++){
            if(Mines[m][0] == mine[0] && Mines[m][1] == mine[1]){
              this.gen();
              break;
            }
          }
          
          if(Mines.includes(mine)) {
            this();
          }
          else {
            Mines[Mines.length] = mine;
            Tiles[mine[1]][mine[0]].mine = true;
          }
        }
        for(let i = 0; i < cnt; i++){
          this.gen();
        }
        //console.log(Mines.length);
        this.generateOutput();
    }
   

    render() {  
    return (
        <div className="Game">
          <div className="Napis1">
            Hledání min
          </div>
          <div className="Napis3">
          Odkrytých políček: {revealedTiles}
          </div>
          <div className="Fields">
              {this.props.rend}
          </div>
          <div className="Napis2">
            Dominik Tulak, 2019
          </div>
        </div>
    );
  }
}
export default connect(
  state => {
    return {
      rend: state.render
    }
  }, {changeRender: actionCreators.changeRender}
)(Game);
