const tabuleiro = document.querySelector('.tabuleiro');
const personagens = [
	'kadabra',
	'mimikyu',
	'slowbro',
	'espeon',
	'murkrow',
	'togepi',
	'wobbuffet',
	'gloom',
	'nickit',
	'croagunk',
	'glastly',
	'drowzee',
	'drifloon',
	'ralts',
	'spinda',
	'psyduck',
];

const setGamePoint = (statusGame, codeStatusGame) => {
  return localStorage.setItem(statusGame, codeStatusGame);
};

const getGamePoint = (codeStatusGame) => {
  return localStorage.getItem(codeStatusGame);
};

const createElement = (tag, className) => {
	const element = document.createElement(tag);
	element.className = className;
	return element;
}

let primeiraCarta = '';
let segundaCarta = '';

const fimDeJogo = () => {
	const cartaInativa = document.querySelectorAll('.carta-inativa');
	const para = document.createElement("p");
		if (cartaInativa.length === 32) { // 34????
			para.innerText = cartaInativa.length;
			document.body.appendChild(para);
			//alert('Parabéns, você conseguiu'); //console.log('Parabéns, você conseguiu!'); 
			//setGamePoint('statusGame','aceito');
			//setGamePoint('pontuacao', cartaInativa.length);
			//playAgain();
		}
		//const statusGame = getGamePoint("statusGame"); // console.log(estadoJogo);
		//const pontuacao = getGamePoint("pontuacao"); // console.log(pontuacao);
		//const para = document.createElement("p");
		//if (statusGame=='aceito') {
		//console.log('statusGame?', statusGame);
		// exibindo pontuacao
		// console.log('pontuacao?', pontuacao); // 32 cartas = 32 pontos por jogo
		//if(pontuacao==32) {
		// exibindo pontuacao
		//console.log('pontuacao?', pontuacao); // 32 cartas = 32 pontos por jogo
		//para.innerText = pontuacao;
		//document.body.appendChild(para);
		//}
		//}
}

function playAgain() {
	document.getElementById('btnRestart').style.display = 'flex';
}

function restart () {
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

const createCarta = (personagens) => {
	const carta = createElement('div', 'carta');
	const front = createElement('div', 'face front');
	const back = createElement('div', 'face back');
	front.style.backgroundImage = `url('./css/image/${personagens}.png')`;
	carta.appendChild(front);
	carta.appendChild(back);
	carta.addEventListener('click', reveleCarta);
	carta.setAttribute('data-personagens', personagens)
	return carta;
}

const loadGame = () => {
	const duplicatepersonagens = [ ...personagens, ...personagens]
	const shufflyArray = duplicatepersonagens.sort(() => Math.random() - 0.5);
	shufflyArray.forEach((personagens) => {
		const carta = createCarta(personagens);
		tabuleiro.appendChild(carta);
	});
}
loadGame();
