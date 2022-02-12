let order = [];
let clickedOrder = [];
let score = 0;

//* blue = 0;
//* red = 1;
//* yellow = 2;
//* green = 3;
//* leftArrow = 4;
//* rightArrow = 5;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');
const pontuacao = document.getElementById('pontuacao');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const rotateGenius = document.querySelector('.genius');

//* Cria ordem aleatória de cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 6);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for(let i in order){
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

//* Acende a próxima cor
let lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add('selected');
  }, number - 250);

  setTimeout(() => {
    element.classList.remove('selected');
  }, number)
};

//* Checa se os potões clicados são os mesmos da ordem gerada do jogo
let checkOrder = () => {
  for(let i in clickedOrder){
    if(clickedOrder[i] != order[i]){
      gameOver();
      break;
    }
  }

  if(clickedOrder.length == order.length){
    nextLevel();
  }
};

//* Função para o clique do usuário
let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');
  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  },250);
}

//* Função que retorna a cor
let createColorElement = (color) => {
  if(color == 0){
    return blue;
  }else if(color == 1){
    return red;
  }else if(color == 2){
    return yellow;
  }else if(color == 3){
    return green;
  }else if(color == 4){
    return leftArrow;
  }else if(color == 5){
    return rightArrow;
  }
};

//* Função para próximo nível do jogo
let nextLevel = () => {
  pontuacao.innerHTML = `Pontuação: ${score}`;
  score++;
  shuffleOrder();
};

//* Função para game over
let gameOver = () => {
  alert('Você perdeu o jogo!\n Clique em OK para reiniciar um novo jogo');

  order = [];
  clickedOrder = [];
  rotateGenius.style.transform = 'rotate(0deg)'
  playGame();
};

//* Função para iniciar o jogo
let playGame = () => {
  score = 0;
  nextLevel();
};

//* Eventos de clique
blue.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
green.onclick = () => click(3);

//* Rotação horária e antihorária do jogo
leftArrow.onclick = () => {
  rotateGenius.style.transform += 'rotate(90deg)';
  click(4)
};
rightArrow.onclick = () => {
  rotateGenius.style.transform += 'rotate(-90deg)';
  click(5);
};

//* Inicio do jogo
playGame();