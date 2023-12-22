const X_CALSS='x'
const O_CALSS='o'
const turn=  document.getElementById('plyer-indicator')
const cellElemnets= document.querySelectorAll('[data-cell]')
const winningMsgElement=document.getElementById("winning-msg")
const winningMsg=document.querySelector("[ data-winning-msg-text]")
const restartBtn=document.getElementById('restartbtn')
const winningCondition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let oTurn
startGame()
function startGame(){
  oTurn=false
  turn.innerHTML="X's Turn"
cellElemnets.forEach(cell=>{
  winningMsgElement.classList.remove('show')
  cell.classList.remove(X_CALSS)
  cell.classList.remove(O_CALSS)
  cell.removeEventListener("click",whenClick)
  cell.addEventListener("click",whenClick,{once:true})})
}
  function whenClick(e){
    const cell=e.target
    const currentClass= oTurn?O_CALSS:X_CALSS
    //draw x or O
    drawMark(cell,currentClass)
    if(checkwin(currentClass)){
     endGame(false)
    }else if(isDraw()){
          endGame(true)
    }else{
    swapturns()
    displayTurns()
    }
  }   
  function drawMark(cell,currentClass){
    cell.classList.add(currentClass);
  }

  function checkwin(currentClass){
    return winningCondition.some(combination=>{
       return combination.every(index=>{
         return cellElemnets[index].classList.contains(currentClass)
       })
     })
   }
  function endGame(draw){
    if(draw){
       winningMsg.innerText="Drow!"
    }else{
      winningMsg.innerText=`${oTurn ? "O's":"X's"}Wins!`
    }
    winningMsgElement.classList.add('show')
  }
  function isDraw(){
    return [...cellElemnets].every(cell=>{
      return cell.classList.contains(X_CALSS)||cell.classList.contains(O_CALSS)
    })
  }


  function swapturns(){
    oTurn=!oTurn
  }
  function displayTurns(){
    if(oTurn) {
  turn.innerHTML="O's Turn"
   }else{
    turn.innerHTML="X's Turn"

   }
  }

restartBtn.addEventListener('click',startGame)
