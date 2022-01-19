import KeyListener from "../KeyListener.js";
import Level_1 from "./Level_1.js";
import Level_2 from "./Level_2.js";
import Level_3 from "./Level_3.js";
import Level_4 from "./Level_4.js";
import Scene from "./Scene.js";
import Start from "./Start.js";
import Question from "../Question.js";
export default class QuestionPage extends Scene {
    answer;
    isFinished;
    keyListener;
    score;
    coins;
    currentLevel;
    questions;
    currentQuestion;
    correctAnswer;
    answerA;
    answerB;
    answerC;
    character;
    constructor(game, score, coins, currentLevel, character) {
        super(game);
        console.log('Question page');
        this.character = character;
        this.currentLevel = currentLevel;
        this.score = score;
        this.coins = coins;
        this.keyListener = new KeyListener();
        this.questions = [
            new Question('Wat maakt een Trojan Horse virus zo gevaarlijk?', 'Het virus zit verstopt in een programma of virus.', 'Het virus kan niet worden weggehaald.', 'Je kan je computer er niet tegen beschermen.'),
            new Question('Wat is een virusscanner?', 'Een virusscanner zoekt naar virussen en andere malware.', 'Een virusscanner waarschuwt je voor mensen die je benaderen in een spel.', 'Een virusscanner is een vorm van malware.'),
            new Question('Wat is een computer virus?', 'Een stukje code dat je computersysteem aanpast of kapot maakt.', '', 'kut 3'),
            new Question('Wat is? 4', 'right 4', 'false 4', 'kut 4'),
        ];
        this.currentQuestion = this.randomQuestion(this.questions);
        this.correctAnswer = this.currentQuestion.getRightAnswer();
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
            this.isFinished = true;
            this.answer = true;
        }
        else if (this.keyListener.isKeyDown(KeyListener.KEY_B)) {
            this.isFinished = true;
            this.answer = false;
        }
        else if (this.keyListener.isKeyDown(KeyListener.KEY_C)) {
            this.isFinished = true;
            this.answer = false;
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            if (this.answer === true) {
                switch (this.currentLevel) {
                    case 1:
                        return new Level_1(this.game, this.score, this.coins, 0, this.character);
                        break;
                    case 2:
                        return new Level_2(this.game, this.score, this.coins, 0, this.character);
                        break;
                    case 3:
                        return new Level_3(this.game, this.score, this.coins, 0, this.character);
                        break;
                    case 4: return new Level_4(this.game, this.score, this.coins, 0, this.character);
                }
            }
            else if (this.answer === false) {
                return new Start(this.game);
            }
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas(`${this.currentQuestion.getQuestion()}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) - 45, 30, "white", "center");
        this.writeTextToCanvas(`A: ${this.currentQuestion.getAnswer(0)}`, this.game.canvas.width / 2, this.game.canvas.height / 2, 20, "white", "center");
        this.writeTextToCanvas(`B: ${this.currentQuestion.getAnswer(1)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 25, 20, "white", "center");
        this.writeTextToCanvas(`C: ${this.currentQuestion.getAnswer(2)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 50, 20, "white", "center");
        this.writeTextToCanvas('Druk op A, B of C om het antwoord te geven', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 85, 18, "white", "center");
    }
    randomQuestion(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}
//# sourceMappingURL=QuestionPage.js.map