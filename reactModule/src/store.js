import { createStore,combineReducers } from 'redux';

let nickReducer = (state, action) => {
  if (state === undefined){
      return {}
  }
   if (action.type === 'NICK_INSERTED'){ 
       return { nick: action.nick } 
   }
  return state
}

let resultReducer = (state, action) => {
  if (state === undefined){
      return "unknown"
     }
  if (action.type === 'GAME_OVER'){
      return { nick: action.nick,
               score: action.score
      } 
  }
  
  return state
}

let recordsReducer = (state, action) => {
  if(state === undefined)
    {
      try{

        return JSON.parse(localStorage.recordsData)
      }
      catch(erorr) {
        return {records:[], pointsEarned:[]}
      }
    }

  if(action.type === "GAME_OVER"){
    state.records = insertRecord(state.records, action)
    state.pointsEarned = getPoints(state.pointsEarned, action)
    localStorage.setItem("recordsData", JSON.stringify(state));
    return state
  }   
  return state 
}

let themeReducer = (state,action) => {
  if(state == undefined){
    let state = {}
    state.data = getStyles()
    state.index = 0
    return state
  }
  if(action.type == "CHANGE_THEME"){
      changeBackground(action.index)
      state.index = action.index
      return state
  }
  return state
}


const reducers = combineReducers({ 
  nickName: nickReducer,
  gameResult : resultReducer,
  records : recordsReducer,
  style : themeReducer 
})

const store = createStore(reducers)

function insertRecord(array, userRecord){
  function compareNumbers(a, b){
    return b.score - a.score
  }
  
  array.push(userRecord)
  array.sort(compareNumbers)
  array.length = 10;
  return array
}

function getPoints(array, userRecord){
	for(let record of array ){
		if( userRecord.nick == record.nick ){
      record.score += userRecord.score
      array.sort(compareNumbers)
			return array
		}
	}
	function compareNumbers(a, b){
	  return b.score - a.score
  }
	array[array.length] = userRecord
  array.sort(compareNumbers)
	return array
}

function changeBackground(index){
  let images = [
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/black-sand-beach-punalu-u-beach-1489522998.jpg",
     "https://cdn-images-1.medium.com/max/2000/1*Yd2JS7Jo7W6DHf6VBmGnIg.jpeg"
  ]
  document.body.style.backgroundImage = `url(${images[index]})`
}
function getStyles(){
  let styles = 
    {
      fieldColors: [
                      ["#EED765", "#EAEE65"],
                      ["#53EBDB","#3E7DD4"]
                   ],
      snakeColor: [
                    ["#FF7F50","#FFE4C4"],
                    ["#A52A2A", "#D67EAD"]
                  ],
      linkColors: [
                    ["rgb(168, 136, 30)"],
                    ["#6FDD9E"]
                  ]                        

    }
  return styles
}

export default store