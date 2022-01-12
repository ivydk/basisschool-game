export default class GameItem {
    protected xPosition: number;

    protected yPosition: number;

    protected image: HTMLImageElement;

    /**
       * Initialize the GameItem
       *
       * @param xPos position on the x-axis
       * @param yPos position on the y-axis
       * @param image image of the GameItem
       */
    constructor(xPos: number, yPos: number, image: HTMLImageElement) {
        this.xPosition = xPos;
        this.yPosition = yPos;
        this.image = image;
    }

    /**
       * Get the image
       *
       * @returns the image of  the GameItem
       */
    public getImage(): HTMLImageElement {
        return this.image;
    }

    /**
       * Set the image of the GameItem
       *
       * @param image the image of the GameItem
       */
    public setImage(image: HTMLImageElement): void {
        this.image = image;
    }

    /**
       * Get the position on the x-axis
       *
       * @returns the position on the x-axis
       */
    public getXPos(): number {
        return this.xPosition;
    }

    /**
       * Set the position on the x-axis
       *
       * @param xPos the position on the x-axis
       */
    public setXPos(xPos: number): void {
        this.xPosition = xPos;
    }

    /**
       * Get the position on the y-axis
       *
       * @returns the position on the y-axis
       */
    public getYPos(): number {
        return this.yPosition;
    }

    /**
       * Set the position on the y-axis
       *
       * @param yPos the position on the y-axis
       */
    public setYPos(yPos: number): void {
        this.yPosition = yPos;
    }

    /**
   * Draw the GameItem on the canvas
   *
   * @param ctx rendering context
   */
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.xPosition, this.yPosition);
    }

    /**
     * Loads an image in such a way that the screen doesn't constantly flicker
     *
     *
     * NOTE: this is a 'static' method. This means that this method must be called like
     * `Game.loadNewImage()` instead of `this.loadNewImage()`.
     *
     * @param source The address or URL of the a media resource that is to be loaded
     * @returns an HTMLImageElement with the source as its src attribute
     */
    public static loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }

    /**
     * Generates a random integer number between min and max
     *
     * NOTE: this is a 'static' method. This means that this method must be called like
     * `Game.randomInteger()` instead of `this.randomInteger()`.
     *
     * @param min - minimal time
     * @param max - maximal time
     * @returns a random integer number between min and max
     */
    public static randomInteger(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}
