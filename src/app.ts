console.log("it's working");

class Hangman {
  words: string[];

  guessedCharactersInWord: string[];

  attempts;

  word: string;

  charsInWord: string[];

  /**
   *
   * @param randomWords
   */
  constructor(randomWords: string[]) {
    this.words = randomWords;
    this.guessedCharactersInWord = [];
    this.attempts = 6;
    this.word = this.randomWord(this.words);
    this.charsInWord = this.word.split('', this.word.length);
    this.charsInWord.forEach(() => {
      this.guessedCharactersInWord.push('_');
    });
    // zou de inIt functie zijn
    // write the alphabet keyboard to the DOM
    this.writeAlphabetToTheDom();
    // write the dashes to the DOM
    this.addDashes();
    // write total of attempts in the DOM
    this.addAttempsToTheDOM(this.attempts);
  }

  /**
  * vind een random nummer
  *
  * @param min minimun of the random nummer
  * @param max maximin of the random nummer
  * @returns random nummer
  */
  // eslint-disable-next-line arrow-body-style
  randomNumber = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min) + min);
  };

  /**
   * finds a random word in a array with strings
   *
   * @param array the array with strings
   * @returns returns a random element from a array
   */
  randomWord(array: string[]): string {
    const randomWordFromArray = this.words[this.randomNumber(0, array.length - 1)];
    return randomWordFromArray;
  }

  /**
   * checks if the arrays are equal
   *
   * @param array1 first array you want to check
   * @param array2 second array you want to check
   * @returns h
   */
  checkIfArrayIsEqual = (array1: string[], array2: string[]): boolean => {
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

  /**
   * checkt of een bepaalde char in de string zit.
   *
   * @param char de char die je wilt cheken
   * @param array je wilt weten of de char in deze array zit
   * @returns boolean die aangeeft of de char in de array zit of niet
   */
  inArray = (char: string, array: string[]): boolean => {
    const count = array.length;
    for (let i = 0; i < count; i += 1) {
      if (array[i] === char) {
        return true;
      }
    }
    return false;
  };

  /**
   * deze functie maakt li item aan onder het ul #letters element in de DOM en zet het aantal
   * dashes op je beeldscherm
   */
  addDashes = () => {
    // eslint-disable-next-line prefer-destructuring
    const length = this.charsInWord.length;
    const listWithLetters = document.querySelector('#letters');

    for (let i = 0; i < length; i += 1) {
      const listItem: HTMLElement = document.createElement('li');
      listItem.setAttribute('id', `char${i}`);
      listWithLetters.appendChild(listItem).innerHTML = '_';
    }
  };

  /**
   * changes a dach to a li item #char.. to a char
   *
   * @param charIndex hoeveelste letter (begint bij 0)
   */
  addGuessedLetterToDOM = (charIndex: number) => {
    document.querySelector(`#char${charIndex}`).innerHTML = this.charsInWord[charIndex];
  };

  /**
   * puts the attempts in the DOM
   *
   * @param numberOfAttempts het aantal keer dat er al geraden is
   */
  addAttempsToTheDOM = (numberOfAttempts: number) => {
    const attemptINDOM: HTMLDivElement = document.querySelector('#attempt');
    attemptINDOM.innerHTML = numberOfAttempts.toString();
  };

  /**
   * checks op welke index de chars zijn en zet deze in de DOM
   *
   * @param array array die je wilt checken
   * @param char welke char je wilt controleren
   */
  charOnWichIndex = (array: string[], char: string) => {
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

  /**
   *
   * @param element the char
   */
  whenEvent = (element: Event) => {
    const target: HTMLElement = element.target as HTMLElement;
    const e = target.getAttribute('id');
    if (this.inArray(e, this.charsInWord)) {
      // add char on right index
      this.charOnWichIndex(this.charsInWord, e);
      // add this letter to the dom
    } else {
      // als het de verkeerde letter is
      this.attempts -= 1;
      this.addAttempsToTheDOM(this.attempts);
    }
    // class .idle maken
    const listItem: HTMLElement = document.querySelector(`#${e}`);
    listItem.classList.add('idle');

    const wordInDOM: HTMLElement = document.querySelector('#letters');
    const keyboardInDOM: HTMLElement = document.querySelector('#keyboard');
    if (this.checkIfArrayIsEqual(this.guessedCharactersInWord, this.charsInWord)) {
      wordInDOM.classList.add('winner');
      keyboardInDOM.classList.add('idle');
    }
    if (this.attempts <= 0) {
      wordInDOM.classList.add('lost');
      keyboardInDOM.classList.add('idle');
    }
  };

  /**
   * Function to write the alphabet keyboard to the DOM
   */
  writeAlphabetToTheDom() {
    // let currenkey: string;
    const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const lettersINDOM: HTMLDivElement = document.querySelector('#keyboard');
    alphabet.forEach((element) => {
      const divKey: HTMLDivElement = document.createElement('div');
      divKey.id = element;
      divKey.classList.add('key');
      divKey.innerHTML = element;
      lettersINDOM.append(divKey);

      divKey.addEventListener('click', this.whenEvent);
    });
  }
}

const randomWordArray: string[] = ['hallo', 'appel', 'okeej', 'aandacht', 'welkom', 'scooters'];

/**
 * Function to initialize the programme
 */
function init() {
  const hangman = new Hangman(randomWordArray);
}

window.addEventListener('load', init);
