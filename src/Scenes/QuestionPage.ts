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

    private answerA: string;

    private answerB: string;

    private answerC: string;

    private character: HTMLImageElement;

    private correctIndex: number;

    private correctKey: number;

    public constructor(game: Game, score: Score, coins: CoinPoints, currentLevel: number, character: HTMLImageElement) {
        super(game);
        console.log('Question page');

        this.character = character;

        this.currentLevel = currentLevel;

        this.score = score;

        this.coins = coins;

        this.keyListener = new KeyListener();

        // TODO: make a random question about the virus
        // TODO: Haal kut weg!!
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
            new Question('Wat is spyware?',
                'Een programma dat gegevens van je computer achterhaald en doorstuurd naar iemand anders om geld te verdienen.',
                'Een programma dat met je meekijkt op je computer.',
                'een spion van de overheid.'),
        ];

        this.currentQuestion = this.randomQuestion(this.questions);

        this.correctAnswer = this.currentQuestion.getRightAnswer();

        this.correctIndex = this.currentQuestion.getAnswerArray().indexOf(this.correctAnswer);

        console.log(this.correctIndex);

        switch (this.correctIndex) {
            case 0: this.correctKey = KeyListener.KEY_A;
                break;
            case 1: this.correctKey = KeyListener.KEY_B;
                break;
            case 2: this.correctKey = KeyListener.KEY_C;
                break;
            default: null
                break;
        }
    }

    // TODO: het correcte antwoord kiezen en dan pas door ipv altijd bij a
    public processInput(): void {
        // If you choose the right answer you go back to the game
        if (this.keyListener.isKeyDown(this.correctKey)) {
            this.isFinished = true;
            this.answer = true;

            // if you choose a different key you go to the answer screen
        } else if (this.keyListener.isKeyDown(KeyListener.KEY_A || KeyListener.KEY_B || KeyListener.KEY_C)) {
            this.isFinished = true;
            this.answer = false;
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
                    case 1: return new Level_1(this.game, this.score, this.coins, 0, this.character);
                        break;
                    case 2: return new Level_2(this.game, this.score, this.coins, 0, this.character);
                        break;
                    case 3: return new Level_3(this.game, this.score, this.coins, 0, this.character);
                        break;
                    case 4: return new Level_4(this.game, this.score, this.coins, 0, this.character);
                }
            } else if (this.answer === false) {
                // TODO: return to the info page
                return new Start(this.game);
            }
        }
        return null;
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.writeTextToCanvas(`${this.currentQuestion.getQuestion()}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) - 45, 30, "white", "center");
        this.writeTextToCanvas(`A: ${this.currentQuestion.getAnswer(0)}`, this.game.canvas.width / 2, this.game.canvas.height / 2, 20, "white", "center");
        this.writeTextToCanvas(`B: ${this.currentQuestion.getAnswer(1)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 25, 20, "white", "center");
        this.writeTextToCanvas(`C: ${this.currentQuestion.getAnswer(2)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 50, 20, "white", "center");
        this.writeTextToCanvas('Druk op A, B of C om het antwoord te geven', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 85, 18, "white", "center");
        // this.writeTextToCanvas(`${String.fromCodePoint(129440, 129440, 129440)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 60, 20, "green", "center");
    }

    public randomQuestion(arr: Question[]) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

}
