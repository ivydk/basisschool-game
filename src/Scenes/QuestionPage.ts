import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import CoinPoints from "../CoinPoints.js";
import Level_1 from "./Level_1.js";
import Level_2 from "./Level_2.js";
import Level_3 from "./Level_3.js";
import Level_4 from "./Level_4.js";
import Scene from "./Scene.js";
import Start from "./Start.js";
import Question from "../Question.js";
import ExplainWrongAnswer from "./ExplainWrongAnswer.js";

export default class QuestionPage extends Scene {
    private answer: boolean;

    private isFinished: boolean;

    private keyListener: KeyListener;

    private score: Score;

    private coins: CoinPoints;

    private currentLevel: number;

    private questions: Question[];

    private currentQuestion: Question;

    private correctAnswer: string;

    private character: HTMLImageElement;

    private correctIndex: number;

    private correctKey: number;

    private correctAnswerYPos: number;

    private inCorrectAnswerYPos: number;

    private correctLetter: string;

    private inCorrectLetter: string;

    private inCorrectIndex: any;

    public constructor(game: Game, score: Score, coins: CoinPoints, currentLevel: number, character: HTMLImageElement) {
        super(game);
        console.log('Question page');

        this.character = character;

        this.currentLevel = currentLevel;

        this.score = score;

        this.coins = coins;

        this.keyListener = new KeyListener();

        // Array with all the questions + answers (question, true answer, 2x false answer)
        this.questions = [
            new Question(
                'Wat maakt een Trojan Horse virus zo gevaarlijk?',
                'Het virus zit verstopt in een programma of virus.',
                'Het virus kan niet worden weggehaald.',
                'Je kan je computer er niet tegen beschermen.'),
            new Question(
                'Wat is een virusscanner?',
                'Een virusscanner zoekt naar virussen en andere malware.',
                'Een virusscanner waarschuwt je voor mensen die je benaderen in een spel.',
                'Een virusscanner is een vorm van malware.'),
            new Question('Wat is een computer virus?',
                'Een stukje code dat je computersysteem aanpast of kapot maakt.',
                'Een soort ziekte van je computer waardoor je zelf ziek kan worden.',
                'Een bekend programma dat je computer beschermd.'),
            new Question('Wat is Spyware?',
                'Een programma dat gegevens van je computer achterhaald en doorstuurd naar iemand anders om geld te verdienen.',
                'Een programma dat met je meekijkt op je computer.',
                'Een spion van de overheid.'),
            new Question(
                'Wat is een Worm virus?',
                'Een programma dat zichzelf vermenigvuldigt en schade toebrengt aan een netwerk.',
                'Een virus dat je computer langzamer maakt en laat vastlopen.',
                'Iets wat diep in het systeem van je computer zit en je computer vanuit daar kapot maakt.'),
            new Question(
                'Wat is een Trojan Horse virus?',
                'Een virus dat verstopt zit in een ander programma en op die manier andere virussen binnen kan laten in het systeem.',
                'Een virus dat binnen in je systeem schade aanbrengt.',
                'Een virus dat overal afbeeldingen van paarden op je computer verstopt en laat zien.'),
            new Question(
                'Wat doe je als je een bericht krijgt waarbij je gratis in-game punten kan krijgen?',
                'Je negeert het bericht of verwijdert het.',
                'Je klikt op de link in het bericht en volgt de instructies die gegeven worden.',
                'Je deelt het bericht en de link met je vrienden, zodat jullie allemaal in-game punten kunnen krijgen.'),
            new Question(
                'Je krijgt een e-mail die zegt dat je een gratis telefoon hebt gewonnen. Wat doe je?',
                'Je bekijkt de mail en verwijdert het gelijk.',
                'Je accepteerd het bericht en vult al je gegevens in zodat je de telefoon op kan halen.',
                'Je klikt op de link in de mail en download een bestand dat zegt dat je daar je telefoon kan claimen.'),
            new Question(
                'Hoe kan je je computer beschermen tegen virussen?',
                'Een virusscanner downloaden.',
                'Een betere nieuwe computer kopen.',
                'Niet, je kan je computer niet beschermen tegen virussen.')

            // new Question(
            //     '',
            //     '',
            //     '',
            //     ''),
        ];

        this.currentQuestion = this.randomQuestion(this.questions);

        this.correctAnswer = this.currentQuestion.getRightAnswer();

        this.correctIndex = this.currentQuestion.getAnswerArray().indexOf(this.correctAnswer);

        console.log(this.correctIndex);

        // Decides wich key you should press for the right answer
        // Gives the yPos for the right answer
        // Gives the right letter to the correctLetter variable
        switch (this.correctIndex) {
            case 0: this.correctKey = KeyListener.KEY_A;
                this.correctAnswerYPos = this.game.canvas.height / 2;
                this.correctLetter = 'A';
                break;
            case 1: this.correctKey = KeyListener.KEY_B;
                this.correctAnswerYPos = this.game.canvas.height / 2 + 25;
                this.correctLetter = 'B';
                break;
            case 2: this.correctKey = KeyListener.KEY_C;
                this.correctAnswerYPos = this.game.canvas.height / 2 + 50;
                this.correctLetter = 'C';
                break;
            default: null
                break;
        }
    }

    public processInput(): void {
        // If you choose the right answer you go back to the game
        if (this.keyListener.isKeyDown(this.correctKey)) {
            this.isFinished = true;
            this.answer = true;

            // if you choose a different key you go to the answer screen
        } else if (
            this.keyListener.isKeyDown(KeyListener.KEY_A)) {
            this.inCorrectIndex = 0;
            this.inCorrectAnswerYPos = this.game.canvas.height / 2;
            this.inCorrectLetter = 'A';
            this.answer = false;
        } else if (
            this.keyListener.isKeyDown(KeyListener.KEY_B)) {
            this.inCorrectIndex = 1;
            this.inCorrectAnswerYPos = this.game.canvas.height / 2 + 25;
            this.inCorrectLetter = 'B';
            this.answer = false;
        } else if (
            this.keyListener.isKeyDown(KeyListener.KEY_C)) {
            this.inCorrectIndex = 2;
            this.inCorrectAnswerYPos = this.game.canvas.height / 2 + 50;
            this.inCorrectLetter = 'C';
            this.answer = false;
        }

        if (this.answer === false && this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
        }
    }

    /**
     *
     * @returns 'null' if the Scene does not need to proceed to the next one
     */
    public update(elapsed: number): Scene {
        if (this.isFinished) {
            // Proceed to the next screen
            if (this.answer === true) {
                // This switch determents what level you should go back to
                // Lives will go back to 0 so you get one more change
                switch (this.currentLevel) {
                    case 1: return new Level_1(this.game, this.score, this.coins, 0, this.character, 0);
                        break;
                    case 2: return new Level_2(this.game, this.score, this.coins, 0, this.character, 0);
                        break;
                    case 3: return new Level_3(this.game, this.score, this.coins, 0, this.character, 0);
                        break;
                    case 4: return new Level_4(this.game, this.score, this.coins, 0, this.character, 0);
                }
            } else if (this.answer === false) {
                return new Start(this.game)
            }
        }
        return null;
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.writeTextToCanvas(`${this.currentQuestion.getQuestion()}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) - 45, 30, "white", "center");

        if (this.answer === false) {
            // Right answer appears in green
            this.writeTextToCanvas(`${this.correctLetter}: ${this.currentQuestion.getAnswer(this.correctIndex)}`, this.game.canvas.width / 2, this.correctAnswerYPos, 20, "green", "center");

            // wrong answer appears in red
            this.writeTextToCanvas(`${this.inCorrectLetter}: ${this.currentQuestion.getAnswer(this.inCorrectIndex)}`, this.game.canvas.width / 2, this.inCorrectAnswerYPos, 20, "red", "center");

            this.writeTextToCanvas('Druk op enter om door te gaan', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 85, 18, "white", "center");
        } else {
            this.writeTextToCanvas(`A: ${this.currentQuestion.getAnswer(0)}`, this.game.canvas.width / 2, this.game.canvas.height / 2, 20, "white", "center");
            this.writeTextToCanvas(`B: ${this.currentQuestion.getAnswer(1)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 25, 20, "white", "center");
            this.writeTextToCanvas(`C: ${this.currentQuestion.getAnswer(2)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 50, 20, "white", "center");
            this.writeTextToCanvas('Druk op A, B of C om het antwoord te geven', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 85, 18, "white", "center");
        }
        // this.writeTextToCanvas(`${String.fromCodePoint(129440, 129440, 129440)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 60, 20, "green", "center");
    }

    public randomQuestion(arr: Question[]) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

}
