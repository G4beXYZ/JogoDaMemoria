// Array com pares de valores para o jogo da memória
let cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
let cards = [...cardsArray]; // Duplica o array para ter pares
let selectedCards = []; // Cartas selecionadas para comparação
let matchedCards = []; // Cartas já combinadas

// Função para embaralhar cartas
function shuffleCards(array) {
  array.sort(() => 0.5 - Math.random());
}

// Função para criar uma carta
function createCard(cardValue) {
  const flipCard = document.createElement('div');
  flipCard.classList.add('flip-card');

  const flipCardInner = document.createElement('div');
  flipCardInner.classList.add('flip-card-inner');

  const flipCardFront = document.createElement('div');
  flipCardFront.classList.add('flip-card-front');

  const flipCardBack = document.createElement('div');
  flipCardBack.classList.add('flip-card-back');
  flipCardBack.textContent = cardValue; // O valor da carta será mostrado aqui

  flipCardInner.appendChild(flipCardFront);
  flipCardInner.appendChild(flipCardBack);
  flipCard.appendChild(flipCardInner);

  return flipCard;
}

// Função para virar a carta
function flipCard(cardElement) {
  const flipCardInner = cardElement.querySelector('.flip-card-inner');
  if (!flipCardInner.classList.contains('is-flipped')) {
    flipCardInner.classList.add('is-flipped');
    selectedCards.push(cardElement);

    // Verifica se há duas cartas selecionadas para comparação
    if (selectedCards.length === 2) {
      setTimeout(checkMatch, 300);
    }
  }
}
function flipCardHandler() {
  flipCard(this);
}
// Função para verificar se as cartas combinam
function checkMatch() {
  const [cardOne, cardTwo] = selectedCards;

  if (cardOne.querySelector('.flip-card-back').textContent === cardTwo.querySelector('.flip-card-back').textContent) {
    matchedCards.push(cardOne, cardTwo);
    // Desvincula o evento de clique para cartas correspondentes
    cardOne.removeEventListener('click', flipCardHandler);
    cardTwo.removeEventListener('click', flipCardHandler);
  } else {
    // Desvira as cartas que não correspondem após um pequeno atraso
    setTimeout(() => {
      cardOne.querySelector('.flip-card-inner').classList.remove('is-flipped');
      cardTwo.querySelector('.flip-card-inner').classList.remove('is-flipped');
    }, 100);
  }

  // Limpa a seleção de cartas para o próximo turno
  selectedCards = [];

  // Verifica se o jogo terminou
  if (matchedCards.length === cards.length) {
    // Aguarda a animação de flip terminar antes de exibir a mensagem
    setTimeout(() => {
      alert('Parabéns! Você encontrou todas as combinações.');
      document.getElementById('startButton').style.display = 'block';
    }, 100);
  }
}
// Função para iniciar o jogo
function startGame() {
  shuffleCards(cards);
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = ''; // Limpa o tabuleiro do jogo
  cards.forEach((cardValue) => {
    const card = createCard(cardValue);
    card.addEventListener('click', flipCardHandler);
    gameBoard.appendChild(card);
  });
  matchedCards = [];
  selectedCards = [];
}

// Evento para iniciar o jogo quando o botão for clicado
document.getElementById('startButton').addEventListener('click', function() {
  startGame();
  this.style.display = 'none';
});
