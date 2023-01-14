const tabuleiro = document.querySelector('.tabuleiro');
const personagens = ['kadabra', 'mimikyu', 'slowbro', 'espeon', 'murkrow', 'togepi', 'wobbuffet', 'gloom', 'nickit', 'croagunk', 'glastly', 'drowzee', 'drifloon', 'ralts', 'spinda', 'psyduck'];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let primeiraCarta = '';
let segundaCarta = '';

const fimDeJogo = () => {
  const cartaInativa = document.querySelectorAll('.carta-inativa');
  if (cartaInativa.length === 32) { // 34?
    console.log('Parabéns, você conseguiu!, sua pontuacao eh: ', cartaInativa.length);
    playAgain();
  }
}

const playAgain = () => {
  document.getElementById('btnRestart').style.display = 'flex';
}

const restart = () => {
  document.location.reload(true);
}

const checarCarta = () => {
  const primeiroPersonagem = primeiraCarta.getAttribute('data-personagens');
  const segundoPersonagem = segundaCarta.getAttribute('data-personagens');
  if (primeiroPersonagem === segundoPersonagem) {
    primeiraCarta.firstChild.classList.add('carta-inativa');
    segundaCarta.firstChild.classList.add('carta-inativa');
    primeiraCarta = '';
    segundaCarta = '';
    fimDeJogo();
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove('revele-carta');
      segundaCarta.classList.remove('revele-carta');
      primeiraCarta = '';
      segundaCarta = '';
    }, 500);
  }
}

const reveleCarta = ({target}) => {
  if (target.parentNode.className.includes('revele-carta')) {
    return;
  }
  if (primeiraCarta === '') {
    target.parentNode.classList.add('revele-carta');
    primeiraCarta = target.parentNode;
  } else if (segundaCarta === '') {
    target.parentNode.classList.add('revele-carta');
    segundaCarta = target.parentNode;
    checarCarta();
  }
}

// upload-card or local-card or random-card for back-card or //`url('./css/image/${personagens}.png')`
const imageArray = ["https://images.unsplash.com/photo-1508185159346-bb1c5e93ebb4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=55cf14db6ed80a0410e229368963e9d8&auto=format&fit=crop&w=1900&q=80", "./css/back.png", "./css/back1.jpg"];
const randomNum = Math.floor(Math.random() * imageArray.length);

const selectTypeCardNow = (selectObject) => {
  if (selectObject.value === '0') {
    return `url(` + imageArray[0] + `)`;
  }
  if (selectObject.value === '1') {
    return `url(` + imageArray[randomNum] + `)`;
  }
  if (selectObject.value === '2') {
    return `url(` + imageArray[1] + `)`;
  }
  if (selectObject.value === '3') {
    return `url(` + imageArray[2] + `)`;
  }
}

const createCarta = (personagens, selectTypeCard) => {
  const carta = createElement('div', 'carta');  
  const front = createElement('img', 'face front'); // div.face.front -> // img.card
  const back = createElement('img', 'face back'); // div.face.back -> // img.card
  front.style.backgroundImage = `url('./css/image/${personagens}.png')`;
  carta.appendChild(front);
  back.style.backgroundImage = selectTypeCardNow(selectTypeCard);
  carta.appendChild(back);
  carta.addEventListener('click', reveleCarta);
  carta.setAttribute('data-personagens', personagens);
  return carta;
}

const loadGame = (selectTypeCard) => {
  const duplicatepersonagens = [...
    personagens, ...personagens]
  const shufflyArray = duplicatepersonagens.sort(() => Math.random() - 0.5);
  shufflyArray.forEach((personagens) => {
    const carta = createCarta(personagens, selectTypeCard);
    tabuleiro.appendChild(carta);
  });
}
