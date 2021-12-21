// het werkt

class Animal {
  private readonly name: string;

  private readonly legs: number;

  private readonly sound: string;

  /**
   * geeeen idee
   *
   * @param name the name
   * @param legs the number of legs
   * @param sound the sound
   */
  public constructor(name: string, legs: number, sound: string) {
    this.name = name;
    this.legs = legs;
    this.sound = sound;
  }

  /**
   * gezelligheid
   *
   * @returns the name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * uitleg ..
   *
   * @returns number of legs
   */
  public getLegs(): number {
    return this.legs;
  }

  /**
   * uitleg
   *
   * @returns what sound it makes
   */
  public getSound(): string {
    return this.sound;
  }
}

const animals = [
  new Animal('dog', 4, 'woof'),
  new Animal('cat', 4, 'meow'),
];

animals.forEach(
  (animal) => console.log(
    'A %s has %s legs and goes %s!',
    animal.getName(),
    animal.getLegs(),
    animal.getSound(),
  ),
);
