import React, { Component } from 'react';

import {Router, Route, Link} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import Game from './game.js';
import store from './store.js';
import actions from './actions.js';

function Options( props ){
    return(
        <div>
            <button onClick = { props.changeTheme.bind(this, 0) }>HAWAII</button>
            <button onClick = { props.changeTheme.bind(this, 1) }>BOTANIC GARDEN</button>
            <Link className = "option_link"  to='/'>BACK TO MENU</Link>
        </div>
    )
}
let changeTheme = actions.changeTheme
let mapDispatchToOptionProps = {changeTheme}
Options = connect(null, mapDispatchToOptionProps)(Options)
function Record(props){
    return(
         <div className = {`record ${props.style}`}>
            <b>{ props.data.nick }</b> 
            <span>{ props.data.score }</span>
         </div> 
    )
}

class Records extends Component {
  render() {
    return (
        <div className="flex-wrapper">
            <div className = "flex-item">
            <Record  data ={{nick:"nick", score:"score"}} style = "top"/>
                 {this.props.records.records.map( (record, i) => <Record data = {record} key = {i} /> )}
            </div>
            <div  className = "flex-item">
                <Record  data ={{nick:"nick", score:"experience"}} style = "top"/>
                {this.props.records.pointsEarned.map( (record, i) => <Record data = {record} key = {i} /> )}
            </div>
            <Link className = "Link flex-link" to='/'>MENU</Link>
         </div>
        )
  }
}

class Main extends Component {

    saveNickName(){
        if(this.inp.value)
            this.props.setNickName(this.inp.value)
    }
    getLinkStyle(link){
        return {
            
                }
    }
    componentDidMount(){
        this.main.style.backgroundColor = this.props.style.data.linkColors[this.props.style.index]

    }
    componentWillUpdate(){
        
        this.main.style.backgroundColor = this.props.style.data.linkColor[this.props.style.index]
    }

  render() {
    return (
    <div ref ={ main => this.main = main}className = "Main">
        <div className = "nickInput">
            <label>NICKNAME</label>
            <input ref = { inp => this.inp = inp }/>
        </div>
        
        <Link className = "Link" style = {this.getLinkStyle()} to='/game' onClick = { this.saveNickName.bind( this ) } >START </Link>
        <Link className = "Link" style = {this.getLinkStyle()} to='/records'>RECORDS</Link>
        <Link className = "Link" style = {this.getLinkStyle()} to='/options'>OPTIONS</Link>
    </div>
    )
  }
}

let setNickName = actions.setNickName
let mapDispatchToProps = {setNickName}
let mapStateToProps = state => ({ records: state.records,style: state.style })
Main = connect(mapStateToProps, mapDispatchToProps)(Main)
Records = connect( mapStateToProps )(Records)
class App extends Component {
  render() {
    return (
        <Provider store = {store} >
            <Router history = {createHistory()}>
                <div className = "App">
                    {/* <Route path="/chat/:param1/:param2" component = {ChatPage} /> */}
                    <Route path="/" component = { Main } exact />
                    <Route path="/records" component = { Records } exact />
                    <Route path="/game" component = { Game } exact />
                    <Route path="/options" component = { Options } exact />
                </div>
            </Router>
        </Provider>    
    );
  }
}
export default App;
