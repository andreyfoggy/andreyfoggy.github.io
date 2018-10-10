function setTrue(){
  return {
      type: 'TRUE'
  }
}

function sendResult( nick, score ){
  return {
      type: 'GAME_OVER',
      nick,
      score
  }
}

function setNickName( nick ){
  return{
    type: "NICK_INSERTED",
    nick
  }
}

function changeTheme ( index ){
  return{
    type: "CHANGE_THEME",
    index
  }
}
export default {setTrue, sendResult,setNickName,changeTheme}