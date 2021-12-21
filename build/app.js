console.log("it's working");
class Hangman {
    words;
    guessedCharactersInWord;
    attempts;
    word;
    charsInWord;
    constructor(randomWords) {
        this.words = randomWords;
        this.guessedCharactersInWord = [];
        this.attempts = 6;
        this.word = this.randomWord(this.words);
        this.charsInWord = this.word.split('', this.word.length);
        this.charsInWord.forEach(() => {
            this.guessedCharactersInWord.push('_');
        });
        this.writeAlphabetToTheDom();
        this.addDashes();
        this.addAttempsToTheDOM(this.attempts);
    }
    randomNumber = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    };
    randomWord(array) {
        const randomWordFromArray = this.words[this.randomNumber(0, array.length - 1)];
        return randomWordFromArray;
    }
    checkIfArrayIsEqual = (array1, array2) => {
        let index = 0;
        let counter = 0;
        if (array1.length === array2.length) {
            array1.forEach(() => {
                if (array1[index] === array2[index]) {
                    counter += 1;
                }
                index += 1;
            });
        }
        if (counter === array1.length) {
            return true;
        }
        return false;
    };
    inArray = (char, array) => {
        const count = array.length;
        for (let i = 0; i < count; i += 1) {
            if (array[i] === char) {
                return true;
            }
        }
        return false;
    };
    addDashes = () => {
        const length = this.charsInWord.length;
        const listWithLetters = document.querySelector('#letters');
        for (let i = 0; i < length; i += 1) {
            const listItem = document.createElement('li');
            listItem.setAttribute('id', `char${i}`);
            listWithLetters.appendChild(listItem).innerHTML = '_';
        }
    };
    addGuessedLetterToDOM = (charIndex) => {
        document.querySelector(`#char${charIndex}`).innerHTML = this.charsInWord[charIndex];
    };
    addAttempsToTheDOM = (numberOfAttempts) => {
        const attemptINDOM = document.querySelector('#attempt');
        attemptINDOM.innerHTML = numberOfAttempts.toString();
    };
    charOnWichIndex = (array, char) => {
        let index = 0;
        array.forEach(() => {
            if (array[index] === char) {
                this.guessedCharactersInWord[index] = char;
                console.log(this.guessedCharactersInWord);
                this.addGuessedLetterToDOM(index);
            }
            index += 1;
        });
    };
    whenEvent = (element) => {
        const target = element.target;
        const e = target.getAttribute('id');
        if (this.inArray(e, this.charsInWord)) {
            this.charOnWichIndex(this.charsInWord, e);
        }
        else {
            this.attempts -= 1;
            this.addAttempsToTheDOM(this.attempts);
        }
        const listItem = document.querySelector(`#${e}`);
        listItem.classList.add('idle');
        const wordInDOM = document.querySelector('#letters');
        const keyboardInDOM = document.querySelector('#keyboard');
        if (this.checkIfArrayIsEqual(this.guessedCharactersInWord, this.charsInWord)) {
            wordInDOM.classList.add('winner');
            keyboardInDOM.classList.add('idle');
        }
        if (this.attempts <= 0) {
            wordInDOM.classList.add('lost');
            keyboardInDOM.classList.add('idle');
        }
    };
    writeAlphabetToTheDom() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const lettersINDOM = document.querySelector('#keyboard');
        alphabet.forEach((element) => {
            const divKey = document.createElement('div');
            divKey.id = element;
            divKey.classList.add('key');
            divKey.innerHTML = element;
            lettersINDOM.append(divKey);
            divKey.addEventListener('click', this.whenEvent);
        });
    }
}
const randomWordArray = ['hallo', 'appel', 'okeej', 'aandacht', 'welkom', 'scooters'];
function init() {
    const hangman = new Hangman(randomWordArray);
}
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map