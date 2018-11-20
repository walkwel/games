import { Checkbox } from "@material-ui/core";

export const mediumBot = `(player, coins) => {
  const directions = ['left', 'right', 'up', 'down'];
  /* coins.sort((k,j) => {
    if(k.x > j.x && k.y > j.y) {return 1}
    else if(k.x < j.x && k.y < j.y) { return 0}
    else {return -1}
  }) */
  let playerX = player.x;
  let playerY = player.y;
  var d = 'down';
  function checkX(gem) {
    console.log('ddd',gem)
    if(playerX +10 > gem.x && playerX - 10 < gem.x){d = 'stop'; console.log('equal',d);checkY(gem)}
    else if(playerX > gem.x){d = 'left'; playerX -= 1; console.log('greater',d)}
    else if(playerX < gem.x){d = 'right'; playerX += 1; console.log('lower',d)}
  }
  function checkY(gem){
    console.log('ddd',gem)
    if(playerY === gem.y){d = 'stop';console.log('equal',d)}
    else if(playerY > gem.y){d = 'up'; playerY -= 1; console.log('greater',d)}
    else if(playerY < gem.y){d = 'down'; playerY += 1; console.log('lower',d)}
    //gems.splice(0,1);
    //nearGem()
  }
  function nearGem(gems, player) {
    gems.sort((k,j) => {
      if(k.x > j.x && k.y > j.y) {return 1}
      else if(k.x < j.x && k.y < j.y) { return 0}
      else {return -1}
    })
    checkX(gems[0])
  }
  nearGem(coins ,player)
  const random = d;
  return d;
}`;
/* 



a = [
  {x:0,y:50},
  {x:30,y:20},
  {x:25,y:15},
  {x:16,y:18},
  {x:32,y:24},
  {x:78,y:31},
  {x:24,y:29},
  {x:12,y:3}
]
gems.sort((k,j) => {
  if(k.x > j.x && k.y > j.y) {return 1}
  else if(k.x < j.x && k.y < j.y) { return 0}
  else {return -1}
})
const gem = {};
function checkX() {
  if(playerX === gem.x){d = 'stop';checkY()}
  else if(playerX > gem.x){d = 'left'; playerX -= 1}
  else if(playerX < gem.x){d = 'right'; playerX += 1}
}
function checkY(){
  if(b.y === playerY){d = 'stop'}
  else if(b.y > playerY){d = 'up'; b.y -= 1}
  else if(b.y < playerY){d = 'down'; b.y += 1}
  gems.splice(0,1);
  nearGem()
} */