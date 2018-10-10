import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Router, Route, Link} from 'react-router-dom';

import actions from './actions.js';
import groundSrc from './ground.png'
import crab from './crab.png'
import apple from './food.png'
import beach from './beach2.jpg'
import grass from './grass.jpg'
class Game extends Component{
    constructor(){
        super()
        this.state = { check: false }
    }

    componentDidMount(){
        this.startGame()
    }
    


    startGame(){
        let componentRef = this
        let cvs = this.canvas
        let ctx = cvs.getContext("2d")

        
        let box = 32;

       
        let ground = new Image()
        ground.src = groundSrc;

        let backImg = new Image()
        backImg.src = beach
        let bacKgroundSrc = [beach, grass]
        backImg.src = bacKgroundSrc[this.props.style.index]
        let foodSrc = [crab,apple]

        let foodImg = new Image()
        foodImg.src = foodSrc[ this.props.style.index ]

        // create the snake

        let snake = [];

        snake[0] = {
            x : 9 * box,
            y : 10 * box
        };

        // create the food

        let food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }

        let score = 0

        //control the snake

        let d;

        document.addEventListener("keydown",direction);

        function direction(event){
            let key = event.keyCode;
            if( key == 37 && d != "RIGHT"){
                d = "LEFT";
            }else if(key == 38 && d != "DOWN"){
                d = "UP";
            }else if(key == 39 && d != "LEFT"){
                d = "RIGHT";
            }else if(key == 40 && d != "UP"){
                d = "DOWN";
                
            }
        }

        // cheack collision function
        function collision(head,array){
            for(let i = 0; i < array.length; i++){
                if(head.x == array[i].x && head.y == array[i].y){
                    return true;
                }
            }
            return false;
        }

        // draw everything to the canvas

        function draw(headColor, bodyColor){
        
            
            ctx.drawImage(foodImg,25,25,32,32)
            

            ctx.drawImage(backImg,32,96,544,480)
            // for( let x = 0; x < 17; x++ )
            //     for( let y = 0; y < 15; y++ ){
            //         if(x%2 == y%2)
            //             ctx.fillStyle = "#65EE88";
            //         else
            //             ctx.fillStyle = "#EAEE65"
            //         ctx.fillRect(32 + 32*x, 96 + 32*y, 32, 32)
            //     }

            for( let i = 0; i < snake.length ; i++){
                ctx.fillStyle = ( i == 0 )? headColor : bodyColor;
                ctx.fillRect(snake[i].x,snake[i].y,box,box);
                
                ctx.strokeStyle = "red";
                ctx.strokeRect(snake[i].x,snake[i].y,box,box);
            }
            
            ctx.drawImage(foodImg, food.x, food.y,32,32);
            
            // old head position
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;
            
            // which direction
            if( d == "LEFT") snakeX -= box;
            if( d == "UP") snakeY -= box;
            if( d == "RIGHT") snakeX += box;
            if( d == "DOWN") snakeY += box;
            
            // if the snake eats the food
            if(snakeX == food.x && snakeY == food.y){
                score++;
                food = {
                    x : Math.floor(Math.random()*17+1) * box,
                    y : Math.floor(Math.random()*15+3) * box
                }
                // we don't remove the tail
            }else{
                // remove the tail
                snake.pop();
            }
            
            // add new Head
            
            let newHead = {
                x : snakeX,
                y : snakeY
            }
            
            // game over
            
            if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
                clearInterval(game);
                componentRef.gameOver(score)
            }
            
            snake.unshift(newHead);
            ctx.fillStyle = "grey"
            ctx.fillRect(60,20,100,35)
            ctx.fillStyle = "yellow";
            ctx.font = "45px Changa one";
            ctx.fillText(score,2*box,1.6*box);
        }

        let game = setInterval(draw.bind(this,
            this.props.style.data.snakeColor[this.props.style.index][0],
            this.props.style.data.snakeColor[this.props.style.index][1]

            ),100)

    }
    gameOver(score){
        this.props.sendResult(this.props.nick, score)
        setTimeout( this.setState.bind(this,{ check : true}),1000)
    }

    render(){
        if(!this.state.check)
            return(
                <div>
                    <canvas ref = {field  =>  this.canvas = field }  width="600" height="600"></canvas>
                </div>
            )
        else
            return(
                <div className = "result">
                    <div className = "Link">{ `${this.props.result.nick} : ${this.props.result.score}` }</div>
                    {console.log(this.props.records)}
                    <div className = "Link">game record: {this.props.records.records[0].score}</div>
                    
                    <Link className = "Link" to='/'>MENU</Link>
                </div>
            )
    }
}
let mapStateToProps = state =>({
    nick: state.nickName.nick,
    result: state.gameResult,
    records: state.records,
    style: state.style
})
let sendResult = actions.sendResult
let mapDispatchToProps = {sendResult}
export default connect(mapStateToProps,mapDispatchToProps)(Game);
