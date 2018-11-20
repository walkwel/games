export const easyBot = `(player, coins) => {
  const directions = ['left', 'right', 'up', 'down'];
  const random = Math.floor(Math.random() * 4);
  return directions[random];
}`;
