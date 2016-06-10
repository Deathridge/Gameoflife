import React from 'react';
var rows = 60;
var cols = 80;
var speed = 100;
export default class Game extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {boardState:props.initialBoard};   
        this.updateBoard = this.updateBoard.bind(this); 
        this.countNeighbours = this.countNeighbours.bind(this);
        this.addRemove = this.addRemove.bind(this);
        this.pause = this.pause.bind(this);
        this.startGame = this.startGame.bind(this);
        this.clearGame = this.clearGame.bind(this);
    }
    componentDidMount(){
        var randomState = [];
        var randomStateLine = [];
        var generationCount = 0;
        for(var row=0;row<rows;row++){
            randomStateLine = [];
            for(var col=0;col<cols;col++){
                var random = Math.random();
                if(random < 0.9){
                    randomStateLine.push(0); 
                }else{
                    randomStateLine.push(1);
                }
            }
            randomState.push(randomStateLine);
        }
        randomState[5][5] = 1;
        this.setState({
            boardState: randomState,
            generationCount: generationCount
        }, () => {this.timer = setInterval(this.updateBoard, speed);});     
        
            
    }
    

    updateBoard() {        
        var newBoard = new Array(rows);
        var currentBoard = this.state.boardState;
        for(var row=0;row<this.state.boardState.length;row++){
            newBoard[row]= new Array(cols).fill(0);
            for(var col=0;col<this.state.boardState[row].length;col++){
                var neighbours = this.countNeighbours(row,col,currentBoard);
                
                if(neighbours <= 1 && this.state.boardState[row][col] == 1){
                    newBoard[row][col] =0 ;
                    
                    if(!document.getElementById(row + " " + col).classList.contains("old")){
                        document.getElementById(row + " " + col).classList.remove("old");
                    }
                }
                if(neighbours == 3 && this.state.boardState[row][col] == 0){
                    newBoard[row][col] = 1;
                    if(!document.getElementById(row + " " + col).classList.contains("old")){
                        document.getElementById(row + " " + col).classList.remove("old");
                    }
                }
                
                if((neighbours == 2 || neighbours ==3) && this.state.boardState[row][col] == 1){
                    newBoard[row][col] = 1;
                    if(!document.getElementById(row + " " + col).classList.contains("old")){
                        document.getElementById(row + " " + col).classList.add("old");
                    }
                }

                if(neighbours > 3 && this.state.boardState[row][col] == 1){
                    newBoard[row][col] = 0;
                    
                    if(!document.getElementById(row + " " + col).classList.contains("old")){
                        document.getElementById(row + " " + col).classList.remove("old");
                    }

                }

            }
        }       
            
        
        this.setState({
            boardState: newBoard,
            generationCount: this.state.generationCount + 1

        });
                
    }
    
    addRemove(cell){
        
        var row = 0;
        var col = 0;    
        var classname;  
        var newBoard = this.state.boardState;
        [row,col] = cell.target.id.split(" ");
        cell = cell.target;     
        if(cell.className == "dead"){
            newBoard[row][col] = 1;
            cell.className = "alive";
        }else if(cell.className == "alive" || cell.className == "alive old"){
            newBoard[row][col] = 0;
            cell.className = "dead";
        }

        this.setState({
            boardState: newBoard
        });
        
        
    }

    countNeighbours(cellRow,cellCol,currentBoard){
        var neighbourCount = 0;      
        
        //TOP
        if(cellRow -1 < 0){
            //topmiddle
            if(cellCol - 1>=0 && cellCol + 1 < cols){
                neighbourCount += currentBoard[cellRow][cellCol-1];
                neighbourCount += currentBoard[cellRow+1][cellCol-1];
                neighbourCount += currentBoard[cellRow+1][cellCol];
                neighbourCount += currentBoard[cellRow+1][cellCol+1];
                neighbourCount += currentBoard[cellRow][cellCol+1];
            //topleft
            }else if(cellCol - 1 < 0){
                neighbourCount += currentBoard[cellRow + 1][cellCol+1];
                neighbourCount += currentBoard[cellRow][cellCol+1];
                neighbourCount += currentBoard[cellRow + 1][cellCol];
            //topright
            }else if(cellCol + 1 > cols - 1){
                neighbourCount += currentBoard[cellRow][cellCol-1];
                neighbourCount += currentBoard[cellRow + 1][cellCol-1];
                neighbourCount += currentBoard[cellRow + 1][cellCol];
            }           
        }
        //Left
        if(cellCol - 1 < 0){
            //leftmiddle
            if(cellRow -1 >= 0 && cellRow + 1 < rows){
                neighbourCount += currentBoard[cellRow - 1][cellCol];
                neighbourCount += currentBoard[cellRow - 1][cellCol+1];
                neighbourCount += currentBoard[cellRow][cellCol+1];
                neighbourCount += currentBoard[cellRow + 1][cellCol+1];
                neighbourCount += currentBoard[cellRow + 1][cellCol];
            //leftbottom
            }else if(cellRow +1 > rows -1){
                neighbourCount += currentBoard[cellRow -1][cellCol];
                neighbourCount += currentBoard[cellRow - 1][cellCol+1];
                neighbourCount += currentBoard[cellRow][cellCol+1];
            }
        }
        //Bottom

        if(cellRow + 1 > rows - 1){
            //bottommiddle
            if(cellCol -1 >=0 && cellCol + 1 < cols){
                neighbourCount += currentBoard[cellRow][cellCol-1];
                neighbourCount += currentBoard[cellRow-1][cellCol-1];
                neighbourCount += currentBoard[cellRow-1][cellCol];
                neighbourCount += currentBoard[cellRow-1][cellCol+1];
                neighbourCount += currentBoard[cellRow][cellCol+1];
            //bottomright
            }else if(cellCol + 1 > cols - 1){
                neighbourCount += currentBoard[cellRow][cellCol-1];
                neighbourCount += currentBoard[cellRow-1][cellCol-1];
                neighbourCount += currentBoard[cellRow-1][cellCol];
            }
        }

        //Right
        if(cellCol + 1 > cols - 1){
            //rightmiddle
            if(cellRow -1 >= 0 && cellRow + 1 < rows){
                neighbourCount += currentBoard[cellRow+1][cellCol];
                neighbourCount += currentBoard[cellRow+1][cellCol-1];
                neighbourCount += currentBoard[cellRow][cellCol-1];
                neighbourCount += currentBoard[cellRow-1][cellCol-1];
                neighbourCount += currentBoard[cellRow-1][cellCol];
            }
        }

        //Middle
        if(cellRow - 1 >=0 && cellRow + 1< rows){
            if(cellCol -1 >=0 && cellCol +1 < cols){
                neighbourCount += currentBoard[cellRow][cellCol-1];
                neighbourCount += currentBoard[cellRow -1][cellCol-1];
                neighbourCount += currentBoard[cellRow-1][cellCol];
                neighbourCount += currentBoard[cellRow-1][cellCol+1];
                neighbourCount += currentBoard[cellRow][cellCol+1];
                neighbourCount += currentBoard[cellRow+1][cellCol+1];
                neighbourCount += currentBoard[cellRow+1][cellCol];
                neighbourCount += currentBoard[cellRow+1][cellCol-1];
                
            }
        }       
        
        return neighbourCount;
    }   
    pause(){
        clearInterval(this.timer);
    }

    startGame(){
        this.timer = setInterval(this.updateBoard, speed);
    }

    clearGame(){
        
        var emptyGame = this.state.boardState.map(function(row){
            var gameRow = row.map(function(item){
                return 0;
            });
            return gameRow;
        });

        this.setState({
            boardState: emptyGame
        });
    }
    render() {      
        
        return (
            <div className="gamecontrol">
                <h1>Game of Life!</h1>
                <p>Generations: {this.state.generationCount}</p>
                <div className="gamecontainer">         
                    {
                        this.state.boardState.map(function(item,rowid){
                            var itemcol = [];
                            itemcol = item.map(function(subitem,cellid){
                                if(subitem == 0){
                                    return <div className="dead" id={rowid+" " + cellid} onClick={this.addRemove.bind(this)}></div>
                                }else if(subitem==1){
                                    return <div className="alive" id={rowid+" " + cellid} onClick={this.addRemove.bind(this)}></div>
                                }
                            }.bind(this))   
                            return <div className="game-row">{itemcol}</div>;                                           
                        }.bind(this))
                    }            
                </div>
                <div className="gameButtons">
                    <div className="button" onClick={this.pause}>Pause</div>
                    <div className="button" onClick={this.startGame}>Start</div>
                    <div className="button" onClick={this.clearGame}>Clear</div>
                </div>
            </div>
        );      
    }
}

Game.propTypes = { initialBoard: React.PropTypes.array};
Game.defaultProps = {initialBoard: []};