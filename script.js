// DOCUMENT READY
// $(function() {

    // namespace object
    const cardGame = {};

    cardGame.cardDeck = ['rightCard'];
    cardGame.counter = 0;
    cardGame.bestStreakCounter = 0;

    cardGame.$result = $('.result-text');
    cardGame.$cards = $('.card-grid');
    cardGame.$counters = $('.counter-div');
    cardGame.$counterText = $('.streak-counter');
    cardGame.$bestStreakText = $('.best-streak-counter');
    cardGame.$buttons = $('.buttons');

    cardGame.rightGuessText = ["That's the correct card! Good job! :)", "You picked the right card! *victory music*", "Wow! You must be psychic! That was the right card!"];
    cardGame.wrongGuessText = ["You picked the wrong card! Game over! :(", "Ah, so close but not quite! That was the wrong card!", "Wrong card! Better luck next time!"]

    cardGame.displayRightText = function() {
        const text = Math.floor(Math.random() * cardGame.rightGuessText.length);
        cardGame.$result.text(cardGame.rightGuessText[text]);
    };

    cardGame.displayWrongText = function() {
        const text = Math.floor(Math.random() * cardGame.wrongGuessText.length);
        cardGame.$result.text(cardGame.wrongGuessText[text]);
    };

    // start button - to begin game
    cardGame.$buttons.on('click', '.start-button', function() {
        cardGame.newRound();
        cardGame.hideButton();
    });

    cardGame.hideButton = function() {
        cardGame.$buttons.html('');
    };

    // set up new round
    cardGame.newRound = function() {
        cardGame.$cards.html(''); // remove all cards off screen
        cardGame.addNewCard();
        cardGame.shuffleCards();
        cardGame.rearrangeCardGrid();
        cardGame.displayCards();
        cardGame.$counters.css('display', 'block'); // show counters
        cardGame.hideButton();
        cardGame.$result.text('Which one is the correct card? Choose carefully!');
    };

    cardGame.addNewCard = function() {
        cardGame.cardDeck.push('wrongCard');
    };

    // Shuffle card (Fisher-Yates algorithm)
    cardGame.shuffleCards = function() {
        for (let i = cardGame.cardDeck.length - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const currentCard = cardGame.cardDeck[i];
            const cardToSwap = cardGame.cardDeck[newIndex];
            cardGame.cardDeck[i] = cardToSwap;
            cardGame.cardDeck[newIndex] = currentCard;
        };
    };

    cardGame.displayCards = function() {
        for (let i = 0; i < cardGame.cardDeck.length; i++) {
            let newCard = '';
            if (cardGame.cardDeck[i] === 'rightCard') {
                newCard = `
                    <img class="right-card click-enabled" src="./assets/card-back.png">
                `;
            } else {
                newCard = `
                    <img class="wrong-card click-enabled" src="./assets/card-back.png">
                `;
            };
            cardGame.$cards.append(newCard);
        };
    };

    // Right guess
    cardGame.$cards.on('click', '.right-card', function() {
        $(this).attr('src', './assets/right-card.png');
        cardGame.displayRightText();
        cardGame.disableClick();
        cardGame.$buttons.html(`
            <button class="continue-button">Continue</button>
        `);
        cardGame.counter++;
        cardGame.$counterText.text(cardGame.counter);
    });

    //  Wrong guess
    cardGame.$cards.on('click', '.wrong-card', function() {
        $(this).attr('src', './assets/wrong-card.png');
        cardGame.displayWrongText();
        cardGame.disableClick();
        cardGame.$buttons.html(`
            <button class="play-again-button">Play Again?</button>
        `);
    });

    // disable cards/events after guessing right or wrong
    cardGame.disableClick = function() {
        cardGame.$cards.children().removeClass('click-enabled right-card wrong-card');
    };

    // "continue" button - to new round
    cardGame.$buttons.on('click', '.continue-button', function() {
        cardGame.newRound();
    });

    // play again button - if game over
    cardGame.$buttons.on('click', '.play-again-button', function() {
        cardGame.resetGame();
    });

    // Reset game after game over
    cardGame.resetGame = function() {
        cardGame.bestStreakCheck();
        cardGame.counter = 0;
        cardGame.cardDeck = ['rightCard'];
        cardGame.$cards.html(`
            <img src="./assets/right-card.png">
        `);
        cardGame.$counterText.text(cardGame.counter);
        cardGame.$bestStreakText.text(cardGame.bestStreakCounter);
        cardGame.$counters.css('display', 'none');
        cardGame.$buttons.html(`
            <button class="start-button">Start Game</button>
        `);
        cardGame.$result.text("The card you're looking for is below. When the game starts, you will be given two cards face down. Guess which card is the right one. If you get it right, you move on to the next round where an additional card is added. If you get it wrong, it's game over. Good luck!");
    };

    // only works if you don't refresh page
    cardGame.bestStreakCheck = function() {
        if (cardGame.counter > cardGame.bestStreakCounter){
            cardGame.bestStreakCounter = cardGame.counter;
        };
    };

    cardGame.rearrangeCardGrid = function() {
        if (cardGame.cardDeck.length > 4) {
            cardGame.$cards.children().css({'max-width':'', 'height':'calc(50% - 40px)'});
        } else {
            cardGame.init();
        }
    };

    cardGame.init = function() {
        cardGame.$cards.children().css('max-width', 'calc(25% - 40px)');
    };
    
// document ready - setting up card size
$(function() {
    cardGame.init();
});

// });