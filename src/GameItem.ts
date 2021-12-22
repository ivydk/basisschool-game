export default abstract class GameItem {
  private name: string;

  private xPosition: number;

  private yPosition: number;

  private speed: number;

  /**
   * Initialize the GameItem class
   *
   * @param name name of the Game
   */
  public constructor(name: string) {
    this.name = name;
  }

  /**
   * Get the xPosition
   *
   * @returns returns the position on the x-axis
   */
  public getXPosition(): number {
    return this.xPosition;
  }

  /**
   * Set the xPosition
   *
   * @param xPosition - set a new xPosition
   */
  protected setXPosition(xPosition: number): void {
    this.xPosition = xPosition;
  }

  /**
   * Get the yPosition
   *
   * @returns returns the position on the y-axis
   */
  public getYPosition(): number {
    return this.yPosition;
  }

  /**
   * Set the yPosition
   *
   * @param yPosition - set a new yPosition
   */
  protected setYPosition(yPosition: number): void {
    this.yPosition = yPosition;
  }

  /**
   * Get the speed
   *
   * @returns returns the speed
   */
  public getSpeed(): number {
    return this.speed;
  }

  /**
   * Set the speed
   *
   * @param speed - set a new speed
   */
  protected setSpeed(speed: number): void {
    this.speed = speed;
  }
}
