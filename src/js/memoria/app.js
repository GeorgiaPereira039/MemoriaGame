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


const createElement = (tag, className) => {
	const element = document.createElement(tag);
	element.className = className;
	return element;
}

let primeiraCarta = '';
let segundaCarta = '';

const fimDeJogo = () => {
	const cartaInativa = document.querySelectorAll('.carta-inativa');

		if (cartaInativa.length === 34) {
			alert ('Parabéns, você conseguiu!');
			playAgain();
		}
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

	front.style.backgroundImage = `url('./assets/img/${personagens}.png')`;

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
