export default class CoinPoints {
    private coins: number;

    /**
     *
     */
    constructor() {
        this.coins = 0;
    }

    /**
     * you can set de coins
     *
     * @param coins number of coins you want to add
     * formula: coins = coins + `your number`
     */
    public setCoins = (coins: number): void => {
        this.coins += coins;
    };

    public getCoins = (): number => this.coins;
}
